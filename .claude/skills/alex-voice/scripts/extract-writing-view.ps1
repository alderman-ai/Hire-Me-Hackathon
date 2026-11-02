#requires -Version 5.1
<#
  extract-writing-view.ps1 -- alex-voice. Extracts the rubric's WRITING VIEW to its own file, so a
  writing session reads that and nothing else. Adapted from Alex's Write Great Post script of the same
  name: same checks, ASCII-only source, and defaults relative to this script's folder (the original's
  defaults pointed at an old vault, which is why it needed both paths passed).

  Why: the grader gets the grading view only. The writer must not get it either way round: handing the
  writer the rubric file puts the grader's exemplars in its context, and it then writes to the judge.

  Usage (both optional):
    powershell -File extract-writing-view.ps1 [<rubric.md>] [<writing-view.md>]
  Re-run after ANY rubric change. Halts if the section is missing; never falls back to the whole file.
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$skillDir   = Split-Path -Parent $PSScriptRoot
$rubricPath = if ($args.Count -ge 1) { $args[0] } else { Join-Path $skillDir 'rubric.md' }
$outPath    = if ($args.Count -ge 2) { $args[1] } else { Join-Path $skillDir 'writing-view.md' }

if (-not (Test-Path $rubricPath)) { throw "Rubric not found: $rubricPath - HALT" }

$text = [System.IO.File]::ReadAllText($rubricPath, [System.Text.Encoding]::UTF8)

# ASCII-only anchors: the heading is '## <section mark> . WRITING VIEW ...'; stop at the next '## ' heading.
$start = [regex]::Match($text, '(?m)^##\s[^\r\n]*WRITING VIEW[^\r\n]*$')
if (-not $start.Success) { throw "No WRITING VIEW section found - HALT (the writer must never fall back to the whole file)" }

$rest = $text.Substring($start.Index + $start.Length)
$next = [regex]::Match($rest, '(?m)^##\s')
$body = if ($next.Success) { $rest.Substring(0, $next.Index) } else { $rest }

$view = $start.Value + $body.TrimEnd() + "`n"

$header = @"
<!--
  WRITING VIEW ONLY -- extracted from rubric.md by scripts/extract-writing-view.ps1. Do not edit by hand:
  change rubric.md, then re-run the script.

  This is the whole of what a writing session may read from the rubric. It deliberately EXCLUDES the
  grading view and its exemplars, the worked examples, and the calibration record.
-->

"@

[System.IO.File]::WriteAllText($outPath, $header + $view, (New-Object System.Text.UTF8Encoding($false)))

# --- receipts, and the checks that make the extraction trustworthy ---------------------------------
# Assert against $view (the extracted section), not the written file, whose header names the excluded
# sections. -cmatch, because -match is case-insensitive and 'the grading view' in prose is fine.
$ids = @([regex]::Matches($view, '\[([A-Z]{3,6}-\d{2}(?:,\s*[A-Z]{3,6}-\d{2})*)\]') |
         ForEach-Object { $_.Groups[1].Value -split ',\s*' } | Sort-Object -Unique)

'source rubric:         ' + (Split-Path $rubricPath -Leaf)
'written:               ' + (Split-Path $outPath -Leaf) + '  (' + $view.Length + ' chars of view, from a ' + $text.Length + '-char rubric)'
'criterion IDs present: ' + $ids.Count + '  -> ' + ($ids -join ', ')
''
'--- isolation assertions (over the extracted view only) ---'
$bad = @()
foreach ($probe in @('GRADING VIEW', 'Worked examples', 'Calibration record', 'Boundary calibration', 'Statement:')) {
  $hit = $view -cmatch [regex]::Escape($probe)
  ('  excludes "' + $probe + '": ' + (-not $hit))
  if ($hit) { $bad += $probe }
}
if ($bad.Count -gt 0) { throw ('ISOLATION BREACH - extracted view carries: ' + ($bad -join '; ') + '. HALT.') }
'ALL ISOLATION ASSERTIONS PASS'
