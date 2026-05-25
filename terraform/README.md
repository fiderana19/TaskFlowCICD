# 🚀 TaskFlow Infrastructure

> Infrastructure provisioning repository of the TaskFlow Fullstack DevOps ecosystem.

This project demonstrates Infrastructure as Code (IaC) using Terraform to provision a production-ready AWS EC2 environment for Dockerized applications.

---

# 📌 Overview

TaskFlow Infrastructure provisions the cloud environment required to deploy the TaskFlow application stack.

The infrastructure is fully automated using Terraform and deployed on AWS.

It provides:

- AWS EC2 provisioning
- Security Group configuration
- EBS volume management
- SSH access configuration
- Production-ready Linux server
- Docker deployment host

The server is designed to host:
- frontend container
- backend container
- PostgreSQL database
- Docker Compose stack

---

# ⚙️ Tech Stack

* Terraform
* AWS EC2
* AWS Security Groups
* AWS EBS
* Linux
* Docker
* Docker Compose

---

# ✨ Features

## Infrastructure as Code

* Modular Terraform architecture
* Reusable modules
* Infrastructure automation
* Scalable structure

## AWS Provisioning

* EC2 instance creation
* Security Group configuration
* EBS volume provisioning
* SSH access management

## Production Environment

* Docker-ready server
* Public internet access
* Persistent storage
* Secure networking

---

# ☁️ AWS Resources

The infrastructure provisions:

## EC2 Instance

* Instance Type: `t3.micro`
* AMI: Ubuntu Server
* Public IP enabled
* SSH access enabled

## Security Group

Allowed ports:
- 22 → SSH
- 80 → Frontend
- 8000 → Backend API

## EBS Volume

* Persistent storage
* 8GB volume
* Free tier compatible

---

# 🧱 Terraform Modules

## EC2 Module

Responsible for:
- EC2 creation
- AMI selection
- Instance configuration
- SSH key usage

---

## Security Group Module

Responsible for:
- inbound traffic rules
- outbound traffic rules
- port exposure

---

## EBS Module

Responsible for:
- storage provisioning
- persistent volume creation

---

# 📸 Results

## GitLab Pipeline

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/terraform.png?raw=true" alt="Terraform Apply" width="800"/>
</p>

---

# 👨‍💻 Author

Developed by Antsa Fiderana

Infrastructure provisioning repository of the TaskFlow Fullstack DevOps Project.