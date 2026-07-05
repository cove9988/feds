#!/bin/bash
PORT=${1:-3000}
for p in 3000 3004; do
  PID=$(lsof -ti :$p 2>/dev/null)
  [ -n "$PID" ] && kill "$PID" 2>/dev/null && echo "killed $PID on port $p"
done
npm run build && npx next dev -p "$PORT"
