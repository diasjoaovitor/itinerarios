import { database } from '@/infra/database'

export const getFromDb = async (table: string) => {
  const [result] = await database.select(table)
  return result
}

export const getEmployeesItinerariesFromDb = async () => {
  const sql = `
    select * from
      employees e
      join roles r
      join workingHours w
      join breakTimes b
      join itineraries i
      on e.roleId = r.roleId
      and i.employeeId = e.employeeId
      and i.workingHourId = w.workingHourId
      and i.breakTimeId = b.breakTimeId
      order by
        startOfTheWorkingDay,
        startOfLunch,
        endOfLunch,
        endOfTheWorkingDay,
        start,
        end,
        employeeName;
  `
  const [result] = await database.query(sql)
  return result
}
