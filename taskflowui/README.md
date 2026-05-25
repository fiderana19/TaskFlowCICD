# 🚀 TaskFlow UI

> Frontend application of the TaskFlow Fullstack DevOps ecosystem.

This project demonstrates a production-ready frontend architecture using React, Vite, Docker, NGINX and GitLab CI/CD.

---

# 📌 Overview

TaskFlow UI is the frontend client of the TaskFlow platform.

It communicates with a FastAPI backend through REST APIs and provides:

- User authentication
- Task management
- JWT session handling
- Responsive interface
- Production deployment with Docker & NGINX

The application is fully automated through a CI/CD pipeline using GitLab CI and deployed on AWS EC2.

---

# ⚙️ Tech Stack

* React
* TypeScript
* Vite
* Axios
* React Router

---

# ✨ Features

## Authentication

* Login
* Registration
* JWT authentication
* Protected routes

## Task Management

* Create task
* Update task
* Delete task
* Task listing

## Deployment

* Dockerized frontend
* NGINX reverse proxy
* CI/CD automation
* Production-ready architecture

---

# 🐳 Docker Multi-Stage Build

The frontend uses a multi-stage Docker build.

## Build Flow

```txt
Node.js Build Stage
↓
Vite Production Build
↓
NGINX Production Container
```

---

# 📸 Results

## Login Page

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/app.png?raw=true" alt="Application" width="800"/>
</p>

---

## Dashboard

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/dashboard.png?raw=true" alt="App Dashboard" width="800"/>
</p>

---

## GitLab Pipeline

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/ui.png?raw=true" alt="Ui Pipeline" width="800"/>
</p>

---

# 👨‍💻 Author

Developed by Antsa Fiderana

Frontend application of the TaskFlow Fullstack DevOps Project.