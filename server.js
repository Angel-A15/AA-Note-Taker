const { notes } = require('./db/db')

const express = require('express');
const { fstat } = require('fs');

const app = express();

app.get('/api/')

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})



