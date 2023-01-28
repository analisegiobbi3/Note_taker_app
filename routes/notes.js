const notes = require('express').Router()
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

//do I need helper files?

notes.get('/', (req, res) =>{
    console.log(`${req.method} request recieved`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req,res) =>{
    console.log(`${req.method} request recieved`)

    const { text, title } = req.body

    if (text && title){
        const newNote = {
            text,
            title,
            note_id: uuid(),
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