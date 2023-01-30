const express = require('express');
const notes = require('./routes/notesRoute.js')
const html = require('./routes/htmlRoutes.js')

const PORT = 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', notes);
app.use('/', html);


//listen to port and start server
app.listen(PORT, () =>{
    console.log(`your server is running under port ${PORT}`)
})

