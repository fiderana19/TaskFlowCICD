#!/bin/sh

set -e

ENVIRONMENT=$1

export ANSIBLE_CONFIG=${CI_PROJECT_DIR}/ansible/ansible.cfg

echo "Deploying the UI..."

ansible-playbook \
  ${CI_PROJECT_DIR}/ansible/playbooks/deploy-front.yml \
  --vault-password-file vault.key \
  --private-key devops-key.pem \
  -l prod-server

echo "Deployment completed"