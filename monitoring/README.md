# 📊 Monitoring & Observability Setup

This directory contains the monitoring and observability configuration for the TaskFlow DevOps infrastructure.

The monitoring stack is built using AWS-native services to simulate a production-grade observability environment.

---

# 🎯 Objectives

The monitoring system was implemented to:

* Monitor infrastructure health
* Detect abnormal resource usage
* Trigger automated alerts
* Improve infrastructure observability
* Simulate production incident response

---

# ☁️ Monitoring Stack

## AWS Services Used

* Amazon CloudWatch
* Amazon CloudWatch Agent
* Amazon SNS
* EC2 Metrics
* CloudWatch Dashboards
* CloudWatch Alarms

---

# 🏗️ Architecture Overview

```text
EC2 Instance
     │
     ▼
CloudWatch Agent
     │
     ▼
CloudWatch Metrics
     │
     ├── CloudWatch Dashboard
     │
     └── CloudWatch Alarms
               │
               ▼
          SNS Notifications
               │
               ▼
            Email Alerts
```

---

# 🐧 EC2 Monitoring

## Monitored Resources

### CPU Usage

Metric:

```text
CPUUtilization
```

Purpose:

* Detect high CPU load
* Monitor application usage
* Detect abnormal resource consumption

---

### Memory Usage

Metric:

```text
mem_used_percent
```

Purpose:

* Detect memory saturation
* Prevent OOM situations
* Monitor application memory usage

---

### Disk Usage

Metric:

```text
disk_used_percent
```

Monitored filesystem:

```text
/
```

Purpose:

* Prevent disk saturation
* Monitor Docker storage usage
* Protect production environment stability

---

### Network Monitoring

Metrics:

```text
NetworkIn
NetworkOut
```

Purpose:

* Monitor incoming traffic
* Monitor outgoing traffic
* Detect unusual network activity

---

### EC2 Health Status

Metric:

```text
StatusCheckFailed
```

Purpose:

* Detect EC2 health issues
* Monitor infrastructure availability
* Detect AWS-level failures

---

# ⚙️ CloudWatch Agent Installation

## Environment

* AWS EC2
* Amazon Linux 2023

---

## Installation

```bash
sudo dnf install -y amazon-cloudwatch-agent
```

---

## Configuration File

Path:

```text
/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
```

---

## Agent Startup

```bash
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl restart amazon-cloudwatch-agent
```

---

## Service Verification

```bash
sudo systemctl status amazon-cloudwatch-agent
```

---

# 🔐 IAM Role Configuration

An IAM Role was attached to the EC2 instance to allow secure communication with CloudWatch.

## IAM Policy Used

```text
CloudWatchAgentServerPolicy
```

---

# 🚨 CloudWatch Alarms

## CPU Alarm

### Configuration

| Parameter  | Value          |
| ---------- | -------------- |
| Metric     | CPUUtilization |
| Threshold  | > 70%          |
| Statistic  | Maximum        |
| Period     | 1 minute       |
| Evaluation | 2/2 datapoints |

---

## RAM Alarm

### Configuration

| Parameter | Value            |
| --------- | ---------------- |
| Metric    | mem_used_percent |
| Threshold | > 75%            |
| Statistic | Average          |
| Period    | 1 minute         |

---

## Disk Alarm

### Configuration

| Parameter  | Value             |
| ---------- | ----------------- |
| Metric     | disk_used_percent |
| Filesystem | /                 |
| Threshold  | > 85%             |
| Statistic  | Average           |
| Period     | 1 minute          |

---

# 📩 SNS Email Notifications

Amazon SNS was configured to send automated email notifications when alarms are triggered.

## Notification Workflow

```text
CloudWatch Alarm
       │
       ▼
SNS Topic
       │
       ▼
Email Notification
```

---

# 📈 CloudWatch Dashboard

A centralized dashboard was created for infrastructure observability.

## Dashboard Widgets

* EC2 CPU Usage
* Memory Usage
* Root Disk Usage
* Network Traffic
* EC2 Health Status

---

# 🧪 Incident Simulation & Alarm Testing

## CPU Stress Test

```bash
yes > /dev/null &
yes > /dev/null &
yes > /dev/null &
```

Result:

* CPU usage increased
* CloudWatch alarm triggered
* Email notification received

---

## RAM Stress Test

```bash
stress --vm 1 --vm-bytes 400M --timeout 300
```

Result:

* Memory usage increased
* Alarm triggered successfully

---

## Disk Stress Test

```bash
sudo dd if=/dev/zero of=/filldisk bs=1M count=4000
```

Result:

* Root filesystem usage increased
* Disk alarm triggered
* SNS email notification received

Cleanup:

```bash
sudo rm -f /filldisk
```

---

# 📷 Results

## CloudWatch Dashboard

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/cloudwatch-dashboard.png?raw=true" alt="Dashboard" width="800"/>
</p>

---

## Alarm Validation

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/ram-graph.png?raw=true" alt="RAM" width="800"/>
</p>

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/disk-graph.png?raw=true" alt="Disk" width="800"/>
</p>

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/cpu-graph.png?raw=true" alt="CPU" width="800"/>
</p>

---

## SNS Notifications

<p align="center">
<img src="https://github.com/fiderana19/TaskFlowCICD/blob/main/docs/sns-alert.png?raw=true" alt="SNS Alert" width="800"/>
</p>