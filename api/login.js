// api/login.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const client = new MongoClient(process.env.MONGODB_URI);
        try {
            await client.connect();
            const database = client.db('NA-Movies');
            const usersCollection = database.collection('users');

            const user = await usersCollection.findOne({ email });
            if (!user || user.password !== password) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            res.status(200).json({
                message: 'Login successful',
                user: { username: user.username, email: user.email },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
