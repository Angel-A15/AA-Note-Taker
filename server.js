const { notes } = require('./db/db')

const express = require('express');
const fs  = require('fs');

const app = express();

app.get('/api/notes', (req, res) => {
    res.json('db');
});

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

api.post('/api/animals', (res, req) => {

});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})



