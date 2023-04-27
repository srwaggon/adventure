#!/usr/bin/env bash

set -ex

cp -r database/ database_$(date +"%y-%m-%d_%H%M")/
rm -rf database/
scp -r digitalocean:~/adventure/database .
