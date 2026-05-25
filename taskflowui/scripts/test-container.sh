#!/bin/sh

set -e

echo "Loading Docker image..."

docker load < image.tar

echo "Starting Backend container test..."

docker run -d \
    --name ${APP_NAME} \
    -p ${APP_CONTAINER_PORT}:${APP_CONTAINER_PORT} \
    ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_TAG}

echo "Waiting for backend app startup..."

sleep 10

echo "Checking backend container..."

docker ps | grep ${APP_NAME}

echo "Container healthcheck successful"