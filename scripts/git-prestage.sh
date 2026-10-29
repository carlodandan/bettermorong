#!/bin/bash

set -e

echo ""
echo "================================"
echo "       PRE-STAGE CHECKS"
echo "================================"

echo ""
echo "[1/4] Checking formatting..."
FORMAT_FAILED=0
pnpm format:check || FORMAT_FAILED=1

echo ""
echo "[2/4] Checking lint..."
LINT_FAILED=0
pnpm lint || LINT_FAILED=1

if [ "$FORMAT_FAILED" -eq 1 ] || [ "$LINT_FAILED" -eq 1 ]; then
    echo ""
    echo "[3/4] Issues detected. Running automatic fixes..."

    pnpm format
    pnpm lint:fix

    echo ""
    echo "Rechecking..."

    pnpm format:check
    pnpm lint
else
    echo ""
    echo "All checks passed. No fixes needed."
fi

echo ""
echo "[4/4] Staging changes..."

git add "$@"

echo ""
echo "Successfully staged changes!"