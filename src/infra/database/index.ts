import { deleteByIds, insert, select, update } from './orm/queries'
import { query } from './orm/queries/query'

export const database = {
  delete: deleteByIds,
  insert,
  query,
  select,
  update
}
