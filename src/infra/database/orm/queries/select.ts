import { query } from './query'

export const select = async (table: string) =>
  await query(`select * from ${table};`)
