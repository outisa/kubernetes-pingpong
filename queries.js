const { Pool } = require('pg')
const password = process.env.POSTGRES_PASSWORD
console.log(password)
const string = 'postgres://postgres:'+password+'@postgres-svc.mainapp-namespace:5432/postgres'
console.log(string)
const connectionUrl = {connectionString: string }
console.log(connectionUrl)
const pool = new Pool(connectionUrl)

pool.on('connect', () => {
  console.log('connected to the db')
})
const createTable = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      pingpongs(
        id SERIAL PRIMARY KEY,
        pongs INTEGER NOT NULL
      )`

  pool.query(queryText, (error, result) => {
    console.log(result)
    if (error) {
      console.log('error create table', error)
      throw error
    }
  })
}

const insertIntoTable = (pongs) => {
  const queryText =
  `INSERT INTO pingpongs (pongs) VALUES ($1)`

  pool.query(queryText, [pongs], (error, results) => {
    if (error) {
      console.log('error insert into table', error)
      throw error
    }
  })
}
const getPongs = () => {
  const queryText = 'SELECT * FROM pingpongs'
  pool.query(queryText, (error, results) => {
    if (error) {
      console.log('error select all', error)
      throw error
    }
    console.log(results)
    console.log(results.rows)
    return results.rows
  })
}
const updateTable = (id, pongs) => {
  const queryText = `UPDATE pingpongs SET pongs = $1 WHERE id = $2`
  pool.query(queryText, [pongs, id], (error, results) => {
    if (error) {
      console.log('update row', error)
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
