#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-}"
if [[ -z "$MESSAGE" ]]; then
  MESSAGE="update cafe planner $(date +%Y-%m-%d-%H%M)"
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "== CafeBusinessPlan save & deploy =="
echo "Project: $ROOT"
echo "Branch: $(git branch --show-current)"
echo

echo "1) Sync latest from GitHub"
git pull --ff-only origin main

echo
echo "2) Build check"
npm run build

echo
echo "3) Link check"
npm run verify:links

echo
echo "4) Git status"
git status --short

if [[ -z "$(git status --short)" ]]; then
  echo "No changes to commit."
else
  echo
  echo "5) Commit & push"
  git add .
  git commit -m "$MESSAGE"
  git push origin main
fi

echo
echo "6) Deployment URL"
echo "https://cafe-business-plan.vercel.app"
echo "Vercel should auto-deploy after the GitHub push."
