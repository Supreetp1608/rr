import express from 'express';
import cors from 'cors';
import { CosmosClient } from '@azure/cosmos';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Cosmos DB configuration
const endpoint = process.env.VITE_COSMOS_ENDPOINT;
const key = process.env.VITE_COSMOS_KEY;
const databaseName = process.env.VITE_COSMOS_DATABASE;
const containerName = process.env.VITE_COSMOS_CONTAINER;

const client = new CosmosClient({ endpoint, key });

// Routes
app.post('/api/save', async (req, res) => {
  try {
    const { inputs, outputs, timestamp } = req.body;
    
    const db = client.database(databaseName);
    const container = db.container(containerName);

    const id = inputs.companyName.toLowerCase().replace(/\s+/g, "-");

    const record = {
      id,
      inputs,
      outputs,
      timestamp,
      _ts: Date.now(),
    };

    await container.items.upsert(record);
    console.log("✅ Saved to Cosmos DB:", id);
    
    res.json({ success: true, id });
  } catch (error) {
    console.error("❌ Failed to save to Cosmos DB:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/load', async (req, res) => {
  try {
    const db = client.database(databaseName);
    const container = db.container(containerName);

    const query = {
      query: "SELECT * FROM c ORDER BY c._ts DESC OFFSET 0 LIMIT 1",
    };

    const { resources: items } = await container.items.query(query).fetchAll();
    const result = items.length > 0 ? items[0] : null;
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("❌ Failed to load from Cosmos DB:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/delete/:companyName', async (req, res) => {
  try {
    const { companyName } = req.params;
    
    const db = client.database(databaseName);
    const container = db.container(containerName);

    const id = companyName.toLowerCase().replace(/\s+/g, "-");

    await container.item(id, id).delete();
    console.log("🗑️ Deleted from Cosmos DB:", id);
    
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to delete from Cosmos DB:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Cosmos DB: ${databaseName}/${containerName}`);
}); 