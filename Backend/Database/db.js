const { MongoClient } = require('mongodb');


const url = 'mongodb+srv://anilkumarkclk:1AY18ec%4010@cluster0.rzxbmn9.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// [{}, {}]

// Connect to the MongoDB server
client.connect()
    .then(async () => {
        console.log('Connected to MongoDB');

        // Specify the database and collection
        const database = client.db('Leetcode');
        const collection = database.collection('Test');

        // Fetch data from the collection
        const query = {}; // You can specify a query to filter results, e.g., { key: 'value' }
        const documents = await collection.find(query).toArray();

        // Print the fetched documents
        console.log('Fetched Documents:', documents);
    })
    .catch(err => console.error('Error connecting to MongoDB:', err))
    .finally(() => {
        // Close the connection when done
        client.close();
    });

export default documents;