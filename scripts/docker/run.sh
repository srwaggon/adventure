#!/usr/bin/env bash

set -euo pipefail

# Fail with a clear error if any required env var is missing
: "${GOOGLE_CLIENT_ID:?Missing GOOGLE_CLIENT_ID}"
: "${GOOGLE_CLIENT_SECRET:?Missing GOOGLE_CLIENT_SECRET}"
: "${SSL_KEYSTORE_PASSWORD:?Missing SSL_KEYSTORE_PASSWORD}"

docker run \
  --env GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID" \
  --env GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET" \
  --env SSL_KEYSTORE_PASSWORD="$SSL_KEYSTORE_PASSWORD" \
  --rm \
  --detach \
  --volume database:/database \
  --publish 8080:8080 \
  --publish 8443:8443 \
  --name adventure \
  swaggoner/adventure
