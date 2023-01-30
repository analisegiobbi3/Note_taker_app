const express = require('express');
//imports the router for the notes file
const notesRouter = require('./notes');

const app = express();
//initializes the route
app.use('/notes', notesRouter);

module.exports = app;