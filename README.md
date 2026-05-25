# 🚀 TaskFlow — Fullstack DevOps Project

> End-to-end production-ready Fullstack DevOps project using FastAPI, React, Docker, GitLab CI, Ansible, Terraform and AWS EC2.

---

# 📌 Overview

TaskFlow is a modern fullstack task management application built with a complete DevOps workflow and production deployment lifecycle.

This project demonstrates:

* Fullstack application development
* Frontend & backend containerization
* Infrastructure provisioning with Terraform
* CI/CD automation with GitLab CI
* Automated deployments using Ansible
* Docker-based production deployment
* AWS EC2 infrastructure management
* Reverse proxy with NGINX
* PostgreSQL persistence
* Environment-based configuration
* Production-ready architecture

---

# 🏗️ Global Architecture

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/archi.png?raw=true" alt="Architecture" width="800"/>
</p>

---

# 🧱 Tech Stack

## Frontend

* React
* Vite
* TypeScript
* NGINX
* Docker

## Backend

* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL
* JWT Authentication
* Docker

## DevOps

* Docker & Docker Compose
* GitLab CI/CD
* Ansible
* Terraform
* AWS EC2
* NGINX Reverse Proxy

## Cloud & Infrastructure

* AWS EC2
* Security Groups
* EBS Volumes
* SSH Access

---

# 📂 Project Structure

```txt
TASKFLOW-CICD/
│
├── taskflowbackend/
│   ├── app/
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .gitlab-ci.yml
│
├── taskflowui/
│   ├── src/
│   ├── nginx.conf
│   ├── Dockerfile
│   └── .gitlab-ci.yml
│
├── taskflowcd/
│   ├── ansible/
│   │   ├── inventories/
│   │   ├── playbooks/
│   │   └── roles/
│   │
│   ├── scripts/
│   └── .gitlab-ci.yml
│
└── terraform/
    ├── app/
    └── modules/
```

---

# ⚙️ Features

## ✅ Frontend

* Authentication UI
* JWT Login/Register
* Responsive UI
* API integration
* NGINX production serving

## ✅ Backend

* JWT Authentication
* CRUD Operations
* PostgreSQL persistence
* Alembic migrations
* REST API
* SQLAlchemy ORM

## ✅ DevOps

* Multi-stage Docker builds
* Production Docker Compose
* Automated deployments
* Infrastructure as Code
* CI/CD pipelines
* Modular Ansible roles

---

# 🐳 Docker Architecture

## Frontend Container

```txt
React + Vite
↓
Docker Multi-stage Build
↓
NGINX Production Container
```

## Backend Container

```txt
FastAPI
↓
Uvicorn
↓
Docker Container
```

## Production Stack

```txt
NGINX Frontend
↓
FastAPI Backend
↓
PostgreSQL
```

---

# 🔄 CI/CD Workflow

---

# 🧪 CI Pipeline

Each repository has its own GitLab CI pipeline:

## Frontend Pipeline

* Build Docker image
* Push image to DockerHub
* Trigger deployment

## Backend Pipeline

* Build Docker image
* Push image to DockerHub
* Trigger deployment

## CD Repository

* Prepare Ansible inventory
* SSH deployment
* Docker image update
* Selective service restart

---

# 🛠️ Infrastructure Provisioning

Infrastructure is provisioned using Terraform on AWS.

## Provisioned Resources

* EC2 Instance
* Security Group
* EBS Volume
* SSH Access
* Networking

---

# 📦 Docker Compose Deployment

Services are orchestrated using Docker Compose:

```yaml
services:
  frontend:
  backend:
  postgres:
```

Selective deployment strategy:

```bash
docker compose up -d frontend
docker compose up -d backend
```

This avoids unnecessary PostgreSQL restarts and preserves database persistence.

---

# 🔐 Security

## Environment Variables

* Backend `.env`
* Frontend `.env.production`

## Secrets Management

* GitLab CI Variables
* SSH Private Keys
* DockerHub Credentials

## Authentication

* JWT-based authentication
* Protected routes
* Password hashing

---

# 🌍 Production Deployment

## Deployment Flow

```txt
Developer Push
↓
GitLab CI
↓
Docker Build
↓
DockerHub Push
↓
Ansible Deployment
↓
AWS EC2 Update
```

---

# 📸 Screenshots To Add

Tu dois absolument ajouter ces captures dans le README GitHub.

---

# 1️⃣ Application UI

## Homepage / Dashboard

Capture:

* login/register
* dashboard
* tasks CRUD

Nom conseillé :

```txt
/docs/screenshots/dashboard.png
```

---

# 2️⃣ Docker Containers Running

Commande :

```bash
docker ps
```

Capture montrant :

* frontend
* backend
* postgres

---

# 3️⃣ Docker Compose

Commande :

```bash
docker compose ps
```

---

# 4️⃣ GitLab CI Pipelines

Très important.

Captures :

* frontend pipeline success
* backend pipeline success
* deployment pipeline success

---

# 5️⃣ AWS EC2 Instance

Capture AWS montrant :

* EC2 running
* public IP
* instance type

---

# 6️⃣ Terraform Apply

Commande :

```bash
terraform apply
```

Capture :

* successful provisioning

---

# 7️⃣ Ansible Deployment

Commande :

```bash
ansible-playbook ...
```

Capture :

* PLAY RECAP success

---

# 8️⃣ DockerHub Images

Capture :

* frontend image
* backend image

---

# 9️⃣ Browser Network/API

Capture DevTools :

* successful API calls
* `/api/auth/login`
* `/api/tasks`

---

# 🔟 Swagger API Docs

Très important pour FastAPI.

Capture :

```txt
http://PUBLIC_IP:8000/docs
```

---

# 📸 README Screenshot Section Example

```md
# 📸 Screenshots

## Application Dashboard

![Dashboard](docs/screenshots/dashboard.png)

---

## Docker Containers

![Docker](docs/screenshots/docker-ps.png)

---

## GitLab CI Pipeline

![Pipeline](docs/screenshots/gitlab-pipeline.png)

---

## AWS EC2

![EC2](docs/screenshots/ec2-instance.png)

---

## Swagger API

![Swagger](docs/screenshots/swagger.png)
```

---

# 🚀 Deployment Commands

## Terraform

```bash
terraform init
terraform plan
terraform apply
```

## Docker Compose

```bash
docker compose up -d
```

## Ansible Deployment

```bash
ansible-playbook playbooks/deploy-frontend.yml
```

---

# 📈 What This Project Demonstrates

## DevOps Skills

* CI/CD pipelines
* Infrastructure as Code
* Configuration management
* Container orchestration
* Production deployments

## Backend Skills

* FastAPI APIs
* Authentication
* Database management
* ORM usage

## Frontend Skills

* React architecture
* State management
* API integration
* Production builds

---

# 🎯 Future Improvements

* Kubernetes deployment
* HTTPS with Let's Encrypt
* Load Balancer
* Monitoring with Prometheus/Grafana
* GitOps workflow
* AWS RDS
* ECS/EKS migration

---

# 👨‍💻 Author

Developed by Antsa Fiderana

DevOps & Fullstack Engineer Project

---

# ⭐ Final Result

This project represents a complete DevOps lifecycle from:

* development
* containerization
* CI/CD
* infrastructure provisioning
* automated deployment
* cloud hosting
* production operations

using modern industry tools and best practices.
