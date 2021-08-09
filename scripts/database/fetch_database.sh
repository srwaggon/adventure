#!/usr/bin/env bash

set -ex

rm -rf database
scp -r digitalocean:~/adventure/database .
