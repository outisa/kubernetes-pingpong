const { Pool } = require('pg')
const password = process.env.POSTGRES_PASSWORD
const connectionUrl = {connectionString: 'postgres://postgres:example@postgres-svc.mainapp-namespace:5432/postgres' }
const pool = new Pool(connectionUrl)

pool.on('connect', () => {
  console.log('connected to the db')
})
const createTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      pingpongs(
        id UUID PRIMARY KEY,
        pongs INTEGER NOT NULL
      )`

  pool.query(queryText)
    .then((res) => {
      console.log(res)
      pool.end()
    })
    .catch((err) => {
      console.log(err)
      pool.end()
    })
}

const insertIntoTable = (pongs) => {
  const queryText =
  `INSERT INTO pingpongs (pongs) VALUES ($1)`

pool.query(queryText, [pongs], (error, results) => {
  if (error) {
    throw error
  }})
}
const getPongs = () => {
  const queryText = 'SELECT * FROM pingpongs'
  pool.query(queryText, (error, results) => {
    if (error) {
      throw error
    }
    return results.rows
  })
}
const updateTable = (id, pongs) => {
  const queryText = `UPDATE pingpongs SET pongs = $1 WHERE id = $2`
  pool.query(queryText, [pongs, id], (error, results) => {
    if (error) {
      throw error
    }
  })
}
module.exports = {
  createTable,
  insertIntoTable,
  getPongs,
  updateTable
}
