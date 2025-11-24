# Start Both Frontend and Backend Servers
# This script starts both the React frontend and Node.js backend

Write-Host "Starting Stock Portfolio Application..." -ForegroundColor Cyan
Write-Host "This will start both backend (port 3001) and frontend (port 5173)" -ForegroundColor Yellow
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Kill any existing processes
Write-Host "Cleaning up any existing processes..." -ForegroundColor Yellow
$backend = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($backend) { Stop-Process -Id $backend -Force -ErrorAction SilentlyContinue }

$frontend = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($frontend) { Stop-Process -Id $frontend -Force -ErrorAction SilentlyContinue }

Start-Sleep -Seconds 2

# Start backend in new window
Write-Host "Starting backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath\server'; Write-Host 'Backend Server Running on http://localhost:3001' -ForegroundColor Green; node server.js"

Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; Write-Host 'Frontend Running - Opening browser...' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 5

# Open browser
Write-Host "Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Application started successfully!" -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the PowerShell windows to stop the servers" -ForegroundColor Yellow
pause
