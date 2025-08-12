#!/usr/bin/env bash

docker buildx build \
  --platform linux/amd64 \
  --build-arg JAR_FILE=build/libs/*.jar \
  --tag swaggoner/adventure .
