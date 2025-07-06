
# 💰 Personal Finance Tracker

A full-stack web application that allows users to track income and expenses with a beautiful and responsive user interface. It provides real-time balance updates, expense control, and integrates monitoring dashboards using **Grafana** and **Graphite**.

This project demonstrates a complete DevOps pipeline including:
- React.js frontend
- Spring Boot backend (Java + Maven)
- Dockerized deployment
- Jenkins CI/CD
- Ansible for container orchestration
- Monitoring with Grafana and Graphite

---

## 🚀 Features

- Add, view, and clear transactions (income/expense)
- Live balance, total income, and total expense calculation
- Responsive UI using **React + TailwindCSS**
- Backend validations to block overspending
- Integrated monitoring (metrics sent via StatsD to Graphite and visualized in Grafana)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TailwindCSS


### Backend
- Java 17
- Spring Boot
- Maven
- StatsD for metrics

### DevOps
- Docker & Docker Compose
- Jenkins
- Ansible
- Grafana & Graphite

---

## 📦 Folder Structure

```
finance-tracker/
├── frontend/               # React frontend app
├── src/                    # Spring Boot backend
├── ansible-deploy/        # Ansible playbook & inventory
├── docker-compose.yml     # Compose file to run frontend, backend, Grafana, Graphite
├── Jenkinsfile            # CI/CD pipeline definition
├── Dockerfile             # Backend Dockerfile
└── README.md
```

---

## ✅ Prerequisites

Ensure you have the following installed:

- Docker & Docker Compose
- Git
- Node.js (for local React dev)
- Java 17 & Maven (if building backend locally)
- Jenkins (if using CI/CD pipeline)
- Ansible (for remote orchestration)

---

## 🧩 How to Use the App 

### 🔄 Option 1: One-Command Deployment via Ansible

> This will spin up the **frontend**, **backend**, and **monitoring dashboards**.

1. Clone the repository:

```bash
git clone https://github.com/Cod-E-Tron701/Finance-Tracker.git
cd Finance-Tracker/ansible-deploy
```

2. Run the Ansible playbook:

```bash
ansible-playbook -i inventory/hosts.ini playbooks/deploy.yml --ask-become-pass
```

3. Open the frontend:

```
http://localhost:3000
```
4. Access the Backend:

```
http://localhost:9191/transactions
```

5. Visit monitoring dashboards:
- **Grafana**: http://localhost:3001 (default user/pass: admin/admin)
- **Graphite**: http://localhost:8081

---

### 🔄 Option 2: Using Docker Compose (local)

```bash
git clone https://github.com/Cod-E-Tron701/Finance-Tracker.git
cd Finance-Tracker
docker-compose up --build -d
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:9191/transactions  
- Grafana: http://localhost:3001  
- Graphite: http://localhost:8081 

---

## 🧪 Run Tests (Backend)

```bash
cd Finance-Tracker
mvn test
```

---


## 📈 Monitoring Dashboard Setup

1. Grafana is pre-configured to pull from Graphite.
2. A default dashboard displays `packets_received` from StatsD.
3. You can import more dashboards in Grafana UI.

---

## 👥 Contributor

- **Jerin Cherian**

---

## 📝 License

MIT License – use, modify, and distribute freely.
