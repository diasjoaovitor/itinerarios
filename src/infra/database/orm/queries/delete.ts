import { TDelete } from '@/types'
import { query } from './query'

export const deleteByIds = async ({ table, idKey, ids }: TDelete) =>
  await query(`delete from ${table} where ${idKey} in (${ids.join(', ')});`)
