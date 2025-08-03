# Deployment Guide

This guide covers deploying the Cloud ROI Calculator with separated frontend and backend.

## Prerequisites

- Node.js (v16 or higher)
- Azure Cosmos DB account
- Deployment platform (Vercel, Netlify, Azure, etc.)

## Frontend Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy frontend
   cd frontend
   vercel
   ```

2. **Environment Variables**
   - Set `VITE_API_URL` to your backend URL
   - Example: `https://your-backend.azurewebsites.net`

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify

1. **Deploy from Git**
   - Connect your repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

2. **Environment Variables**
   - Add `VITE_API_URL` in Netlify dashboard

### Static Hosting (GitHub Pages, etc.)

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload `frontend/dist` contents** to your hosting provider

## Backend Deployment

### Azure App Service

1. **Create App Service**
   ```bash
   # Install Azure CLI
   az login
   az group create --name myResourceGroup --location eastus
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1
   az webapp create --name myCloudROIBackend --resource-group myResourceGroup --plan myAppServicePlan --runtime "NODE|18-lts"
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   az webapp deployment source config-zip --resource-group myResourceGroup --name myCloudROIBackend --src deployment.zip
   ```

3. **Environment Variables**
   - Set in Azure App Service Configuration:
     - `VITE_COSMOS_ENDPOINT`
     - `VITE_COSMOS_KEY`
     - `VITE_COSMOS_DATABASE`
     - `VITE_COSMOS_CONTAINER`
     - `PORT`

### Railway

1. **Connect Repository**
   - Connect your GitHub repository
   - Set root directory to `backend`

2. **Environment Variables**
   - Add all required environment variables in Railway dashboard

3. **Deploy**
   - Railway will automatically deploy on push to main branch

### Heroku

1. **Create Heroku App**
   ```bash
   heroku create my-cloud-roi-backend
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend deployment"
   heroku git:remote -a my-cloud-roi-backend
   git push heroku main
   ```

3. **Environment Variables**
   ```bash
   heroku config:set VITE_COSMOS_ENDPOINT=your_endpoint
   heroku config:set VITE_COSMOS_KEY=your_key
   heroku config:set VITE_COSMOS_DATABASE=your_database
   heroku config:set VITE_COSMOS_CONTAINER=your_container
   ```

## Docker Deployment

### Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001

CMD ["npm", "start"]
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - VITE_COSMOS_ENDPOINT=${VITE_COSMOS_ENDPOINT}
      - VITE_COSMOS_KEY=${VITE_COSMOS_KEY}
      - VITE_COSMOS_DATABASE=${VITE_COSMOS_DATABASE}
      - VITE_COSMOS_CONTAINER=${VITE_COSMOS_CONTAINER}
```

## Environment Configuration

### Frontend Environment

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend Environment

Create `backend/.env`:
```env
VITE_COSMOS_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
VITE_COSMOS_KEY=your-cosmos-db-primary-key
VITE_COSMOS_DATABASE=your-database-name
VITE_COSMOS_CONTAINER=your-container-name
PORT=3001
```

## CORS Configuration

Update backend CORS settings for production:

```javascript
// In backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

## SSL/HTTPS

For production, ensure both frontend and backend use HTTPS:

1. **Frontend**: Most hosting providers handle SSL automatically
2. **Backend**: Configure SSL certificates in your hosting platform
3. **API Calls**: Update frontend to use HTTPS URLs

## Monitoring

### Health Check Endpoint

Add to `backend/server.js`:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
```

### Logging

Consider adding structured logging:
```bash
npm install winston
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domain
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database Connection**: Verify Cosmos DB connection string and permissions
4. **Build Errors**: Check Node.js version compatibility

### Debug Commands

```bash
# Check backend logs
heroku logs --tail

# Test API endpoints
curl https://your-backend-url.com/health

# Verify environment variables
heroku config
``` 