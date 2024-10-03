import mysql, { ConnectionOptions } from 'mysql2/promise'
import bluebird from 'bluebird'

const config: ConnectionOptions = {
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  multipleStatements: true,
  namedPlaceholders: true,
  Promise: bluebird
}

export const getConnection = () => {
  const connection = mysql.createPool(config)
  return connection
}
