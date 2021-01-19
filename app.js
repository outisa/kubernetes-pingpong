const express = require('express')
const app = express()
const fs = require('fs')

const directory = path.join('/', 'app', 'pongs')
const pathToFile = path.join(directory, 'pongs.txt')
let counter = 0;
fs.writeFile(pathToFile, `Ping / Pongs: ${counter}`, (err) => { 
  if (err) { 
    console.log(err); 
  }  
})
app.get('/pingpong', (request, response) =>  {
  response.send(`pong ${counter}`)
  counter = counter + 1
  fs.writeFile(pathToFile, `Ping / Pongs: ${counter}`, (err) => { 
    if (err) { 
      console.log(err); 
    }  
  })
})

module.exports = app