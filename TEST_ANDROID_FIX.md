# Android "Failed to Fetch" - Root Cause & Fix

## Problem
When accessing the PPDB app on Android via ngrok (HTTPS URL), the browser shows:
```
Error: Failed to fetch students
```

## Root Cause
The frontend had a **hardcoded HTTP URL** for the API:

```javascript
const API_BASE = 'http://localhost:3001/api';  // ❌ Hardcoded
```

When served over HTTPS (ngrok), browsers block HTTP API calls due to **mixed content policy**.

The fetch attempts to call `http://localhost:3001/api/students` from a page loaded via `https://xxxx.ngrok-free.dev`, which is blocked by the browser's security policy.

## Fix Applied

### 1. Changed API_BASE to relative URL
**File:** `src/hooks/useStudentData.js`

```javascript
// Before ❌
const API_BASE = 'http://localhost:3001/api';

// After ✅
const API_BASE = '/api';
```

Now the browser makes requests to `/api/students` relative to the current origin, which works for both:
- `http://localhost:5173/api/students` (local dev)
- `https://xxxx.ngrok-free.dev/api/students` (ngrok)
- `http://192.168.1.100:5173/api/students` (LAN)

### 2. Vite Proxy Configuration
**File:** `vite.config.js`

The Vite dev server proxies `/api` requests to the Express backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
    ws: true,
  },
}
```

So when the frontend calls `/api/students`, Vite forwards it to `http://localhost:3001/api/students` internally.

### 3. CORS Headers Added
**File:** `server.js`

Added explicit CORS headers to allow cross-origin requests:

```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

## Why This Works

| Scenario | Frontend URL | API Call (After Fix) | Vite Proxy | Express Receives | ✅ Works |
|----------|--------------|---------------------|------------|------------------|----------|
| Local | `http://localhost:5173` | `/api/students` | → `http://localhost:3001/api/students` | Localhost:3001 | ✅ |
| Ngrok | `https://xxx.ngrok-free.dev` | `/api/students` | → `http://localhost:3001/api/students` | Localhost:3001 | ✅ |
| LAN | `http://192.168.1.100:5173` | `/api/students` | → `http://localhost:3001/api/students` | Localhost:3001 | ✅ |

## Testing the Fix

### Step 1: Verify the change
```bash
cat src/hooks/useStudentData.js | head -5
```
Should show: `const API_BASE = '/api';`

### Step 2: Start servers
```bash
# Terminal 1: Backend
node server.js

# Terminal 2: Frontend  
npx vite --port 5173 --host 0.0.0.0

# Terminal 3: Ngrok
ngrok http 5173
```

### Step 3: Test on Android
1. Open Chrome on Android
2. Go to `https://xxxx.ngrok-free.dev`
3. App should load without "Failed to fetch" error
4. Check network tab in DevTools (chrome://inspect)

### Step 4: Verify API calls
In Chrome DevTools → Network tab:
- Request URL should be: `https://xxxx.ngrok-free.dev/api/students`
- Status should be: `200 OK`
- Response should contain student data

## Common Issues After Fix

### Issue: "Invalid Host Header" on Android
**Solution:** The vite config has `allowedHosts: ['.ngrok-free.dev']`. Restart the dev server after config changes.

### Issue: 404 on `/api/students`
**Solution:** Check that:
1. Backend is running on port 3001
2. Vite proxy is configured correctly
3. No typos in the API_BASE variable

### Issue: CORS error
**Solution:** The server.js now has CORS headers. Restart backend after changes.

## Browser Security Context

When using ngrok:
- Frontend: `https://xxxx.ngrok-free.dev` (secure)
- API calls: `/api/students` (relative, automatically HTTPS via ngrok)
- Vite proxies internally: `http://localhost:3001` (server-side, no browser security)
- Express API: Never exposed directly to browser

This is the correct architecture - the browser only talks to Vite (via ngrok), and Vite talks to Express internally.

## Production Note

In production (after `npm run build`):
- Frontend is static files served by any web server
- Backend should be configured with proper CORS for production domains
- Use proper SSL certificates (not ngrok)
- Add authentication
- Use environment variables for API URLs if needed

For development with ngrok, the relative URL approach is the standard solution.
