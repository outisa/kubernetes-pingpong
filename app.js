const express = require('express')
const app = express()

const {getPongs, insertIntoTable, createTable, updateTable} = require('./queries')

createTable()

app.get('/pingpong', (request, response) =>  {
  let counter = 0
  const rows = getPongs()
  
  if (rows) {
    console.log(rows)
    counter = rows[0].pongs
  } else {
    insertIntoTable(counter)
  }

  response.json({counts: counter})
  counter = counter + 1
  if (!rows) {
    rows = getPongs()
  }
  const id = rows[0].id
  updateTable(counter, id)
})

module.exports = app