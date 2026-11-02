# Starts the grading booth (if it isn't already running) and opens it in the default browser.
# Run from anywhere:  & "C:\Users\alder\Desktop\Hire me hackaton\legibility\grading\launch.ps1"
param([int]$Port = 8765)

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$server = Join-Path $here 'server.py'
$url = "http://127.0.0.1:$Port/"

function Test-Booth {
    try {
        $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 -Uri ($url + 'api/moments')
        return $r.StatusCode -eq 200
    } catch { return $false }
}

if (Test-Booth) {
    Write-Host "The booth is already running: $url"
    Start-Process $url
    return
}

$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) { Write-Host 'Python was not found on PATH.' -ForegroundColor Red; return }

# The server runs in its own minimised window: close that window to stop it.
Start-Process -FilePath $python -WorkingDirectory $here -WindowStyle Minimized `
    -ArgumentList @('-I', "`"$server`"", '--port', "$Port", '--open')

for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Milliseconds 250
    if (Test-Booth) {
        Write-Host "Grading booth: $url (the server is the minimised Python window; close it to stop)"
        return
    }
}
Write-Host "The server did not start on port $Port. To see why, run:" -ForegroundColor Red
Write-Host "  python -I `"$server`" --port $Port"
