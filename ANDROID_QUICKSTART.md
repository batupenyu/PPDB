# Quick Start: Run PPDB App on Android Device

## Three Way to Run on Android:

### Method 1: ngrok (Internet Access - Recommended for Remote Testing)

**Terminal 1 - Backend:**
```bash
node server.js
# Server running at http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npx vite --port 5173 --host 0.0.0.0
# Local: http://localhost:5173
# Network: http://192.168.1.4:5173
```

**Terminal 3 - ngrok:**
```bash
ngrok http 5173
```

**On Android Phone:**
Open Chrome → Go to `https://xxxx.ngrok-free.dev`

---

### Method 2: Local Network (Same WiFi - No Internet Needed)

**Start servers:**
```bash
# Option A: Use the script
./start-android.ps1  # Windows PowerShell
# OR
bash start-android.sh  # Mac/Linux

# Option B: Manual
node server.js &
npx vite --port 5173 --host 0.0.0.0 &
```

**Find your local IP:**
- Windows: `ipconfig` → IPv4 Address
- Mac/Linux: `ifconfig | grep "inet "`

**On Android Phone:**
Open Chrome → Go to `http://192.168.1.100:5173` (use your IP)

---

### Method 3: npm Script (Simplest)

```bash
# Uses concurrently to run both servers
npm run dev:android
```

Then access via ngrok or local network as above.

---

## What Was Configured?

✅ **vite.config.js** - Added:
- `host: '0.0.0.0'` - Accept external connections
- `allowedHosts: ['.ngrok-free.dev']` - Allow ngrok URLs
- API proxy to Express backend (port 3001)

✅ **package.json** - Added:
- `npm run dev:android` script for easy startup

✅ **server.js** - Already configured:
- `cors()` middleware (allows all origins)
- `app.listen(PORT)` on all interfaces (0.0.0.0)

✅ **Scripts created**:
- `start-android.ps1` - Windows PowerShell starter
- `start-android.sh` - Bash starter
- `ngrok.ps1` - Quick ngrok launcher

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid Host Header" | Restart Vite after config changes |
| API not working | Check backend is running on port 3001 |
| ngrok URL changes | Free tier = new URL each restart |
| Can't connect locally | Check firewall allows port 5173 |
| Mixed content warning | Use `https://` with ngrok URLs |

---

## For Production Deployment

1. Build static files:
```bash
npm run build
```

2. Serve `dist/` folder with any web server
3. Deploy backend separately
4. Use proper SSL certificates
5. Add authentication

---

**Note:** The app is fully responsive and works on mobile browsers. Form inputs, PDF generation, and Excel export all function on Android devices.