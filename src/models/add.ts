import { ResultSetHeader } from 'mysql2'
import { database } from '@/infra/database'
import { getInsertIds } from '@/utils'

export const addToDb = async (table: string, data: Object[]) => {
  const [result] = await database.insert(table, data)
  const { insertId } = result as ResultSetHeader
  return { insertIds: getInsertIds({ id: insertId, length: data.length }) }
}
