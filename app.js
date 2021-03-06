const express = require('express')
const app = express()

const {getPongs, insertIntoTable, createTable, updateTable, checkConnection} = require('./queries')

createTable()

app.get('/pingpong', async (request, response) =>  {
  let counter = 0
  let row = await getPongs()
  
  if (row[0]) {
    console.log('rows1',row[0])
    counter = row[0].pongs
    console.log(counter)
  } else {
    await insertIntoTable(counter)
  }
  response.json({counts: counter})
  counter = counter + 1
  
  const id = 1
  await updateTable(id, counter)
})

app.get('/pingpong/healthz', async (request, response) => {
  checkConnection(request, response)
})

module.exports = app