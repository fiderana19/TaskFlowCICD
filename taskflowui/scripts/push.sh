#!/bin/sh

set -e

echo "Loading Docker image..."

docker load < image.tar

echo "Pushing Docker images..."

docker push ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_TAG}

docker push ${DOCKERHUB_ID}/${APP_NAME}:${IMAGE_LATEST_TAG}

echo "Push completed"