#!/bin/sh

set -e

echo "Provisioning infrastructure..."

cp "$PRIVATE_AWS_KEY" ${CI_PROJECT_DIR}/devops-key.pem

chmod 400 ${CI_PROJECT_DIR}/devops-key.pem

cd app

terraform init \
  -backend-config="key=fiderana19-taskflow.tfstate"

terraform apply \
  -var-file="terraform.tfvars" \
  --auto-approve

echo "Provisioning completed"