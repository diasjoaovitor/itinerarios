import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra'
import { TItineraryModel } from '@/models'

export class ItineraryService {
  find = async () => {
    const [result] = await query(`
      select
        e.name,
        p.name as position,
        w.startOfTheWorkShift,
        w.startOfTheBreak,
        w.endOfTheBreak,
        w.endOfTheWorkShift,
        CASE
          WHEN b1.start < b2.start THEN b1.start
          ELSE b2.start
        END as startOfTheMorningBreak,
        CASE
          WHEN b1.start < b2.start THEN b1.end
          ELSE b2.end
        END as endOfTheMorningBreak,
        CASE
          WHEN b1.start < b2.start THEN b2.start
          ELSE b1.start
        END as startOfTheAfternoonBreak,
        CASE
          WHEN b1.start < b2.start THEN b2.end
          ELSE b1.end
        END as endOfTheAfternoonBreak,
        i.workShiftId,
        i.morningBreakId,
        i.afternoonBreakId,
        i.employeeId,
        i.positionId,
        i.id,
        i.createdAt,
        i.updatedAt
      from
        employees e
        join positions p
        join workShifts w
        join breaks b1
        join breaks b2
        join itineraries i
        on i.positionId = p.id
        and i.employeeId = e.id
        and i.workShiftId = w.id
        and i.morningBreakId = b1.id
        and i.afternoonBreakId = b2.id
        order by
          startOfTheWorkShift,
          startOfTheBreak,
          endOfTheBreak,
          endOfTheWorkShift,
          startOfTheMorningBreak,
          endOfTheMorningBreak,
          startOfTheAfternoonBreak,
          endOfTheAfternoonBreak,
          name;
    `)
    return result
  }

  findOne = async (id: string | number) => {
    const [result] = await query(
      `
      select * from itineraries where id = ?;
      `,
      [id]
    )
    return result
  }

  joinAllTables = async () => {
    const [result] = await query(`
      select
        id,
        name,
        null as startOfTheWorkShift,
        null as startOfTheBreak,
        null as endOfTheBreak,
        null as endOfTheWorkShift,
        null as start,
        null as end,
        createdAt,
        updatedAt,
        'employees' as source
      from employees
      union all
      select
        id,
        name,
        null as startOfTheWorkShift,
        null as startOfTheBreak,
        null as endOfTheBreak,
        null as endOfTheWorkShift,
        null as start,
        null as end,
        createdAt,
        updatedAt,
        'positions' as source
      from positions
      union all
      select
        id,
        null as name,
        startOfTheWorkShift,
        startOfTheBreak,
        endOfTheBreak,
        endOfTheWorkShift,
        null as start,
        null as end,
        createdAt,
        updatedAt,
        'workShifts' as source
      from workShifts
      union all
      select
        id,
        null as name,
        null as startOfTheWorkShift,
        null as startOfTheBreak,
        null as endOfTheBreak,
        null as endOfTheWorkShift,
        start,
        end,
        createdAt,
        updatedAt,
        'breaks' as source
      from breaks
      union all
      select
        id,
        null as name,
        null as startOfTheWorkShift,
        null as startOfTheBreak,
        null as endOfTheBreak,
        null as endOfTheWorkShift,
        null as start,
        null as end,
        createdAt,
        updatedAt,
        'itineraries' as source
      from itineraries;
    `)
    if (!result) return null
    return result
  }

  create = async ({
    afternoonBreakId,
    createdAt,
    employeeId,
    morningBreakId,
    positionId,
    updatedAt,
    workShiftId
  }: Omit<TItineraryModel, 'id'>) => {
    const [result] = await query(
      'INSERT INTO itineraries (afternoonBreakId, createdAt, employeeId, morningBreakId, positionId, updatedAt, workShiftId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        afternoonBreakId,
        createdAt,
        employeeId,
        morningBreakId,
        positionId,
        updatedAt,
        workShiftId
      ]
    )
    const { insertId } = result as ResultSetHeader
    return insertId
  }

  update = async ({
    afternoonBreakId,
    employeeId,
    morningBreakId,
    positionId,
    updatedAt,
    workShiftId,
    id
  }: TItineraryModel) => {
    await query(
      'UPDATE itineraries SET afternoonBreakId = ?, employeeId = ?, morningBreakId = ?, positionId = ?, updatedAt = ?, workShiftId = ? WHERE id = ?',
      [
        afternoonBreakId,
        employeeId,
        morningBreakId,
        positionId,
        updatedAt,
        workShiftId,
        id
      ]
    )
  }

  delete = async (id: number) => {
    await query('DELETE FROM itineraries WHERE id = ?', [id])
  }
}
