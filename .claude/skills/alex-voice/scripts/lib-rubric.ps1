# alex-voice copy of Alex's Write Great Post helper "lib-rubric.ps1" (S6), logic unchanged.
# The rubric contract it relies on: a "## ... GRADING VIEW" heading followed directly by a
# "## ... WRITING VIEW" heading; every criterion header starts "**ID"; every Statement is one italic span.
#
# lib-rubric.ps1 -- S6 shared deterministic helpers (no model call).
# Dot-sourced by assemble-grader-payloads.ps1 and collect-results.ps1.
#
# Two jobs:
#   (1) Extract the rubric's SSB grading view (the {{rubric_grading_view}} slot filler).
#   (2) Extract each criterion's full Statement text, for citation validation.
#
# The Statement extractor is S6's own, and it is NOT S5's. S5's validate-citations.ps1 read from
# "Statement:" to the next line starting with "Validation", which is correct for every v1 criterion
# and WRONG for four of rubric v2's six new ones: HOOKF-19 and WRAP-20 carry a "Basis:" /
# "Constant provenance:" line before their Validation line (so S5's rule swallows it), and BOLD-25,
# CLWN-22 and LEN-27 have no "Validation" line at all (so S5's rule runs on into later criteria).
# S6 keys on the rubric's actual, uniform convention instead: every Statement is a single italic
# span -- "Statement: *...*" -- so the statement ends at the first line whose trimmed text ends in a
# single asterisk. The NORMALIZATION PREDICATE below is S5's, character for character, so the two
# specs still measure citation validity in one currency.

function Get-GradingView {
    param([Parameter(Mandatory=$true)][string]$RubricFile)
    $lines = Get-Content -Encoding UTF8 $RubricFile
    $start = -1; $end = -1
    for ($i = 0; $i -lt $lines.Count; $i++) {
        # ASCII-only anchors on purpose: Windows PowerShell 5.1 reads a BOM-less .ps1 as ANSI, so a
        # section-sign literal in this file would not survive to match the rubric's UTF-8 headings.
        if ($start -lt 0 -and $lines[$i] -match '^##\s.*GRADING VIEW') { $start = $i; continue }
        if ($start -ge 0 -and $lines[$i] -match '^##\s.*WRITING VIEW') { $end = $i; break }
    }
    if ($start -lt 0) { throw "Get-GradingView: could not locate the grading-view heading" }
    if ($end -lt 0)   { throw "Get-GradingView: could not locate the writing-view heading" }
    $slice = $lines[$start..($end - 1)]
    # Trim trailing blank lines only; internal whitespace is significant.
    while ($slice.Count -gt 0 -and [string]::IsNullOrWhiteSpace($slice[-1])) { $slice = $slice[0..($slice.Count - 2)] }
    return ($slice -join "`n")
}

# S5 SS10 normalization predicate, reproduced exactly.
function Normalize-Citation([string]$s) {
    if ($null -eq $s) { return "" }
    $s = $s.Replace([string][char]0x2018, "'").Replace([string][char]0x2019, "'")
    $s = $s.Replace([string][char]0x201C, '"').Replace([string][char]0x201D, '"')
    $s = $s.Replace([string][char]0x2014, "-").Replace([string][char]0x2013, "-").Replace([string][char]0x2212, "-")
    $s = [regex]::Replace($s, "\s+", " ")
    return $s.Trim()
}

function Remove-TrailingPeriod([string]$s) {
    if ($s.EndsWith(".")) { return $s.Substring(0, $s.Length - 1) }
    return $s
}

# Returns a hashtable: criterion ID -> full Statement text (asterisk delimiters stripped).
function Get-CriterionStatements {
    param([Parameter(Mandatory=$true)][string]$RubricFile)
    $lines = Get-Content -Encoding UTF8 $RubricFile
    $map = @{}
    for ($i = 0; $i -lt $lines.Count; $i++) {
        # A criterion header line: **ID .... -- Title.**
        $m = [regex]::Match($lines[$i], '^\*\*([A-Z]{2,6}-\d{2})\b')
        if (-not $m.Success) { continue }
        $id = $m.Groups[1].Value
        if ($map.ContainsKey($id)) { continue }
        # Find "Statement:" at or after the header line, within this criterion's block.
        $buf = $null
        for ($j = $i; $j -lt [Math]::Min($i + 40, $lines.Count); $j++) {
            $line = $lines[$j]
            if ($null -eq $buf) {
                $si = $line.IndexOf("Statement:")
                if ($si -lt 0) {
                    # Stop if we hit the NEXT criterion header before finding a Statement.
                    if ($j -gt $i -and $line -match '^\*\*[A-Z]{2,6}-\d{2}\b') { break }
                    continue
                }
                $buf = $line.Substring($si + "Statement:".Length)
            } else {
                $buf = $buf + "`n" + $line
            }
            # Terminator: the line ends the italic span -- trimmed text ends in exactly one '*'.
            $t = $line.TrimEnd()
            if ($t.EndsWith("*") -and -not $t.EndsWith("**") -and $buf.Trim().StartsWith("*")) { break }
        }
        if ($null -eq $buf) { continue }
        $stmt = $buf.Trim()
        if ($stmt.StartsWith("*")) { $stmt = $stmt.Substring(1) }
        if ($stmt.EndsWith("*"))   { $stmt = $stmt.Substring(0, $stmt.Length - 1) }
        $map[$id] = $stmt.Trim()
    }
    return $map
}
