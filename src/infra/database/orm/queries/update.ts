import { isLastIndex } from '@/utils'
import { TUpdate } from '@/types'
import { query } from './query'

export const update = async (
  table: string,
  { columns, ids }: TUpdate<Object>
) => {
  let sql = `update ${table} set `
  const keys = Object.keys(columns)
  keys.forEach((key, index) => {
    const isLastKey = isLastIndex({ length: keys.length, index })
    sql += `${key} = `
    const value = (columns as any)[key]
    sql += typeof value === 'string' ? `'${value}'` : value
    if (!isLastKey) sql += ', '
  })
  sql += ` where id in (${ids.join(', ')});`
  const result = await query(sql)
  return result
}
