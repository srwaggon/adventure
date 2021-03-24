#!/usr/bin/env bash

docker pull swaggoner/adventure:latest
docker run \
       --rm \
       -v ~/adventure/database:/database \
       -p 80:8080 \
       swaggoner/adventure:latest
