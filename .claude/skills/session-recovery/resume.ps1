# Relaunch one roster session in the background, for the session-recovery skill.
#
#   resume.ps1 -Name website -Folder website -SessionId <uuid> -PromptFile <notice.txt>
#   resume.ps1 -Name website -Folder website -Fresh -PromptFile <notice.txt>     # no transcript: new session, same name
#   add -DryRun to print the command without launching
#
# -Folder is relative to the repo root ('.' for the root). The notice file is the
# whole message the session receives; keep it plain text.

param(
    [Parameter(Mandatory)] [string]$Name,
    [Parameter(Mandatory)] [string]$Folder,
    [string]$SessionId,
    [Parameter(Mandatory)] [string]$PromptFile,
    [switch]$Fresh,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..')).Path

if (-not $Fresh -and -not $SessionId) { throw 'Give -SessionId, or -Fresh to start a new session under this name.' }

# Never start a second session under a name that is already live.
$live = (claude agents --json 2>$null | Out-String) | ConvertFrom-Json
$clash = $live | Where-Object { $_.name -eq $Name -and $_.cwd -like "$root*" }
if ($clash) { Write-Output "SKIPPED: $Name is already live as $($clash.id). Nothing launched."; return }

# A child launched from inside a Claude session inherits its markers; clear them (same list as answer-desk\open-desk.ps1).
foreach ($v in 'CLAUDE_CODE_CHILD_SESSION','CLAUDECODE','CLAUDE_CODE_SESSION_ID','CLAUDE_JOB_DIR','CLAUDE_PID',
               'CLAUDE_EFFORT','CLAUDE_CODE_BRIDGE_SESSION_ID','CLAUDE_CODE_MESSAGING_SOCKET','CLAUDE_CODE_MESSAGING_TOKEN',
               'CLAUDE_CODE_AGENT','CLAUDE_CODE_ENTRYPOINT','CLAUDE_CODE_SESSION_ATTENDED','CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT',
               'NO_COLOR','FORCE_COLOR','AI_AGENT','GIT_TERMINAL_PROMPT') {
    Remove-Item -Path ('Env:' + $v) -ErrorAction SilentlyContinue
}

# Windows PowerShell 5.1 breaks native arguments that contain double quotes, so swap them for single quotes,
# and send the notice as one line.
$prompt = (Get-Content -Raw -Encoding UTF8 $PromptFile).Trim() -replace '\r?\n+', ' ' -replace '"', "'"

$dir = if ($Folder -in '.', '', 'root') { $root } else { Join-Path $root $Folder }
if (-not (Test-Path $dir)) { throw "Folder not found: $dir" }
Set-Location $dir

if ($Fresh) { $cliArgs = @('--bg', '-n', $Name, $prompt) }
else        { $cliArgs = @('--bg', '--resume', $SessionId, '-n', $Name, $prompt) }

$how = if ($Fresh) { 'fresh' } else { "--resume $SessionId" }
Write-Output "$Name  ($how)  in $dir"
if ($DryRun) { Write-Output "DRY RUN: claude $($cliArgs[0..($cliArgs.Count-2)] -join ' ') <notice, $($prompt.Length) chars>"; return }
claude @cliArgs 2>&1 | Out-String
