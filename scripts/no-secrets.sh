#!/usr/bin/env bash
#
# Secret guard.
#
# Catches accidentally-committed live or test secrets from common payment
# and infrastructure providers. The patterns require enough trailing
# characters to avoid matching variable names or doc placeholders like
# "sk_live_..." or "STRIPE_SECRET_KEY".
#
# Run manually:   npm run check:no-secrets
# Run as a hook:  see .githooks/pre-commit
#
# Exits non-zero if any matching pattern is found in tracked source files.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TARGETS=(
  "app"
  "components"
  "lib"
  "i18n"
  "messages"
  "scripts"
  "public"
  ".github"
  "next.config.ts"
  "open-next.config.ts"
  "wrangler.jsonc"
  ".env.production"
  ".env.local.example"
  "README.md"
  "AGENTS.md"
  "DEPLOY.md"
)

PATTERNS=(
  'sk_live_[A-Za-z0-9]{20,}'
  'sk_test_[A-Za-z0-9]{20,}'
  'rk_live_[A-Za-z0-9]{20,}'
  'rk_test_[A-Za-z0-9]{20,}'
  'whsec_[A-Za-z0-9]{20,}'
  'AKIA[0-9A-Z]{16}'
  'AIza[0-9A-Za-z_-]{35}'
  'ghp_[A-Za-z0-9]{36}'
  'gho_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{40,}'
)

EXISTING=()
for path in "${TARGETS[@]}"; do
  if [ -e "$path" ]; then
    EXISTING+=("$path")
  fi
done

if [ ${#EXISTING[@]} -eq 0 ]; then
  echo "no-secrets: nothing to scan, skipping"
  exit 0
fi

JOINED=$(IFS='|'; echo "${PATTERNS[*]}")

HITS=$(LC_ALL=C grep -rIn --color=never -E "$JOINED" "${EXISTING[@]}" || true)

if [ -n "$HITS" ]; then
  echo "no-secrets: a value matching a known secret pattern was found"
  echo "move the value to a Wrangler secret (wrangler secret put NAME) and remove it from source"
  echo
  echo "$HITS"
  exit 1
fi

echo "no-secrets: clean"
exit 0
