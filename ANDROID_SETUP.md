# PPDB App - Android Device Setup Guide

## Overview
This guide explains how to run the PPDB Student Form app on an Android device for testing and development.

## Prerequisites
- Node.js and npm installed on your development machine
- Android device with internet access
- Both devices on the same network (for LAN method) OR ngrok account (for internet method)

## Method 1: Using ngrok (Recommended - Works Anywhere)

This method exposes your local dev server to the internet via a public URL.

### Step 1: Update vite.config.js
The vite config is already configured to allow ngrok hosts:
```javascript
server: {
  host: '0.0.0.0',
  port: 5173,
  allowedHosts: ['.ngrok-free.dev'],
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      ws: true,
    },
  },
}
```

### Step 2: Start the Backend Server
```bash
node server.js
```
The Express backend runs on port 3001.

### Step 3: Start the Vite Dev Server
```bash
npm run dev
```
Or separately:
```bash
npx vite --port 5173 --host 0.0.0.0
```

### Step 4: Start ngrok Tunnel
```bash
ngrok http 5173
```

You'll see output like:
```
Forwarding: https://abc123.ngrok-free.dev -> http://localhost:5173
```

### Step 5: Access on Android Device
1. Open Chrome/Firefox on your Android device
2. Navigate to: `https://abc123.ngrok-free.dev` (use your actual ngrok URL)
3. The app should load and work normally

### Important Notes for ngrok:
- **Free tier limitation**: The ngrok URL changes each time you restart the tunnel
- **HTTPS**: ngrok provides HTTPS by default (required for modern browser features)
- **API Proxy**: The `/api` endpoint is proxied to your Express backend on port 3001

## Method 2: Local Network (LAN) - No Internet Required

Use this method when both your dev machine and Android device are on the same WiFi network.

### Step 1: Find Your Local IP Address

**Windows:**
```bash
ipconfig
```
Look for `IPv4 Address` (typically 192.168.x.x or 10.x.x.x)

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

### Step 2: Start the Backend Server
```bash
node server.js
```

### Step 3: Start Vite Dev Server
```bash
npx vite --port 5173 --host 0.0.0.0
```

### Step 4: Configure Firewall
Allow incoming connections on port 5173:

**Windows Defender Firewall:**
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Add Inbound Rule for Port 5173 (TCP)

### Step 5: Access on Android Device
1. Open Chrome on Android
2. Navigate to: `http://YOUR_LOCAL_IP:5173`
   - Example: `http://192.168.1.100:5173`

## Method 3: Build & Deploy to Static Hosting

For a production-like experience without Node.js on the device.

### Step 1: Build the App
```bash
npm run build
```
This creates a `dist/` folder with static files.

### Step 2: Serve Static Files
Use any HTTP server to serve the `dist/` folder:

**With Serve (recommended):**
```bash
npm install -g serve
serve -s dist -l 5173
```

**With Python:**
```bash
cd dist
python -m http.server 5173
```

### Step 3: Use ngrok or LAN Method
Then follow Method 1 or 2 to access from Android.

## Mobile Browser Considerations

The app is a responsive web application that works on mobile browsers:

- ✅ Responsive design (works on mobile screens)
- ✅ Touch-friendly form inputs
- ✅ PDF generation (jspdf) works on mobile
- ✅ Excel export (xlsx) works on mobile

## Troubleshooting

### Issue: "Invalid Host Header" error
**Solution**: The vite config already includes `allowedHosts: ['.ngrok-free.dev']`. Restart the dev server after config changes.

### Issue: API calls not working
**Solution**: Check the browser console for CORS errors. The backend (`server.js`) must be running on port 3001.

### Issue: ngrok connection refused
**Solution**: 
1. Verify Vite is running: `curl http://localhost:5173`
2. Check ngrok is using the correct port: `ngrok http 5173`

### Issue: Android device can't connect to local IP
**Solution**:
1. Verify both devices are on the same WiFi network
2. Check Windows Firewall allows port 5173
3. Try pinging your machine from the device
4. Use your machine's IPv4 address, not 127.0.0.1

### Issue: Mixed content warnings
**Solution**: Always use `https://` with ngrok URLs (ngrok provides HTTPS by default)

## Quick Start Script

Create a file `start-android.sh` (or `.ps1` for Windows):

```bash
#!/bin/bash
# Terminals 1-3: Run these in separate terminals

# Terminal 1: Backend
echo "Starting backend on port 3001..."
node server.js

# Terminal 2: Frontend  
echo "Starting Vite on port 5173..."
npx vite --port 5173 --host 0.0.0.0

# Terminal 3: ngrok
echo "Starting ngrok tunnel..."
ngrok http 5173
```

## Development Workflow on Android

1. Start all services (backend, frontend, ngrok)
2. Open ngrok URL on Android device
3. Test the form on the device
4. Make code changes on your computer
5. Hot reload works automatically (Vite HMR over ngrok)
6. Refresh the browser on Android to see changes

## Security Notes

- ⚠️ **ngrok free tier**: URLs are public - don't use with sensitive/real data
- ⚠️ **Local network**: Only use on trusted WiFi networks
- ⚠️ **Firewall**: Close port 5173 when not testing
- ✅ **Production**: Always use proper authentication and HTTPS

## Alternative: Android WebView App

For a more "app-like" experience, wrap the app in a WebView:

1. Create a simple Android app with WebView component
2. Point it to your ngrok URL
3. Add to home screen for easy access

Tools:
- Android Studio (native)
- Capacitor (https://capacitorjs.com/)
- Cordova (legacy)
