#!/usr/bin/env bash

set -ex

mv database/ database_$(date +"%y-%m-%d_%H%M")/
scp -r digitalocean:~/adventure/database .
