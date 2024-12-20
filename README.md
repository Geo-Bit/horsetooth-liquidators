# Horsetooth Liquidators - Vulnerable Web Application

<p align="center">
  <img src="public/logo.png" alt="Horsetooth Liquidators Logo" width="200"/>
</p>

## About

Horsetooth Liquidators is a deliberately vulnerable web application designed for the NoCo Hackers Holiday CTF Event 2024. This fictional ecommerce platform simulates a local Fort Collins business that specializes in liquidating various goods and merchandise.

Built with Vue 3 + Vite on the frontend and Node.js + Express on the backend, this application serves as a practical CTF lab and includes a number of vulnerabilities to exploit.

## 🎯 Purpose

This project provides hands-on experience with common web vulnerabilities in a safe, controlled environment allowing players to capture and submit flags. It's designed to help security enthusiasts, penetration testers, and developers understand:
- Common web application vulnerabilities
- Secure coding practices
- Web application security testing
- Real-world exploitation scenarios

## 🛠 Tech Stack

- **Frontend**: Vue 3, Vite, Vuex
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Deployment**: Google Cloud Run, Cloud SQL
- **Container**: Docker

## 🚀 Getting Started

### Development (local) Deployment
The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Production Deployment
Once the required GCP infrastructure is configured and deployed, the application can be deployed with the following commands:

Backend:
```
gcloud builds submit --config cloudbuild.backend.yaml \
  --substitutions=_INSTANCE_CONNECTION_NAME=<GCP_INSTANCE_CONNECTION_NAME>,\
_DB_USER=<DB_USER_NAME>,\
_DB_PASSWORD=<DB_PASSWORD>,\
_DB_NAME=<DB_NAME>,\
_FRONTEND_URL=<GCP_FRONTEND_URL>,\
_JWT_SECRET="$(openssl rand -base64 32)"
```

Frontend:
```
gcloud builds submit --config cloudbuild.frontend.yaml  
```


## 🎯 CTF Challenged

This application contains the following challenges and hidden flags as part of a Capture The Flag (CTF) event. 

1. Backup Protocol (25pts) - CWE-312
2. Admin Access Requires (75pts) - CWE-347
3. Inventory Overflow (50pts) - CWE-20
4. Rookie Mistake (25pts) - CWE-312
5. Order Up! (50pts) - CWE-639
6. Confused Fox (25pts) - CWE-74
7. Late Night Easter Egg (25pts) - CWE-312
8. Support Ticket Snooping (100pts) - CWE-79

See [CHALLENGES.md](CHALLENGES.md) for full details.

## ⚠️ Security Notice

This is a deliberately vulnerable application designed for educational purposes. DO NOT:
- Deploy this application in a production environment
- Use any of the code in production applications
- Store sensitive/real data in this application

## 🤝 Contributing

This project is maintained by the NoCo Hackers community. If you'd like to contribute or report issues, please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

Special thanks to the NoCo Hackers community and the opportunity to build this vulnerable web app for the 2024 Holiday CTF Event.