const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const {getPongs, insertIntoTable, createTable, updateTable} = require('./queries')
const directory = path.join('/', 'app', 'pongs')
const pathToFile = path.join(directory, 'pongs.txt')

createTable()

app.get('/pingpong', (request, response) =>  {
  let counter = 0
  const rows = getPongs()
  
  if (rows) {
    console.log(rows)
    counter = rows[0].pongs
  } else {
    insertIntoTable(0)
  }

  response.json({counts: counter})
  counter = counter + 1
  const id = rows[0].id
  updateTable(counter, id)
})

module.exports = app