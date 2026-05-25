# 🚀 TaskFlow CD

> Continuous Deployment repository of the TaskFlow Fullstack DevOps ecosystem.

This project demonstrates a production-ready deployment automation workflow using GitLab CI/CD, Ansible, Docker Compose and AWS EC2.

---

# 📌 Overview

TaskFlow CD is responsible for automating the deployment of the TaskFlow frontend and backend applications.

It provides:

- Automated production deployments
- Docker image updates
- Ansible orchestration
- SSH-based deployment
- Service-specific deployments
- GitLab CI/CD automation

The deployment targets an AWS EC2 production server running Docker Compose.

---

# ⚙️ Tech Stack

* GitLab CI/CD
* Ansible
* Docker
* Docker Compose
* AWS EC2
* SSH Automation
* Linux

---

# ✨ Features

## CI/CD Automation

* Automated deployment pipeline
* Manual production deployment
* GitLab workflow rules
* Artifact sharing between jobs

## Ansible Deployment

* Dynamic inventory generation
* Modular Ansible roles
* SSH-based deployment
* Service-specific orchestration

## Docker Deployment

* Docker image pull
* Selective service restart
* Production container updates
* Persistent PostgreSQL volumes

---

# 🧱 Ansible Deployment Strategy

The deployment uses selective service updates.

## Frontend Deployment

```bash
docker compose up -d frontend
```

## Backend Deployment

```bash
docker compose up -d backend
```

This prevents:
- PostgreSQL recreation
- unnecessary service restarts
- data loss during deployment

---

# 🔐 Secrets Management

Sensitive data is managed through GitLab CI variables.

## CI Variables

- SSH_PRIVATE_KEY
- SERVER_IP
- VAULT_KEY

---

# ⚙️ Deployment Scripts

## `prepare-ansible.sh`

Responsible for:
- generating host variables
- creating SSH key
- preparing deployment configuration

## `deploy-frontend.sh`

Responsible for:
- running frontend Ansible playbook
- updating frontend container

## `deploy-backend.sh`

Responsible for:
- running backend Ansible playbook
- updating backend container

---

# 📸 Results

## GitLab Deployment Pipeline

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/cd.png?raw=true" alt="CD Pipeline" width="800"/>
</p>

---

# 👨‍💻 Author

Developed by Antsa Fiderana

Continuous Deployment repository of the TaskFlow Fullstack DevOps Project.