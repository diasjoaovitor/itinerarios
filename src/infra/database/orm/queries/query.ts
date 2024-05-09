import { getConnection } from '../connection'

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
