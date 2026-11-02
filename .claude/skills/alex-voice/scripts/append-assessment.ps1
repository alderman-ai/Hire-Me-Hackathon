# append-assessment.ps1 -- alex-voice deterministic scribe (no model call). From Write Great Post (S5), unchanged.
# Appends a grader assessment file's full content to the run's log file, beneath the attempt's
# draft, so the grader's findings are kept in the log. The writing session never opens the assessment file; this script is the only reader.
param(
    [Parameter(Mandatory=$true)][string]$AssessmentFile,
    [Parameter(Mandatory=$true)][string]$LogFile,
    [Parameter(Mandatory=$true)][int]$Attempt
)

if (-not (Test-Path $AssessmentFile)) { Write-Output "MISSING: $AssessmentFile"; exit 2 }
if (-not (Test-Path $LogFile)) { Write-Output "MISSING: $LogFile"; exit 2 }

$content = Get-Content -Raw -Encoding UTF8 $AssessmentFile
$block = @"

### Grade and findings -- attempt $Attempt (grader assessment, appended verbatim by script)

$content
"@
Add-Content -Path $LogFile -Value $block -Encoding UTF8
Write-Output "APPENDED: attempt $Attempt assessment ($($content.Length) chars) -> $(Split-Path -Leaf $LogFile)"
exit 0
