require('dotenv').config();

const express = require('express');
const app = express();

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

client.connect()
.then(() => console.log('Connected to database'))

app.get('/', function (req, res) {
    res.send("<h1>It's working.</h1>");
})

app.get('/api/get/leaderboard', function (req, res) {
    client.query('SELECT * FROM scores')
    .then(results => res.send(results));
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));