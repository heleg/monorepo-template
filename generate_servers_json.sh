#!/bin/bash

# Load .env file, ensuring compatibility with envsubst
set -a  # Automatically export all variables
. packages/api/.env  # Equivalent to 'source'
set +a  # Stop exporting automatically

# Substitute variables in the template
envsubst < servers.template.json > servers.json
