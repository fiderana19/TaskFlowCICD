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

# 🏗️ Project Modules

## 🚀 Application Services
- 📦 [Frontend](./taskflowui)
- ⚙️ [Backend](./taskflowbackend)

## ☁️ Infrastructure & DevOps
- 🐳 [CD](./taskflowcd)
- 📊 [Monitoring & Observability](./monitoring)
- 🏗️ [Infrastructure Provisioning](./terraform)

---

# 🏗️ Global Architecture

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/archi.jpg?raw=true" alt="Architecture" width="800"/>
</p>

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

# 📊 Monitoring & Observability Setup

The monitoring stack is built using AWS-native services to simulate a production-grade observability environment.

# 🎯 Objectives

The monitoring system was implemented to:

* Monitor infrastructure health
* Detect abnormal resource usage
* Trigger automated alerts
* Improve infrastructure observability
* Simulate production incident response

# ☁️ Monitoring Stack

## AWS Services Used

* Amazon CloudWatch
* Amazon CloudWatch Agent
* Amazon SNS
* EC2 Metrics
* CloudWatch Dashboards
* CloudWatch Alarms

---

# 📸 Results

## Application Dashboard

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/app.png?raw=true" alt="Application" width="800"/>
</p>

---

## GitLab CI Pipeline
* UI Pipeline
<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/ui.png?raw=true" alt="Ui pipeline" width="800"/>
</p>

* Backend Pipeline
<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/backend.png?raw=true" alt="Backend pipeline" width="800"/>
</p>

* CD Pipeline
<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/cd.png?raw=true" alt="CD pipeline" width="800"/>
</p>

---

## AWS EC2

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/terraform.png?raw=true" alt="Provision" width="800"/>
</p>

---

## Swagger API

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/swagger.png?raw=true" alt="Swagger" width="800"/>
</p>

---

## CloudWatch Dashboard

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/cloudwatch-dashboard.png?raw=true" alt="Dashboard" width="800"/>
</p>

---

# 🎯 Future Improvements

* Kubernetes deployment
* HTTPS with Let's Encrypt
* Load Balancer
* GitOps workflow
* AWS RDS
* ECS/EKS migration

---

# 👨‍💻 Author

Developed by Antsa Fiderana

DevOps & Fullstack Engineer Project