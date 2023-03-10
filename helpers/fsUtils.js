//taken from lesson 22 -> Stu_Modular-Routing
//using this file to help read, write, and append to my notes files
const fs = require('fs')
const util = require('util')

const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const writeToFile = (destination, content) => 
    fs.writeFile(destination, JSON.stringify(content, null, 4), err =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }else{
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend }


