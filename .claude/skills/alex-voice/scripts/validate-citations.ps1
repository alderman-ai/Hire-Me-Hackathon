# validate-citations.ps1 -- alex-voice deterministic citation validator (no model call).
#
# Lineage: Alex's Write Great Post skill, validator "validate-citations-s7.ps1", copied with its logic
# unchanged. Only this header, the lib path default and the failure-file title differ.
#
# What it checks: EVERY criterion ID in the WHOLE assessment file (reasoning included), bracketed or bare.
# Each ID must exist in the rubric; each ID followed (within $QuoteWindow chars, separated only by
# punctuation/markdown or a literal "Statement:") by a quoted span must quote that criterion's Statement
# EXACTLY under the normalization predicate: whitespace runs -> one space; trim; curly quotes and dashes ->
# ASCII; one trailing period ignored. Equality, not containment: a substring can drop a negation.
# An ID with no adjacent quote is a mention (NOTEXT) and is counted, not failed.
# A failure that is quote-character substitution only (inner double quotes swapped for single) is
# reported but does not halt (operator ruling, 12 Aug 2026).
#
# OUTPUT DISCIPLINE: prints PASS/FAIL/NOTEXT labels and classifications ONLY -- never criterion text and
# never grader prose. On failure both texts go to $FailuresFile verbatim. The writing session never opens
# the assessment file; this script and append-assessment.ps1 are its only readers.
#
# Exit codes: 0 = all citations valid; 1 = one or more failures (HALT); 2 = assessment unreadable.
# Saved as UTF-8 WITH a BOM: one regex below carries non-ASCII dashes, and Windows PowerShell 5.1 reads a
# BOM-less .ps1 as ANSI.
param(
    [Parameter(Mandatory=$true)][string]$AssessmentFile,
    [Parameter(Mandatory=$true)][string]$RubricFile,
    [Parameter(Mandatory=$true)][string]$FailuresFile,
    [string]$Label = "",
    [string]$LibPath = "",
    [int]$QuoteWindow = 160
)

if (-not $LibPath) { $LibPath = Join-Path $PSScriptRoot "lib-rubric.ps1" }
if (-not (Test-Path $LibPath)) { Write-Output "MISSING LIB: $LibPath"; exit 2 }
. $LibPath

if (-not (Test-Path $AssessmentFile)) { Write-Output "MISSING: $AssessmentFile"; exit 2 }
if (-not (Test-Path $RubricFile))     { Write-Output "MISSING: $RubricFile"; exit 2 }

$assess = Get-Content -Raw -Encoding UTF8 $AssessmentFile
if ([string]::IsNullOrWhiteSpace($assess)) { Write-Output "PARSE-FAIL: assessment is empty"; exit 2 }

$statements = Get-CriterionStatements -RubricFile $RubricFile
if ($statements.Count -eq 0) { Write-Output "PARSE-FAIL: no criteria extracted from rubric"; exit 2 }

$QUOTES = @([char]0x0022, [char]0x201C, [char]0x201D)

function Get-QuotePositions([string]$s) {
    $pos = @()
    for ($i = 0; $i -lt $s.Length; $i++) { if ($QUOTES -contains $s[$i]) { $pos += $i } }
    return ,$pos
}

function WordOverlap([string]$a, [string]$b) {
    $ta = [regex]::Split($a.ToLowerInvariant(), "[^a-z0-9]+") | Where-Object { $_.Length -gt 2 }
    $tb = [regex]::Split($b.ToLowerInvariant(), "[^a-z0-9]+") | Where-Object { $_.Length -gt 2 }
    if (-not $ta -or ($ta | Measure-Object).Count -eq 0) { return 0.0 }
    $setB = @{}; foreach ($t in $tb) { $setB[$t] = $true }
    $hit = 0; foreach ($t in $ta) { if ($setB.ContainsKey($t)) { $hit++ } }
    return $hit / (($ta | Measure-Object).Count)
}

$idMatches = [regex]::Matches($assess, "(?<![A-Za-z0-9-])\[?([A-Z]{2,6}-\d{2})\]?(?![A-Za-z0-9-])")
if ($idMatches.Count -eq 0) {
    Write-Output "OK: no criterion ID appears anywhere in the assessment, bracketed or bare (0 pairs)"
    exit 0
}

$anyFail = $false
$failLines = @()
$nPass = 0; $nNoText = 0; $nFail = 0; $nQuoteSub = 0

for ($m = 0; $m -lt $idMatches.Count; $m++) {
    $id = $idMatches[$m].Groups[1].Value
    $blobStart = $idMatches[$m].Index + $idMatches[$m].Length
    if ($m + 1 -lt $idMatches.Count) { $blobEnd = $idMatches[$m + 1].Index } else { $blobEnd = $assess.Length }
    $blob = $assess.Substring($blobStart, $blobEnd - $blobStart)

    $idExists = $statements.ContainsKey($id)
    $trueText = $null
    if ($idExists) { $trueText = $statements[$id] }
    $trueNorm = $null
    if ($null -ne $trueText) { $trueNorm = Remove-TrailingPeriod (Normalize-Citation $trueText) }

    $qpos = Get-QuotePositions $blob
    # ADJACENCY TEST (added 2026-08-12, with the bare-ID widening -- see the header note).
    # A quotation is this ID's CITATION only if it is what the contract's `[ID] "text"` form means:
    # the quote opens immediately after the ID, separated by nothing but punctuation, markdown or an
    # optional literal `Statement:` label. A quote sitting further inside a sentence is the grader
    # quoting a phrase in its prose, not asserting "this is the criterion text", and treating it as
    # a citation manufactures FAILs -- i.e. spurious §7 halts -- out of ordinary commentary.
    # Direction of the error is deliberate: a missed pair is REPORTED as a mention and counted, so
    # it is visible; a false pair would stop the run on a defect that is not there.
    if ($qpos.Count -ge 1) {
        $gap = $blob.Substring(0, $qpos[0])
        $gapOk = ($qpos[0] -le $QuoteWindow) -and
                 ((($gap -replace '(?i)statement\s*:', '') -match '^[\s\-–—:·*_>|.,()\[\]]*$'))
        if (-not $gapOk) { $qpos = @() }
    }
    if ($qpos.Count -lt 2) {
        # No quote-delimited span: this [ID] is a mention, not a pair. The ID must still exist.
        if ($idExists) {
            Write-Output "NOTEXT [$id] (mention without quoted text -- ID exists)"
            $nNoText++
            continue
        }
        $anyFail = $true; $nFail++
        Write-Output "FAIL [$id] classification=not-found id_exists=False"
        $failLines += "## Citation failure -- $Label [$id] -- classification: not-found (ID does not exist in the rubric)"
        $failLines += ""
        continue
    }

    $spanStart = $qpos[0] + 1
    $matched = $false
    $longest = ""
    foreach ($q in ($qpos | Where-Object { $_ -gt $qpos[0] })) {
        $cand = $blob.Substring($spanStart, $q - $spanStart)
        if ($cand.Length -gt $longest.Length) { $longest = $cand }
        if ($null -ne $trueNorm) {
            $candNorm = Remove-TrailingPeriod (Normalize-Citation $cand)
            if ($candNorm.Length -gt 0 -and $candNorm -ceq $trueNorm) { $matched = $true; break }
        }
    }

    if ($idExists -and $matched) { Write-Output "PASS [$id]"; $nPass++; continue }

    # QUOTE-SUBSTITUTION SUB-CLASSIFICATION (diagnostic only; the verdict is unchanged).
    # The shared predicate maps curly quotes to ASCII but does not equate ' with " -- it never
    # anticipated a grader NESTING quotes. A criterion whose statement contains internal double
    # quotes cannot be quoted verbatim inside a double-quoted citation without either breaking the
    # citation or swapping the inner pair for single quotes. This test reports, without changing
    # the strict result, whether a failure is exactly that: identical once EVERY quote-family
    # character on both sides is folded to one sentinel.
    $quoteSub = $false
    if ($null -ne $trueNorm) {
        $QRE = "[" + [char]0x22 + [char]0x27 + [char]0x2018 + [char]0x2019 + [char]0x201C + [char]0x201D + "]"
        $foldTrue = [regex]::Replace($trueNorm, $QRE, "#")
        foreach ($q in ($qpos | Where-Object { $_ -gt $qpos[0] })) {
            $c = $blob.Substring($spanStart, $q - $spanStart)
            $cf = [regex]::Replace((Remove-TrailingPeriod (Normalize-Citation $c)), $QRE, "#")
            if ($cf.Length -gt 0 -and $cf -ceq $foldTrue) { $quoteSub = $true; break }
        }
    }

    $anyFail = $true; $nFail++
    $emittedNorm = Remove-TrailingPeriod (Normalize-Citation $longest)
    $classification = "not-found"
    if ($null -ne $trueNorm) {
        if ($emittedNorm.Length -gt 0 -and $trueNorm.Contains($emittedNorm)) { $classification = "truncated" }
        else {
            $best = 0.0
            foreach ($cid in $statements.Keys) {
                $ov = WordOverlap $emittedNorm (Normalize-Citation $statements[$cid])
                if ($ov -gt $best) { $best = $ov }
            }
            if ($best -ge 0.5) { $classification = "divergent" } else { $classification = "not-found" }
        }
    }
    if ($quoteSub) { $classification = "quote-substitution"; $nQuoteSub++ }
    Write-Output "FAIL [$id] classification=$classification id_exists=$idExists"
    $failLines += "## Citation failure -- $Label [$id] -- classification: $classification"
    $failLines += ""
    $failLines += "**Emitted text (verbatim, longest quoted span from the first quote after the ID):**"
    $failLines += ""
    $failLines += '```'
    $failLines += $longest
    $failLines += '```'
    $failLines += ""
    $failLines += "**True criterion text (verbatim):**"
    $failLines += ""
    $failLines += '```'
    if ($null -ne $trueText) { $failLines += $trueText } else { $failLines += "(no criterion with this ID exists in the rubric)" }
    $failLines += '```'
    $failLines += ""
}

Write-Output "SUMMARY $Label pairs_validated=$nPass failures=$nFail (of which quote-substitution-only=$nQuoteSub) mentions_without_text=$nNoText total_ids=$($idMatches.Count)"

# OPERATOR RULING, 2026-08-12 (run 7): a failure that is quote-character substitution ONLY does
# not fire the §7 halt. The strict count is still reported, unchanged, so S7's citation validity
# stays comparable with S5's and S6's under the shared predicate -- the report carries BOTH numbers.
# The shared predicate itself is NOT amended (that would silently rewrite what S5's and S6's
# published figures mean). Cause, referred upward rather than fixed here: five criterion statements
# contain internal double quotes, so they cannot be quoted verbatim inside a double-quoted citation.
if ($anyFail -and $nFail -eq $nQuoteSub) {
    Write-Output "NOT A HALT: all $nFail failure(s) are quote-character substitution only (operator ruling, 12 Aug 2026). Strict count stands; exit 0."
    if ($failLines.Count -gt 0) {
        $header = @()
        if (-not (Test-Path $FailuresFile)) { $header = @("# alex-voice citation failures -- recorded verbatim by validate-citations.ps1", "") }
        ($header + $failLines) | Add-Content -Path $FailuresFile -Encoding UTF8
    }
    exit 0
}

if ($anyFail) {
    $header = @()
    if (-not (Test-Path $FailuresFile)) {
        $header = @("# alex-voice citation failures -- recorded verbatim by validate-citations.ps1", "")
    }
    ($header + $failLines) | Add-Content -Path $FailuresFile -Encoding UTF8
    exit 1
}
exit 0
