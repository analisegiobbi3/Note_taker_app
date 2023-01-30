const notesRouter = require('express').Router()
const store = require('../db/store');


//get route for all notes page contents
notesRouter.get('/notes', (req, res) => {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => console.error(err))
});

notesRouter.delete('/notes/:id', (req, res) => {
    store
        .deleteNote(req.param.id)
        .then(() => res.json( { ok: true }))
        .catch(err => console.error(err))
})


//route to post notes to the page 
notesRouter.post('/notes', (req,res) =>{
    store
        .addNotes(req.body)
        .then(notes => res.json(notes))
        .catch(err => console.error(err))
})

module.exports = notesRouter;