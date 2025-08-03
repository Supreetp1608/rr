# Cloud ROI Calculator

A comprehensive Cloud ROI Calculator application with separated frontend and backend architecture.

## Project Structure

```
project/
├── frontend/           # React frontend application
│   ├── src/           # Frontend source code
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
├── backend/           # Express.js backend API
│   ├── server.js      # Backend server code
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
├── package.json       # Root package.json for managing both apps
└── README.md          # This file
```

## Features

- **Frontend**: Modern React application with TypeScript, Tailwind CSS, and Vite
- **Backend**: Express.js REST API with Azure Cosmos DB integration
- **Real-time Calculations**: Advanced ROI calculations for cloud migration
- **Data Persistence**: Save and load calculation results
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Azure Cosmos DB account (for production)

### Installation

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Set up environment variables:
   - Create `.env` file in the `backend/` directory
   - Add your Azure Cosmos DB credentials

3. Start both frontend and backend:
   ```bash
   npm run dev
   ```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Development

### Running Frontend Only
```bash
npm run dev:frontend
```

### Running Backend Only
```bash
npm run dev:backend
```

### Building for Production
```bash
npm run build
```

## API Documentation

The backend provides the following endpoints:

- `POST /api/save` - Save calculation data
- `GET /api/load` - Load recent calculation data
- `DELETE /api/delete/:companyName` - Delete calculation data

See `backend/README.md` for detailed API documentation.

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- ESLint for code quality

### Backend
- Express.js
- Azure Cosmos DB
- CORS for cross-origin requests
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the MIT License. 