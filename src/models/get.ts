import { database } from '@/infra/database'

export const getFromDb = async (table: string) => {
  const [result] = await database.select(table)
  return result
}

export const getJoinedItinerariesFromDb = async () => {
  const sql = `
    select
      e.name,
      e.roleId,
      r.name as roleName,
      w.startOfTheWorkingDay,
      w.startOfLunch,
      w.endOfLunch,
      w.endOfTheWorkingDay,
      CASE
        WHEN b1.start < b2.start THEN b1.start
        ELSE b2.start
      END as startOfMorningBreak,
      CASE
        WHEN b1.start < b2.start THEN b1.end
        ELSE b2.end
      END as endOfMorningBreak,
      CASE
        WHEN b1.start < b2.start THEN b2.start
        ELSE b1.start
      END as startOfAfternoonBreak,
      CASE
        WHEN b1.start < b2.start THEN b2.end
        ELSE b1.end
      END as endOfAfternoonBreak,
      i.workingDayId,
      i.morningBreakId,
      i.afternoonBreakId,
      i.employeeId,
      i.id,
      i.createdAt,
      i.updatedAt
    from
      employees e
      join roles r
      join workingDays w
      join breakTimes b1
      join breakTimes b2
      join itineraries i
      on e.roleId = r.id
      and i.employeeId = e.id
      and i.workingDayId = w.id
      and i.morningBreakId = b1.id
      and i.afternoonBreakId = b2.id
      order by
        startOfTheWorkingDay,
        startOfLunch,
        endOfLunch,
        endOfTheWorkingDay,
        startOfMorningBreak,
        endOfMorningBreak,
        startOfAfternoonBreak,
        endOfAfternoonBreak,
        name;
  `

  const [result] = await database.query(sql)
  return result
}
