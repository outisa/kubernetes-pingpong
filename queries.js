const { Pool } = require('pg')
const { response } = require('./app')
const password = process.env.POSTGRES_PASSWORD
const string = 'postgres://postgres:'+password+'@postgres-svc.default:5432/postgres'
const connectionUrl = {connectionString: string }
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

const checkConnection = () => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log('res', res)
    if (err) {
      console.log('err', err)
      response.sendStatus(500).end()
    } else {
      response.sendStatus(200).end()
    }

  }) 
}
const insertIntoTable = async (pongs) => {
  const queryText = `INSERT INTO pingpongs (pongs) VALUES ($1)`
  try {
    await pool.query(queryText, [pongs])
  } catch (error) {
    console.log('error insert into table', error)
  }
}

const getPongs = async () => {
  const queryText = 'SELECT * FROM pingpongs WHERE id = 1'
  try {
    const results = await pool.query(queryText)
    return results.rows
  } catch (error) {
    console.log(error)
  }
}
const updateTable = async (id, pongs) => {
  const queryText = `UPDATE pingpongs SET pongs = $1 WHERE id = $2`
  try {
    await pool.query(queryText, [pongs, id])
  } catch (error) {
    console.log('update row', error)
  }
}
module.exports = {
  createTable,
  insertIntoTable,
  getPongs,
  updateTable,
  checkConnection
}
