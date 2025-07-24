# Scraper Manager

Central orchestrator for scraping jobs.

## Responsibilities

- Receives scrape job requests from API Gateway  
- Validates request parameters and user permissions  
- Dispatches scraping jobs asynchronously via RabbitMQ queues  
- Tracks job status and retries failed jobs  

## Technology

- Go  
- RabbitMQ client  

## Getting Started

### Build and run

```bash
go build ./...
./scraper-manager
