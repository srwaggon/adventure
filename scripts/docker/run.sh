#!/usr/bin/env bash

set -ex

docker run --rm -d -v database:/database -p 8080:8080 swaggoner/adventure
