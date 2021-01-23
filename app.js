const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const directory = path.join('/', 'app', 'pongs')
const pathToFile = path.join(directory, 'pongs.txt')

app.get('/pingpong', (request, response) =>  {
  let counter = 0
  if (fs.existsSync(pathToFile)) {
    counter = fs.readFileSync(pathToFile, 'utf-8')
    if (counter) {
      counter = parseInt(counter)
    }
  }
  response.json({counts: counter})
  counter = counter + 1
  fs.writeFile(pathToFile, `${counter}`, (err) => { 
    if (err) { 
      console.log(err); 
    }  
  })
})

module.exports = app