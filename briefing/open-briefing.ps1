# Opens the briefing window. Safe to run any time: it starts the briefing session
# if none is running, then attaches to it. Closing the window only detaches.
#   -NewWindow  open it in its own new window (use this from another session or a shortcut)

param([switch]$NewWindow)

if ($NewWindow) {
    $self = $PSCommandPath
    if (Get-Command wt.exe -ErrorAction SilentlyContinue) {
        Start-Process wt.exe -ArgumentList "-w new --title `"Briefing`" powershell -NoExit -ExecutionPolicy Bypass -File `"$self`""
    } else {
        Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File `"$self`""
    }
    return
}

$Host.UI.RawUI.WindowTitle = 'Briefing'

# A window opened from inside a Claude session inherits that session's markers; clear them.
foreach ($v in 'CLAUDE_CODE_CHILD_SESSION','CLAUDECODE','CLAUDE_CODE_SESSION_ID','CLAUDE_JOB_DIR','CLAUDE_PID',
               'CLAUDE_EFFORT','CLAUDE_CODE_BRIDGE_SESSION_ID','CLAUDE_CODE_MESSAGING_SOCKET','CLAUDE_CODE_MESSAGING_TOKEN',
               'CLAUDE_CODE_AGENT','CLAUDE_CODE_ENTRYPOINT','CLAUDE_CODE_SESSION_ATTENDED','CLAUDE_CODE_ALT_SCREEN_FULL_REPAINT',
               'NO_COLOR','FORCE_COLOR','AI_AGENT','GIT_TERMINAL_PROMPT') {
    Remove-Item -Path ('Env:' + $v) -ErrorAction SilentlyContinue
}

Set-Location $PSScriptRoot

function Find-Desk {
    # Assign first: Windows PowerShell 5.1 passes a parsed JSON array down the pipe as one object.
    $all = (claude agents --json 2>$null | Out-String) | ConvertFrom-Json
    $all | Where-Object { $_.name -eq 'briefing' -and $_.kind -eq 'background' } | Select-Object -First 1
}

$desk = Find-Desk
if (-not $desk) {
    Write-Host 'No briefing session is running. Starting one...'
    claude --bg -n briefing 'Read your CLAUDE.md, check the collector is alive, then wait for Alex.' | Out-Host
    Start-Sleep -Seconds 5
    $desk = Find-Desk
}

if ($desk) {
    claude attach $desk.id
} else {
    Write-Host 'Could not find or start the briefing session. Tell the orchestration session.' -ForegroundColor Red
}
