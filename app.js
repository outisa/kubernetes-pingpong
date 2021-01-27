const express = require('express')
const app = express()

const {getPongs, insertIntoTable, createTable, updateTable} = require('./queries')

createTable()

app.get('/pingpong', async (request, response) =>  {
  let counter = 0
  let rows = await getPongs()
  
  if (rows) {
    console.log('rows1',rows)
    counter = rows[0].pongs
  } else {
    await insertIntoTable(counter)
  }
  response.json({counts: counter})
  counter = counter + 1
  
  const id = 1
  await updateTable(id, counter)
})

module.exports = app