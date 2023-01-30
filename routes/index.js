const express = require('express');
//imports the router for the notes file
const notesRouter = require('./notes');

const app = express();
//initializes the route
app.use('/notes', notesRouter);

module.exports = app;




// Solution attempt from Tutor help 

// const app = require('express').Router();
// const path = require('path')

// //This will reroute to the notes page when the start button is clicked
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/notes.html'))

// });

// // any wild card routes will take you to the home page
// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// })

// module.exports = app;