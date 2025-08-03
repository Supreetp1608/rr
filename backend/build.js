import fs from 'fs';
import path from 'path';

const distDir = './dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy server.js to dist
fs.copyFileSync('./server.js', './dist/server.js');
console.log('✅ Copied server.js to dist/');

// Copy package.json to dist (without devDependencies)
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const productionPackage = {
  name: packageJson.name,
  version: packageJson.version,
  type: packageJson.type,
  scripts: {
    start: "node server.js"
  },
  dependencies: packageJson.dependencies
};

fs.writeFileSync('./dist/package.json', JSON.stringify(productionPackage, null, 2));
console.log('✅ Copied package.json to dist/');

console.log('🎉 Backend build complete!');
console.log('📁 Dist folder created at: ./dist/');
console.log('🚀 To run production build: cd dist && npm install && npm start'); 