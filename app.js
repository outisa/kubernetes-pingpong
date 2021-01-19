const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const directory = path.join('/', 'app', 'pongs')
const pathToFile = path.join(directory, 'pongs.txt')
let counter = fs.readFileSync(pathToFile, 'utf-8')
if (!counter) {
  counter = 0
} else {
  counter = parseInt(counter)
}
app.get('/pingpong', (request, response) =>  {
  response.send(`pong ${counter}`)
  counter = counter + 1
  fs.writeFile(pathToFile, `${counter}`, (err) => { 
    if (err) { 
      console.log(err); 
    }  
  })
})

module.exports = app