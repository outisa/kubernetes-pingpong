const express = require('express')
const app = express()

let counter = 0;
app.get('/pingpong', (request, response) =>  {
  response.send(`pong ${counter}`)
  counter = counter + 1
})

module.exports = app