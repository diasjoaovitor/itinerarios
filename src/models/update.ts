import { ResultSetHeader } from 'mysql2'
import { database } from '@/infra/database'
import { TUpdate } from '@/types'

export const updateInDb = async (table: string, data: TUpdate<Object>) => {
  const [result] = await database.update(table, data)
  const { affectedRows } = result as ResultSetHeader
  return { affectedRows }
}
