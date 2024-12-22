import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string from environment variables
const uri = process.env.MONGODB_URI;  // This should be set in your .env file

// MongoDB client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Start server and connect to MongoDB
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToMongo(); // Connect to MongoDB when server starts
});
