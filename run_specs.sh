#!/bin/bash

set -ex

# run server tests via jasmine
./node_modules/jasmine/bin/jasmine.js JASMINE_CONFIG_PATH=spec/server/support/jasmine.json

# run client tests via karma
./node_modules/karma/bin/karma start spec/client/support/karma.conf.js --single-run
