# Job Scheduler

Schedules and triggers recurring scraping jobs.

## Responsibilities

- Manages cron-like schedules for scraping tasks  
- Triggers scrape jobs by calling Scraper Manager API or publishing to RabbitMQ  
- Handles job timing, retries, and failures  

## Technology

- Go  
- HTTP client / RabbitMQ client  

## Getting Started

### Build and run

```bash
go build ./...
./job-scheduler
