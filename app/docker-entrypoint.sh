#!/bin/sh

pm2 start ./definitions.json --no-daemon

# keep docker running
tail -f /dev/null