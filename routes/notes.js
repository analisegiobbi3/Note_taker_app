const notes = require('express').Router()
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json')
const path = require('path');

//get route for all notes page contents
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

//get route for grabbing individual note ids
notes.get('/:note_id', (req, res) => {
    const noteid = req.params.note_id;
    console.log(noteid)
    readFromFile('./db/db.json')

    .then((data) => JSON.parse(data))
    .then((json) => {
        console.log(json)
        const result = json.filter((note) => note.note_id === noteid )
        return result.length > 0 ? res.json(result) : res.json('No note with that id')
    });
});

// route to try and delete notes based on their given id
notes.delete('/:note_id', (req, res) => {
    const noteid = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteid)
        writeToFile('./db/db.json', result)
        res.json(`note ${noteid} had been deleted`)
    });
})

//route to post notes to the page 
notes.post('/', (req,res) =>{
    console.log(`${req.method} request recieved`)

    const { text, title } = req.body

    if (text && title){
        const newNote = {
            text,
            title,
            note_id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');

        const response= {
            status: "You have successfully added a note",
            body: newNote,
        }
        res.json(response)
    }else{
        res.json('error in posting your new note')
    }

})

module.exports = notes;