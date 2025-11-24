# Stop the Backend Server
# This script stops any Node.js process running on port 3001

Write-Host "Stopping Stock Portfolio Backend Server..." -ForegroundColor Cyan

# Find and kill process using port 3001
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($process) {
    Write-Host "Found process $process using port 3001" -ForegroundColor Yellow
    Write-Host "Stopping process..." -ForegroundColor Yellow
    Stop-Process -Id $process -Force
    Start-Sleep -Seconds 1
    Write-Host "Backend server stopped successfully!" -ForegroundColor Green
} else {
    Write-Host "No server process found running on port 3001" -ForegroundColor Yellow
}

pause
