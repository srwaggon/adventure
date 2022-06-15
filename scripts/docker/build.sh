#!/usr/bin/env bash

docker build --build-arg JAR_FILE=build/libs/*.jar -t swaggoner/adventure .