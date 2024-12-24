import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection string from environment variables
const uri = process.env.MONGODB_URI; // This should be set in your .env file

// MongoDB client setup
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware to allow only the production URL
const allowedOrigins = [
    'https://movies-plateform.vercel.app' // Production URL hosted on Vercel
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests without origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin'), false);
        }
    }
}));

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

// Define the User collection
const database = client.db("NA-Movies"); // Replace with your database name
const usersCollection = database.collection("users"); // Replace with your collection name

// Registration route
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = { username, email, password }; // Store password in plain text
        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords directly (no hashing)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Include the username in the response
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Define a test route for logging users
async function logUsers() {
    try {
        const users = await usersCollection.find({}).toArray();
        console.log("Users in the database:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Start server and connect to MongoDB
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToMongo(); // Connect to MongoDB when server starts
    await logUsers(); // Log users for testing
});
