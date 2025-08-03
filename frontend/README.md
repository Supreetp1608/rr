# Cloud ROI Calculator - Frontend

This is the frontend application for the Cloud ROI Calculator built with React, TypeScript, and Vite.

## Features

- Modern React with TypeScript
- Tailwind CSS for styling
- Vite for fast development and building
- ESLint for code quality
- Proxy configuration for API calls to backend

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── charts/         # Chart components
│   ├── inputs/         # Input form components
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## API Integration

The frontend communicates with the backend API through a proxy configuration in `vite.config.ts`. All API calls to `/api/*` are automatically proxied to the backend server running on port 3001. 