#!/usr/bin/env bash

set -eu

./scripts/clean.sh
./scripts/build.sh
./scripts/docker/clean.sh
./scripts/docker/build.sh
./scripts/docker/push.sh
