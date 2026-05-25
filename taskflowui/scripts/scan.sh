#!/bin/sh

set -e

echo "Starting Snyk scan..."

snyk test \
    --docker ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_TAG} \
    --json > scan_report.json || true

echo "Snyk scan completed"