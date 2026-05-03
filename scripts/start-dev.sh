#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -d node_modules ]]; then
  echo "node_modules not found. Running npm install..."
  npm install
fi

echo "Starting local dev server..."
echo "Local URL usually: http://127.0.0.1:5173"
npm run dev
