# API Gateway

The **API Gateway** is the public entrypoint for the job-sniff platform. It handles:

- User authentication and JWT validation  
- Exposing REST endpoints for clients (web, mobile)  
- Routing requests to User Service and Scraper Manager  
- Input validation and rate limiting  

## Technology

- Node.js  
- NestJS framework  
- JWT authentication  

## Getting Started

### Install dependencies

```bash
npm install
