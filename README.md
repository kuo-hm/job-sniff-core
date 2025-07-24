# job-sniff-core

This repository contains the core backend services of the **job-sniff** platform.

## Overview

**job-sniff-core** is responsible for:

- Providing the public REST API and authentication via the API Gateway  
- Managing users and preferences via the User Service  
- Orchestrating scraping jobs with the Scraper Manager  
- Persisting scraped data using the Result Service  
- Sending notifications with the Notification Service  
- Scheduling recurring scraping tasks via the Job Scheduler  
- Hosting shared libraries for authentication, configuration, and common utilities

## Repo Structure

| Folder               | Description                                      |
|----------------------|------------------------------------------------|
| `api-gateway`        | Node.js + NestJS REST API entrypoint and auth  |
| `user-service`       | Node.js + Prisma user management service        |
| `scraper-manager`    | Go microservice to route scraping jobs           |
| `result-service`     | Go microservice to store scraping results        |
| `notification-service` | Go microservice to handle notifications        |
| `job-scheduler`      | Go microservice for scheduling recurring jobs   |
| `shared-libs`        | Shared utilities and JWT auth libraries          |
| `docker-compose.yml` | Compose file to run core services locally        |

## Getting Started

1. Make sure you have Docker and Docker Compose installed  
2. Run `docker-compose up` to start RabbitMQ, Postgres, and all core services  
3. Follow each service’s README inside their folder for service-specific setup and running instructions

## Development

- Each service lives in its own folder with its own README and dependencies  
- Shared libraries should be used to keep auth and config consistent across services  
- Use the API Gateway as the single entry point for all client requests

## Contributing

Feel free to open issues or PRs for improvements or bug fixes. Please respect the repo structure.

---

Happy coding with **job-sniff-core**! 🚀
