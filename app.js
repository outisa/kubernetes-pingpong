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
  console.log(counter)
  
  if (rows) {
    console.log('rows2',rows)
    const id = rows[0].id
    await updateTable(id, counter)
  } else {
    rows = await getPongs()
    console.log('rows3', rows)
    const id = rows[0].id
    await updateTable(id, counter)
  }
})

module.exports = app