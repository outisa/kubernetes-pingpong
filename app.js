const express = require('express')
const app = express()

const {getPongs, insertIntoTable, createTable, updateTable} = require('./queries')

createTable()

app.get('/pingpong', (request, response) =>  {
  let counter = 0
  let rows = getPongs()
  
  if (rows) {
    console.log(rows)
    counter = rows[0].pongs
  } else {
    insertIntoTable(counter)
  }

  response.json({counts: counter})
  counter = counter + 1
  console.log(counter)
  
  if (rows) {
    console.log(rows)
    const id = rows[0].id
    updateTable(id, counter)
  } else {
    rows = getPongs()
    console.log(rows)
    const id = rows[0].id
    updateTable(id, counter)
  }
})

module.exports = app