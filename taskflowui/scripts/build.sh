#!/bin/sh

set -e

echo "Building Docker image..."

docker build \
    -t ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_TAG} \
    -t ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_LATEST_TAG} \
    ./

echo "Saving image..."

docker save ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_TAG} \
    ${DOCKERHUB_ID}/${APP_NAME}:latest \
    > image.tar

echo "Build completed"