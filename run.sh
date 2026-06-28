#!/bin/bash
set -e
echo "[HaikalDev] Starting HaikalDev Dual-Port Launcher..."
if [ -d "/home/container/node/bin" ]; then
    export PATH="/home/container/node/bin:$PATH"
fi
FRONTEND_PORT=${FRONTEND_PORT:-$SERVER_PORT}
BACKEND_PORT=${BACKEND_PORT:-3001}

# 1. Setup Frontend
if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo "[HaikalDev] Installing frontend node modules..."
        npm install --no-audit --no-fund
    fi
    CURRENT_API_BASE="${VITE_API_BASE}"
    CACHED_URL_FILE="/home/container/.cached_api_base"
    REBUILD=false
    if [ ! -d "dist" ]; then
        REBUILD=true
    elif [ -f "$CACHED_URL_FILE" ]; then
        CACHED_URL=$(cat "$CACHED_URL_FILE")
        if [ "$CURRENT_API_BASE" != "$CACHED_URL" ]; then
            REBUILD=true
        fi
    else
        REBUILD=true
    fi
    if [ "$REBUILD" = true ]; then
        export VITE_API_BASE="$CURRENT_API_BASE"
        echo "[HaikalDev] Rebuilding frontend assets..."
        chmod -R +x node_modules/.bin 2>/dev/null || true
        npm run build
        echo "$CURRENT_API_BASE" > "$CACHED_URL_FILE"
    fi
fi

# 2. Setup Backend
if [ -d "backend" ]; then
    cd backend
    if [ ! -d "node_modules" ]; then
        echo "[HaikalDev] Installing backend node modules..."
        npm install --no-audit --no-fund
    fi
    cd /home/container
fi

cleanup() {
    kill "$BACKEND_PID" 2>/dev/null || true
    kill "$FRONTEND_PID" 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 3. Start Backend
cd /home/container/backend
export PORT="$BACKEND_PORT"
node src/server.js &
BACKEND_PID=$!

# 4. Start Frontend
if [ -d "/home/container/dist" ]; then
    cd /home/container
    npx vite preview --port "$FRONTEND_PORT" --host 0.0.0.0 &
    FRONTEND_PID=$!
else
    sleep infinity &
    FRONTEND_PID=$!
fi
wait -n "$BACKEND_PID" "$FRONTEND_PID"
