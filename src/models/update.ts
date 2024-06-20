import { ResultSetHeader } from 'mysql2'
import { database } from '@/infra/database'
import { TDBUpdate } from '@/types'

export const updateInDb = async (table: string, data: TDBUpdate<Object>) => {
  const [result] = await database.update(table, data)
  const { affectedRows } = result as ResultSetHeader
  return { affectedRows }
}
