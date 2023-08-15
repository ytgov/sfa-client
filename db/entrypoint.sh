#!/bin/bash

# Start the script to create the DB and user
cd /usr/src/db
./bin/configure-db.sh &

# Start SQL Server
/opt/mssql/bin/sqlservr
