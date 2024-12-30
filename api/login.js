import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db();
      const users = db.collection('users');
      
      const { email, password } = req.body;

      // Assuming you have a function for verifying credentials
      const user = await users.findOne({ email, password });

      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }

      client.close();
    } catch (error) {
      console.error('MongoDB error:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
