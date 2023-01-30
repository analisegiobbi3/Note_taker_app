const express = require('express');
const path = require('path')
const api = require('./routes/index.js')

const PORT = 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)


app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// get the route for the notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))

});

// any wild card routes will take you to the home page
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


// Solution attempt from Tutor help 

//makse sure you are on the notes page
// app.use('/api', notes);
// //makes sure you see the home page
// app.use('/', html);


//listen to port and start server
app.listen(PORT, () =>{
    console.log(`your server is running under port ${PORT}`)
})

