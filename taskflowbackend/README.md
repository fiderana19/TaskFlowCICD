# 🚀 TaskFlow Backend

> Backend API of the TaskFlow Fullstack DevOps ecosystem.

This project demonstrates a production-ready backend architecture using FastAPI, PostgreSQL, Docker and GitLab CI/CD.

---

# 📌 Overview

TaskFlow Backend is the API layer of the TaskFlow platform.

It provides:

- JWT authentication
- User management
- Task CRUD operations
- PostgreSQL persistence
- REST API endpoints
- Automated production deployment

The backend is fully containerized and automatically deployed to AWS EC2 using GitLab CI/CD and Docker Compose.

---

# ⚙️ Tech Stack

* FastAPI
* PostgreSQL
* SQLAlchemy
* Alembic
* JWT Authentication
* Uvicorn
* Docker
* GitLab CI/CD

---

# ✨ Features

## Authentication

* User registration
* User login
* JWT token generation
* Password hashing
* Protected endpoints

## Task Management

* Create task
* Update task
* Delete task
* Retrieve user tasks

## Database

* PostgreSQL integration
* SQLAlchemy ORM
* Alembic migrations
* Persistent Docker volumes

## Deployment

* Dockerized backend
* Automated CI/CD pipeline
* Production deployment
* Docker Compose orchestration

---

# 🔐 Authentication System

The backend uses JWT authentication.

## Authentication Flow

```txt
User Login
↓
JWT Token Generation
↓
Protected API Access
↓
Token Validation
```

---

# 🧪 Pipeline Stages

## Build Stage

- Install dependencies
- Build Docker image
- Push image to DockerHub

---

# 📸 Results

## Swagger API Documentation

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/swagger.png?raw=true" alt="Swagger Documentation" width="800"/>
</p>

---

## GitLab Backend Pipeline

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/backend.png?raw=true" alt="Backend Pipeline" width="800"/>
</p>

---

# Back to Main Readme

[← Return to main README](../README.md)