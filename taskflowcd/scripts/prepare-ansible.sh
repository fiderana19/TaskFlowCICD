#!/bin/sh

set -e

ENVIRONMENT=$1

echo "$VAULT_KEY" > vault.key

mkdir -p ansible/inventories/production/host_vars

echo "ansible_host: $SERVER_IP" > ansible/inventories/production/host_vars/prod-server.yml

cp "$PRIVATE_AWS_KEY" ${CI_PROJECT_DIR}/devops-key.pem

chmod 400 ${CI_PROJECT_DIR}/devops-key.pem

echo "Ansible inventory prepared"