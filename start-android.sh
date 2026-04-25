#!/bin/bash
# Start PPDB app for Android device testing
# Requires: Node.js, npm, and ngrok (optional)

set -e

echo "=== PPDB App - Android Device Setup ==="
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -t -i:$port 2>/dev/null)
    if [ -n "$pid" ]; then
        echo "Stopping process on port $port (PID: $pid)..."
        kill -9 $pid 2>/dev/null || true
        sleep 2
    fi
}

# Kill existing processes on our ports
echo "Checking ports..."
kill_port 3001
kill_port 5173
kill_port 5174

# Start backend server
echo ""
echo "Starting backend server (Express on port 3001)..."
node server.js &
BACKEND_PID=$!
sleep 3

# Start frontend dev server
echo "Starting frontend dev server (Vite on port 5173)..."
HOST=0.0.0.0 PORT=5173 npx vite --port 5173 --host 0.0.0.0 &
FRONTEND_PID=$!
sleep 3

# Show status
echo ""
echo "=== Servers Started ==="
echo "Backend (API):    http://localhost:3001"
echo "Frontend (Vite):  http://localhost:5173"
echo ""

# Get local IP
LOCAL_IP=$(ipconfig 2>/dev/null | grep -oP '(?<=IPv4 Address[. ]+: )\S+' | head -1)
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
fi
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP=$(ifconfig 2>/dev/null | grep -oP '(?<=inet )\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -1)
fi

echo "To access from Android device:"
echo "  Your local IP: $LOCAL_IP"
echo "  Option 1 (ngrok): Run './ngrok.ps1' or 'ngrok http 5173' and open the ngrok URL on your phone"
echo "  Option 2 (LAN):   Open http://$LOCAL_IP:5173 on your phone (same WiFi)"
echo ""

# Cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    kill_port 3001
    kill_port 5173
    echo "Servers stopped."
    exit 0
}

trap cleanup SIGINT SIGTERM

# Keep running
wait
