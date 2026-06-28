#!/bin/bash
set -e
echo "[HaikalDev] Starting HaikalDev Dual-Port Launcher..."
if [ -d "/home/container/node/bin" ]; then
    export PATH="/home/container/node/bin:$PATH"
fi
FRONTEND_PORT=${FRONTEND_PORT:-$SERVER_PORT}
BACKEND_PORT=${BACKEND_PORT:-3001}

# 0. Check and Upgrade Node.js version to v22 (requires Node >= 22.5.0 for node:sqlite)
NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "[HaikalDev] Node.js version is older than v22 (v$(node -v)). Upgrading portable Node.js to v22.12.0..."
    ARCH_RAW=$(uname -m)
    if [ "$ARCH_RAW" = "aarch64" ] || [ "$ARCH_RAW" = "arm64" ]; then
        ARCH="arm64"
    else
        ARCH="x64"
    fi
    
    cd /home/container
    NODE_VER="v22.12.0"
    NODE_DIR="node-${NODE_VER}-linux-${ARCH}"
    NODE_TAR="${NODE_DIR}.tar.xz"
    
    echo "[HaikalDev] Downloading Node.js ${NODE_VER} for linux-${ARCH}..."
    if command -v curl &>/dev/null; then
        curl -LsO "https://nodejs.org/dist/${NODE_VER}/${NODE_TAR}"
    else
        wget -q "https://nodejs.org/dist/${NODE_VER}/${NODE_TAR}"
    fi
    
    echo "[HaikalDev] Extracting Node.js..."
    tar -xf "${NODE_TAR}"
    
    rm -rf node_old
    if [ -d "node" ]; then
        mv node node_old
    fi
    mv "${NODE_DIR}" node
    rm -rf node_old "${NODE_TAR}"
    
    export PATH="/home/container/node/bin:$PATH"
    echo "[HaikalDev] Upgraded portable Node.js to $(node -v)"
fi

# 1. Setup Frontend
if [ -f "package.json" ]; then
    if [ ! -d "node_modules" ]; then
        echo "[HaikalDev] Installing frontend node modules..."
        npm install --no-audit --no-fund
    else
        echo "[HaikalDev] Ensuring platform-specific packages..."
        npm rebuild esbuild --no-audit --no-fund 2>/dev/null || true
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
