import { isLastIndex } from '@/utils'
import { query } from './query'

export const insert = async (table: string, data: Object[]) => {
  let sql = `insert into ${table} (`
  let keys: string[] = []
  data.forEach((object) => {
    keys = [...keys, ...Object.keys(object)]
  })
  keys = Array.from(new Set(keys))
  keys.forEach((key, index) => {
    const isLastKey = isLastIndex({ length: keys.length, index })
    sql += key
    sql += !isLastKey ? ', ' : ') values '
  })
  sql +=
    data
      .map((object) => {
        let sql = '('
        keys.forEach((key, index) => {
          const isLastKey = isLastIndex({ length: keys.length, index })
          const value = (object as any)[key]
          sql += typeof value === 'string' ? `'${value}'` : value || null
          sql += !isLastKey ? ', ' : ')'
        })
        return sql
      })
      .join(', ') + ';'
  const result = await query(sql)
  return result
}
