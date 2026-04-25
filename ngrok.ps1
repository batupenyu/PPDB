# ngrok tunnel for PPDB app (Vite dev server on port 5173)
Write-Host "Starting ngrok tunnel for port 5173..." -ForegroundColor Green
ngrok http 5173 --region=ap