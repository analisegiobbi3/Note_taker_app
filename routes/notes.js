const notes = require('express').Router()
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//get route for all notes page contents
notes.get('/', (req, res) => {
    console.log(`${req.method} request recieved`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

//get route for grabbing individual note ids
notes.get('/:note_id', (req, res) => {
    const noteid = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
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
});

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
});


















// Solution attempt from Tutor help 



// const notesRouter = require('express').Router()
// const store = require('../db/store');


// //get route for all notes page contents
// notesRouter.get('/notes', (req, res) => {
//     store
//         .getNotes()
//         .then(notes => res.json(notes))
//         .catch(err => console.error(err))
// });

// //route to delete notes from the page
// notesRouter.delete('/notes/:id', (req, res) => {
//     store
//         .deleteNote(req.param.id)
//         .then(() => res.json( { ok: true }))
//         .catch(err => console.error(err))
// })


// //route to post notes to the page 
// notesRouter.post('/notes', (req,res) =>{
//     store
//         .addNotes(req.body)
//         .then(notes => res.json(notes))
//         .catch(err => console.error(err))
// })

// module.exports = notesRouter;