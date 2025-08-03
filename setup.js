#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Cloud ROI Calculator...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Check for .env file in backend
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('\n📝 Creating backend .env template...');
  const envTemplate = `# Azure Cosmos DB Configuration
VITE_COSMOS_ENDPOINT=your_cosmos_db_endpoint
VITE_COSMOS_KEY=your_cosmos_db_key
VITE_COSMOS_DATABASE=your_database_name
VITE_COSMOS_CONTAINER=your_container_name
PORT=3001
`;
  fs.writeFileSync(backendEnvPath, envTemplate);
  console.log('✅ Backend .env template created');
  console.log('⚠️  Please update backend/.env with your Azure Cosmos DB credentials');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update backend/.env with your Azure Cosmos DB credentials');
console.log('2. Run "npm run dev" to start both frontend and backend');
console.log('3. Frontend will be available at http://localhost:3000');
console.log('4. Backend will be available at http://localhost:3001'); 