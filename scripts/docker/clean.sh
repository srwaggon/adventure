#!/usr/bin/env bash

docker ps -a -q --filter="ancestor=swaggoner/adventure"
docker image rm swaggoner/adventure
