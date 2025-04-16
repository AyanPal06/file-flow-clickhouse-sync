
# Bidirectional ClickHouse & Flat File Ingestion Tool

A web-based tool for bidirectional data transfer between ClickHouse databases and CSV files. This application allows users to import CSV data into ClickHouse tables and export ClickHouse table data to CSV files with an intuitive UI.

## Features

- **CSV File Upload**: Upload CSV files with custom delimiter support
- **ClickHouse Connection**: Connect to ClickHouse instances using JWT token authentication
- **Schema Inspection**: View and select columns from both CSV files and ClickHouse tables
- **Data Preview**: Preview data before ingestion or export
- **Bidirectional Transfer**: Import CSV data to ClickHouse or export ClickHouse data to CSV
- **Status Tracking**: Monitor transfer progress with detailed status updates

## Project Structure

```
project-root/
├── backend/
│   ├── main.py                  # FastAPI application entry point
│   ├── clickhouse_client.py     # ClickHouse connection and query handlers
│   ├── file_handler.py          # File upload and CSV processing
│   ├── schemas.py               # Pydantic models for request/response validation
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Docker configuration for backend
├── frontend/
│   └── (React components)       # Modern React frontend with Tailwind CSS
├── data/
│   └── (used to store uploaded and ingested files)
├── docker-compose.yml           # Docker Compose configuration
└── README.md                    # Project documentation
```

## Running the Application

### Prerequisites

- Docker and Docker Compose
- Node.js and npm (for development)

### Starting the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Docker Compose:

```bash
docker-compose up --build
```

4. Access the application at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health`: Check if the API is running

### File Operations
- `POST /upload-csv`: Upload a CSV file
- `GET /csv-schema`: Get schema (columns) from a CSV file
- `GET /preview-csv`: Preview data from a CSV file (first 100 rows)

### ClickHouse Operations
- `POST /clickhouse-connect`: Test connection to ClickHouse
- `GET /clickhouse-tables`: Get list of tables from ClickHouse
- `GET /clickhouse-schema`: Get schema (columns) from a ClickHouse table
- `POST /ingest-clickhouse-to-file`: Export ClickHouse data to a CSV file
- `POST /ingest-file-to-clickhouse`: Import CSV data to a ClickHouse table

## Usage Guide

### Importing CSV to ClickHouse

1. Select "Flat File" as the source
2. Upload a CSV file and specify the delimiter if needed
3. Click "Upload" to upload the file
4. Click "Fetch Schema" to load column information
5. Select the columns you want to import
6. Enter a destination table name
7. Click "Transfer to ClickHouse" to start the import

### Exporting ClickHouse to CSV

1. Select "ClickHouse" as the source
2. Enter ClickHouse connection details and JWT token
3. Click "Connect" to establish a connection
4. Select a table from the dropdown
5. Select the columns you want to export
6. Enter a destination filename
7. Click "Transfer to File" to start the export

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python, FastAPI
- **Database**: ClickHouse
- **Authentication**: JWT tokens
- **Containerization**: Docker, Docker Compose

## Development

This project was developed with the assistance of AI tools, particularly for the initial structure and codebase organization.
