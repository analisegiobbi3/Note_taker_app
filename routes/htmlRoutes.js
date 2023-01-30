const app = require('express').Router();
const path = require('path')

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))

});

// any wild card routes will take you to the home page
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app;