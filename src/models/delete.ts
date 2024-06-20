import { ResultSetHeader } from 'mysql2'
import { database } from '@/infra/database'
import { TDBDelete } from '@/types'

export const deleteFromDb = async (args: TDBDelete) => {
  const [result] = await database.delete(args)
  const { affectedRows } = result as ResultSetHeader
  return { affectedRows }
}

export const deleteEmployeesFromDb = async (ids: number[]) => {
  const [results] = await database.query(
    `
      set foreign_key_checks = 0;
      delete from employees where id in (${ids.join(', ')});
      delete from itineraries where employeeId in (${ids.join(', ')});
      set foreign_key_checks = 1;
    `,
    true
  )
  const affectedRows = (results as ResultSetHeader[]).reduce(
    (total, { affectedRows }) => (total += affectedRows),
    0
  )
  return { affectedRows }
}
