# assemble-payload.ps1 -- alex-voice deterministic payload assembler (no model call).
#
# Adapted from Alex's Write Great Post assembler (S7). Fills the grader template's FOUR slots and
# nothing else, writes the payload to a file, and prints its SHA-256, so the payload as sent is provable
# byte for byte and the dispatch prompt only has to name the file:
#   {{rubric_grading_view}} <- rubric.md's grading view, full and uncompressed (lib-rubric.ps1)
#   {{brief}}               <- the run's brief file, verbatim
#   {{source_material}}     <- the run's source file, verbatim, or "(none supplied)"
#   {{text}}                <- the attempt's draft, verbatim
# The template file is never modified and the rubric is never inlined into it.
#
# Exit 0 = written; 2 = an input is missing or a slot did not substitute.
param(
    [Parameter(Mandatory=$true)][string]$DraftFile,
    [Parameter(Mandatory=$true)][string]$BriefFile,
    [Parameter(Mandatory=$true)][string]$OutFile,
    [string]$SourceFile   = "",
    [string]$RubricFile   = "",
    [string]$TemplateFile = "",
    [string]$LibPath      = ""
)

$skillDir = Split-Path -Parent $PSScriptRoot
if (-not $RubricFile)   { $RubricFile   = Join-Path $skillDir "rubric.md" }
if (-not $TemplateFile) { $TemplateFile = Join-Path $skillDir "grader-template.md" }
if (-not $LibPath)      { $LibPath      = Join-Path $PSScriptRoot "lib-rubric.ps1" }

foreach ($f in @($DraftFile, $BriefFile, $RubricFile, $TemplateFile, $LibPath)) {
    if (-not (Test-Path $f)) { Write-Output "MISSING: $f"; exit 2 }
}
if ($SourceFile -and -not (Test-Path $SourceFile)) { Write-Output "MISSING: $SourceFile"; exit 2 }
. $LibPath

$template = Get-Content -Raw -Encoding UTF8 $TemplateFile
$draft    = (Get-Content -Raw -Encoding UTF8 $DraftFile).TrimEnd("`r", "`n")
$brief    = (Get-Content -Raw -Encoding UTF8 $BriefFile).TrimEnd("`r", "`n")
$source   = "(none supplied)"
if ($SourceFile) { $source = (Get-Content -Raw -Encoding UTF8 $SourceFile).TrimEnd("`r", "`n") }
$view     = Get-GradingView -RubricFile $RubricFile

if ($view.Length -lt 5000) { Write-Output "REFUSING: grading view is only $($view.Length) chars -- extraction is wrong"; exit 2 }
if ([string]::IsNullOrWhiteSpace($draft)) { Write-Output "REFUSING: draft is empty"; exit 2 }

$slots = @("{{rubric_grading_view}}", "{{brief}}", "{{source_material}}", "{{text}}")
foreach ($s in $slots) {
    $n = ([regex]::Matches($template, [regex]::Escape($s))).Count
    if ($n -ne 1) { Write-Output "REFUSING: template carries $n copies of $s (expected exactly 1)"; exit 2 }
}

# Substitute in template order, each slot exactly once, so a slot token inside the brief, source or
# draft text is never itself substituted.
$payload = $template
$pos = 0
$fills = [ordered]@{ "{{rubric_grading_view}}" = $view; "{{brief}}" = $brief; "{{source_material}}" = $source; "{{text}}" = $draft }
foreach ($k in $fills.Keys) {
    $i = $payload.IndexOf($k, $pos)
    if ($i -lt 0) { Write-Output "REFUSING: $k did not substitute (slots must appear in template order)"; exit 2 }
    $payload = $payload.Substring(0, $i) + $fills[$k] + $payload.Substring($i + $k.Length)
    $pos = $i + $fills[$k].Length
}

$dir = Split-Path -Parent $OutFile
if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
[System.IO.File]::WriteAllText($OutFile, $payload, (New-Object System.Text.UTF8Encoding($false)))

$h = (Get-FileHash $OutFile -Algorithm SHA256).Hash
Write-Output "PAYLOAD: $OutFile"
Write-Output "chars  : $($payload.Length)  (grading view $($view.Length), brief $($brief.Length), source $($source.Length), draft $($draft.Length))"
Write-Output "sha256 : $h"
exit 0
