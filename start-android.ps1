#!/usr/bin/env pwsh
# Start PPDB app for Android device testing
# This script starts the backend and frontend with Android-compatible settings

Write-Host "=== PPDB App - Android Device Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if ports are already in use
Write-Host "Checking ports..." -ForegroundColor Yellow
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
$port5174 = Get-NetTCPConnection -LocalPort 5174 -ErrorAction SilentlyContinue
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue

if ($port3001) {
    Write-Host "⚠️  Port 3001 is already in use. Stopping existing process..." -ForegroundColor Yellow
    Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force -ErrorAction SilentlyContinue
}
if ($port5173 -or $port5174) {
    $p = if ($port5173) { $port5173 } else { $port5174 }
    Write-Host "⚠️  Port $($p.LocalPort) is already in use. Stopping existing process..." -ForegroundColor Yellow
    Stop-Process -Id $p.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Starting backend server (Express on port 3001)..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js" -PassThru -ErrorAction Stop

Write-Host "Starting frontend dev server (Vite on port 5173)..." -ForegroundColor Green
$env:VITE_PORT = "5173"
Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "vite", "--port", "5173", "--host", "0.0.0.0" -PassThru -ErrorAction Stop

Write-Host ""
Write-Host "=== Servers Started ===" -ForegroundColor Cyan
Write-Host "Backend (API):    http://localhost:3001" -ForegroundColor White
Write-Host "Frontend (Vite):  http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "To access from Android device:" -ForegroundColor Yellow
Write-Host "  Option 1 (ngrok): Run 'ngrok http 5173' and open the ngrok URL on your phone" -ForegroundColor White
Write-Host "  Option 2 (LAN):   Find your local IP with 'ipconfig' and open http://YOUR_IP:5173 on your phone" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 10
        # Check if processes are still running
        $nodeRunning = Get-Process -Name node -ErrorAction SilentlyContinue
        if (-not $nodeRunning) {
            Write-Host "Backend server stopped unexpectedly!" -ForegroundColor Red
            break
        }
    }
} finally {
    Write-Host "`nStopping servers..." -ForegroundColor Yellow
    Stop-Process -Name node -Force -ErrorAction SilentlyContinue
    Stop-Process -Name vite -Force -ErrorAction SilentlyContinue
    Write-Host "Servers stopped." -ForegroundColor Green
}
