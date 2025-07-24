# Result Service

Stores scraping results into persistent storage.

## Responsibilities

- Consumes scraping results from RabbitMQ queues  
- Validates and transforms data before storing  
- Inserts data into PostgreSQL database  

## Technology

- Go  
- PostgreSQL driver  
- RabbitMQ client  

## Getting Started

### Build and run

```bash
go build ./...
./result-service
