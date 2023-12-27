const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;

const mongoUrl = 'mongodb+srv://anilkumarkclk:1AY18ec%4010@cluster0.rzxbmn9.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect()
    .then(() => {
        console.log('Connected to MongoDB');

        // Specify the database and collection
        const database = client.db('Leetcode');
        const collection = database.collection('Test');

        // Set up a route to fetch data
        app.get('/api/data', async (req, res) => {
            try {
                // Fetch data from the collection
                const query = {}; // You can specify a query to filter results, e.g., { key: 'value' }
                const data = await collection.find(query).toArray();

                // Send the fetched data as a JSON response
                res.json(data);
                console.log('Fetched Documents:', data);
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Close the MongoDB connection when the Node.js process is terminated
process.on('SIGINT', () => {
    console.log('Closing MongoDB connection');
    client.close();
    process.exit();
});
