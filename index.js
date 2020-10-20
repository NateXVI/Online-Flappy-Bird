require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send("<h1>It's working.</h1>");
})

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));