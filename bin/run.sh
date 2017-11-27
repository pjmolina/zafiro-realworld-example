#!/bin/bash

echo "Installing npm dependencies";
npm install
npm install -g typescript ts-node

echo "Pulling POSTGRES docker image";
docker pull postgres

echo "Creating POSTGRES env variables";
export POSTGRES_USER=postgres \
export POSTGRES_PASSWORD=secret \
export POSTGRES_HOST=localhost \
export POSTGRES_DB=demo

containerId=$(docker ps -a -q --filter ancestor=postgres)

echo "Stopping previous POSTGRES docker containers";
docker stop $containerId

echo "Remove previous POSTGRES docker containers";
docker rm $containerId

echo "Starting docker container";
docker run --name POSTGRES_USER -p 5432:5432  \
-e POSTGRES_PASSWORD="$POSTGRES_PASSWORD"  \
-e POSTGRES_USER="$POSTGRES_USER"  \
-e POSTGRES_DB="$POSTGRES_DB" \
-d postgres

echo "Waiting for POSTGRES container to start..."
sleep 5s

echo "Running the Node.js server";
ts-node ./src/server.ts
