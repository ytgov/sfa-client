#!/bin/sh

# Start the script to run the migrations
cd /usr/src/api
npm run migrate:latest &

# Start Express Server
npm run start
