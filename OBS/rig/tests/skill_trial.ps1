$rig = "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig"
$claude = "C:\Users\alder\.local\bin\claude.exe"
$py = "$rig\.venv\Scripts\python.exe"
$env:RIG_TEST = '1'
Set-Location -LiteralPath $rig

function Run-Skill($name) {
  "=== typing /$name in a separate Claude Code process ==="
  $sw = [Diagnostics.Stopwatch]::StartNew()
  $out = & $claude -p "/$name" --model haiku --max-turns 2 2>&1 | Out-String
  "exit $LASTEXITCODE after $([math]::Round($sw.Elapsed.TotalSeconds,1)) s"
  $out.Trim()
}

function Show-State($label) {
  "--- ${label}:"
  & $py "$rig\scripts\rig.py" status
  "claude -p processes alive: " + @(Get-CimInstance Win32_Process -Filter "Name='claude.exe'" | Where-Object { $_.CommandLine -match ' -p ' }).Count
  "ffmpeg processes: " + @(Get-Process ffmpeg -ErrorAction SilentlyContinue).Count
}

Run-Skill 'start'
Show-State 'after the Claude process that typed /start has exited'
Start-Sleep -Seconds 15
Show-State '15 s later, with no Claude process attached'
Run-Skill 'pause'
Start-Sleep -Seconds 5
Run-Skill 'pause'
Start-Sleep -Seconds 10
Run-Skill 'stop'
Show-State 'after /stop'
