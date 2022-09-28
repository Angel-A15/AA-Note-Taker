//Added packages and links to files

const fs  = require('fs');

//makes working with fs a bit more predictable
const path = require('path');

const express = require('express');

//Route to recieve data from file
const { notes } = require('./data/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//all front-end code can now be accessed without 
//having a specific server endpoint created for it
app.use(express.static(path.join(__dirname, 'public')));

//new note will be push into db(note).json file
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({notes: notesArray }, null, 2)
    );
  
    // return finished code to post route for response
    return note;
}

//Will rite notes into json 
app.post('/api/notes', (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);
  
    res.json(note);
});

//Get Middlewear

app.delete('/api/note/:id', (req, res) => {
    const { id } = req.params;
});

//Route will direct us to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//sets file as home page for the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


//Displays site on specified route
app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`);
});