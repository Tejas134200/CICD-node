# 🚀 Node.js Dockerized App with CI/CD Deployment on AWS EC2

## 📌 Overview

This project demonstrates how to containerize a Node.js application using Docker and deploy it on an AWS EC2 instance with an automated CI/CD pipeline using GitHub Actions.

---

## 🧱 Tech Stack

* Node.js
* Docker & Docker Compose
* AWS EC2 (Ubuntu)
* GitHub Actions (CI/CD)

---

## ⚙️ Features

* Containerized Node.js application using Docker
* Multi-service management with Docker Compose
* Automated deployment on every push
* Secure SSH-based deployment using GitHub Actions
* Publicly accessible backend via EC2 public IP

---

## 📂 Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── index.js
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🐳 Docker Setup

### Dockerfile

* Uses lightweight Alpine Linux base image
* Installs dependencies
* Runs Node.js server

### Build & Run Locally

```bash
docker build -t node-app .
docker run -p 8000:8000 node-app
```

---

## 🧩 Docker Compose

### Start services

```bash
docker compose up -d
```

### Stop services

```bash
docker compose down
```

---

## ☁️ AWS EC2 Setup

* Launched Ubuntu EC2 instance
* Installed Docker & Docker Compose
* Opened required ports:

  * 8000 (application)
  * 22 (SSH)
  * 80/443 (optional)

### Access Application

```
http://<EC2-PUBLIC-IP>:8000
```

---

## 🔐 CI/CD Pipeline (GitHub Actions)

### Trigger

* Runs on every push to `main` branch

### Workflow Steps

1. Checkout repository
2. Setup SSH key securely using GitHub Secrets
3. SSH into EC2 instance
4. Pull latest code
5. Restart Docker containers

---

### GitHub Secrets Used

* `EC2_HOST` → EC2 Public IP
* `EC2_USER` → ubuntu
* `EC2_KEY` → Private `.pem` key

---

### Deployment Workflow

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup SSH key
        run: |
          echo "${{ secrets.EC2_KEY }}" | tr -d '\r' > key.pem
          chmod 600 key.pem

      - name: Deploy
        run: |
          ssh -o StrictHostKeyChecking=no -i key.pem ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} << 'EOF'
          
          cd /home/ubuntu/<your-repo-name>
          git pull origin main
          docker compose down
          docker compose up -d --build
          
          EOF
```

---

## 🔍 Debugging Learnings

* Fixed HTTPS vs HTTP confusion (`https://` vs `http://`)
* Learned port mapping in Docker (`-p 8000:8000`)
* Configured AWS Security Groups to allow traffic
* Resolved SSH key issues in GitHub Actions
* Fixed path and permission issues (`/root` vs `/home/ubuntu`)

---

## 🎯 Key Concepts Learned

* Docker Image vs Container
* Dockerfile instructions (`RUN`, `CMD`)
* Docker Compose for multi-container setup
* CI/CD pipeline fundamentals
* GitHub Actions workflows
* SSH automation for deployment
* AWS EC2 networking and security

---

## 🚀 Future Improvements

* Add Nginx reverse proxy
* Enable HTTPS with SSL certificates
* Use Docker Hub for image storage
* Implement zero-downtime deployments
* Add monitoring & logging

---

## 👨‍💻 Author

Tejas Pokalwar

---

## ⭐ Conclusion

This project demonstrates a complete DevOps workflow from development to deployment using modern tools and practices.
