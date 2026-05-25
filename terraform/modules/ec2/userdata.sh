#!/bin/bash

dnf update -y
# INSTALL REQUIRED PACKAGES
dnf install -y \
docker \
git \
curl \
unzip \
htop \
net-tools
# ENABLE DOCKER
systemctl enable docker
systemctl start docker
# ADD EC2 USER TO DOCKER GROUP
usermod -aG docker ec2-user
# INSTALL DOCKER COMPOSE
mkdir -p /usr/local/lib/docker/cli-plugins/

curl -SL \
https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
-o /usr/local/lib/docker/cli-plugins/docker-compose

chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
# CREATE APPLICATION DIRECTORY
mkdir -p /home/ec2-user/app

chown -R ec2-user:ec2-user /home/ec2-user/app
# CLEAN PACKAGE CACHE
dnf clean all