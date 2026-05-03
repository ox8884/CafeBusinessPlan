#!/usr/bin/env bash
set -euo pipefail

URL="${1:-https://cafe-business-plan.vercel.app}"
echo "Checking $URL"

STATUS="$(curl -L -s -o /tmp/cafe-business-plan-check.html -w '%{http_code}' "$URL")"
echo "HTTP status: $STATUS"

if [[ "$STATUS" != "200" ]]; then
  echo "Deployment check failed."
  exit 1
fi

if grep -q "Dessert Cafe Startup Planner" /tmp/cafe-business-plan-check.html; then
  echo "OK: App HTML title found."
else
  echo "Warning: HTTP 200, but expected app title was not found."
fi
