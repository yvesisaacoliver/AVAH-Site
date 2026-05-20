#!/usr/bin/env bash
#
# Em-dash guard.
#
# Em dashes (U+2014) and en dashes (U+2013) are forbidden in the Kinder Horizon
# Foundation site copy and code. They are the most common "smell" of AI-generated
# text and undermine the brand's voice. Use commas, parens, colons, regular
# hyphens, or sentence splits instead.
#
# Run manually:   npm run check:no-em-dash
# Run as a hook:  see .githooks/pre-commit
#
# Exits non-zero if any em or en dash is found in tracked source files.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Files we care about. Skip generated, vendored, and lockfiles.
TARGETS=(
  "app"
  "components"
  "lib"
  "i18n"
  "messages"
  "scripts"
  "public"
  "README.md"
  "AGENTS.md"
)

# Em dash U+2014 and en dash U+2013, expressed as hex escapes so this file
# does not itself trip the check. Long minus and other look-alikes can be
# added later if Mahdi reports any sneaking in.
PATTERN=$'\xe2\x80\x93\xe2\x80\x94'

EXISTING=()
for path in "${TARGETS[@]}"; do
  if [ -e "$path" ]; then
    EXISTING+=("$path")
  fi
done

if [ ${#EXISTING[@]} -eq 0 ]; then
  echo "no-em-dash: nothing to scan, skipping"
  exit 0
fi

# -P enables Perl regex (handles unicode escapes correctly via grep on macOS via system grep)
# Fallback to a literal byte pattern if -P is unavailable.
HITS=$(LC_ALL=C grep -rIn --color=never -E $'\xE2\x80\x93|\xE2\x80\x94' "${EXISTING[@]}" || true)

if [ -n "$HITS" ]; then
  echo "no-em-dash: forbidden em/en dash found, please replace with comma, parens, colon, regular hyphen, or sentence split"
  echo
  echo "$HITS"
  exit 1
fi

echo "no-em-dash: clean"
exit 0
