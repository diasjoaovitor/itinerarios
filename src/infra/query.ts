import { getConnection } from './connection'

export const query = async (
  query: string,
  values?: any[],
  noCheck?: boolean
) => {
  let connection
  try {
    connection = getConnection()
    const result = !noCheck
      ? await connection.execute(query, values)
      : await connection.query(query, values)
    return result
  } catch (error) {
    throw error
  } finally {
    await connection?.end()
  }
}
