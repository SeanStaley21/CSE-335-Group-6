# Start the Backend Server
# This script stops any process using port 3001 and starts the Node.js backend server

Write-Host "Starting Stock Portfolio Backend Server..." -ForegroundColor Cyan

# Navigate to the server directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if server directory exists
if (-not (Test-Path ".\server")) {
    Write-Host "Error: server directory not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this from the project root directory." -ForegroundColor Yellow
    pause
    exit 1
}

# Kill any process using port 3001
Write-Host "Checking for processes using port 3001..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($process) {
    Write-Host "Stopping existing process on port 3001..." -ForegroundColor Yellow
    Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Start the server
Write-Host "Starting backend server on port 3001..." -ForegroundColor Green
Set-Location .\server
node server.js

# If server stops, pause so user can see any errors
Write-Host "`nServer stopped." -ForegroundColor Red
pause
