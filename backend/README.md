# Cloud ROI Calculator - Backend

This is the backend API server for the Cloud ROI Calculator built with Express.js and Azure Cosmos DB.

## Features

- Express.js REST API
- Azure Cosmos DB integration
- CORS enabled for frontend communication
- Environment variable configuration
- Data persistence and retrieval

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Azure Cosmos DB account (for production)

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
VITE_COSMOS_ENDPOINT=your_cosmos_db_endpoint
VITE_COSMOS_KEY=your_cosmos_db_key
VITE_COSMOS_DATABASE=your_database_name
VITE_COSMOS_CONTAINER=your_container_name
PORT=3001
```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The API server will be available at `http://localhost:3001`.

### Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server

## API Endpoints

### POST /api/save
Save calculation data to Cosmos DB.

**Request Body:**
```json
{
  "inputs": { /* calculation inputs */ },
  "outputs": { /* calculation results */ },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "id": "company-name"
}
```

### GET /api/load
Load the most recent calculation data from Cosmos DB.

**Response:**
```json
{
  "success": true,
  "data": { /* saved calculation data */ }
}
```

### DELETE /api/delete/:companyName
Delete calculation data for a specific company.

**Response:**
```json
{
  "success": true
}
```

## Database Schema

The application uses Azure Cosmos DB with the following document structure:

```json
{
  "id": "company-name",
  "inputs": { /* calculation inputs */ },
  "outputs": { /* calculation results */ },
  "timestamp": "2024-01-01T00:00:00Z",
  "_ts": 1704067200000
}
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in case of failures:

- `200` - Success
- `500` - Server error with error message 