import { TDelete } from '@/types'
import { query } from './query'

export const deleteByIds = async ({ table, ids }: TDelete) =>
  await query(`delete from ${table} where id in (${ids.join(', ')});`)
