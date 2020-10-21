require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
.then(() => console.log('Connected to database'))

const app = express();

app.use(cors())

app.get('/', function (req, res) {
    res.send("<h1>It's working.</h1>");
})

app.get('/api/get/leaderboard', function (req, res) {
    client.query('SELECT player_name, player_score FROM scores ORDER BY player_score DESC LIMIT 100')
    .then(results => res.send(results.rows));
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));