# NHS Patient Apps Infrastructure

This repository contains the infrastructure code and configuration for deploying and managing the NHS Patient Apps. The setup is optimised for scalability, reliability, and secure handling of medical data using AWS services.

## Table of Contents
- [Overview](#overview)
- [Infrastructure Architecture](#infrastructure-architecture)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Setup and Deployment](#setup-and-deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The NHS Patient Apps infrastructure is designed to support secure and efficient application services. It leverages AWS components for hosting, monitoring, and scaling the backend services while ensuring high availability and robust data security.

## Infrastructure Architecture

The architecture follows a **multi-tier design** and is implemented with a focus on modularity and automation. Below is a summary of the key components:

1. **Compute Layer**:
   - **AWS EC2**: Hosts the application backend and supporting services.
   - **AWS Lambda**: For serverless functions triggered by specific events.

2. **Database Layer**:
   - **Amazon RDS**: Manages relational database requirements with automatic backups.
   - **Amazon S3**: Used for storing medical data and other static resources.

3. **Networking Layer**:
   - **VPC (Virtual Private Cloud)**: Segregates public and private resources.
   - **Elastic Load Balancer**: Distributes traffic across multiple EC2 instances.
   - **AWS Route 53**: Handles DNS routing for domain management.

4. **Monitoring and Logging**:
   - **CloudWatch**: Tracks metrics and logs for performance monitoring.
   - **Prometheus & Grafana**: Provides custom dashboards for real-time analytics.

5. **Security**:
   - **AWS IAM**: Implements least privilege policies for resource access.
   - **AWS KMS**: Encrypts sensitive data at rest.
   - **AWS WAF**: Protects against common web exploits.

## Technology Stack

- **Terraform**: Used for infrastructure as code (IaC) to automate deployments.
- **AWS**: Primary cloud provider for hosting and managing infrastructure.
- **Docker**: Containerisation for microservices.
- **Node.js**: Backend runtime for application logic.
- **TypeScript**: Language used in the backend for type safety.

## Key Features

- **Auto-scaling**: Dynamically adjusts compute resources based on demand.
- **High Availability**: Uses multi-AZ deployments to minimise downtime.
- **Data Security**: Implements encryption and secure storage for sensitive information.
- **Monitoring**: Real-time metrics and alerts for system health and performance.
- **Cost Optimisation**: Efficient use of resources with AWS billing insights.

## Setup and Deployment

### Prerequisites
- **AWS CLI** installed and configured with the required permissions.
- **Terraform** installed locally.
- **Docker** installed for local development.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/ad4johnson/nhspatient_apps.git
   cd nhspatient_apps

Initialise Terraform:

terraform init

Validate and apply the Terraform configurations:

terraform validate
terraform apply

Deploy the Docker containers (if applicable):

docker-compose up --build

Monitor the deployment using CloudWatch and Grafana dashboards.

**Contributing**

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with a clear description of your changes.

    Fork the repository.
    Create a new branch:

git checkout -b feature/your-feature-name

Commit your changes:

git commit -m "Add your feature description"

Push to the branch:

    git push origin feature/your-feature-name

    Open a pull request.

**License**

This project is licensed under the MIT License.
