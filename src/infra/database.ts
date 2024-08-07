import mysql, { ConnectionOptions } from 'mysql2/promise'
import bluebird from 'bluebird'

const config: ConnectionOptions = {
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  multipleStatements: true,
  Promise: bluebird
}

const getConnection = () => {
  const connection = mysql.createPool(config)
  return connection
}

export const query = async (query: string, noCheck?: boolean) => {
  let connection
  try {
    connection = getConnection()
    const result = !noCheck
      ? await connection.execute(query)
      : await connection.query(query)
    return result
  } catch (error) {
    throw error
  } finally {
    await connection?.end()
  }
}
