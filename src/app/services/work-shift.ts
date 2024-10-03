import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra'
import { TWorkShiftModel } from '@/models'

export class WorkShiftService {
  find = async () => {
    const [result] = await query('SELECT * FROM workShifts')
    return result
  }

  findOne = async (id: number) => {
    const [result] = await query('SELECT * FROM workShifts WHERE id = ?', [id])
    if (!result) return null
    return (result as TWorkShiftModel[])[0]
  }

  create = async ({
    createdAt,
    endOfTheBreak,
    endOfTheWorkShift,
    startOfTheBreak,
    startOfTheWorkShift,
    updatedAt
  }: Omit<TWorkShiftModel, 'id'>) => {
    const [result] = await query(
      'INSERT INTO workShifts (createdAt, endOfTheBreak, endOfTheWorkShift, startOfTheBreak, startOfTheWorkShift, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      [
        createdAt,
        endOfTheBreak,
        endOfTheWorkShift,
        startOfTheBreak,
        startOfTheWorkShift,
        updatedAt
      ]
    )
    const { insertId } = result as ResultSetHeader
    return insertId
  }

  update = async ({
    endOfTheBreak,
    endOfTheWorkShift,
    id,
    startOfTheBreak,
    startOfTheWorkShift,
    updatedAt
  }: TWorkShiftModel) => {
    await query(
      'UPDATE workShifts SET endOfTheBreak = ?, endOfTheWorkShift = ?, startOfTheBreak = ?, startOfTheWorkShift = ?, updatedAt = ? WHERE id = ?',
      [
        endOfTheBreak,
        endOfTheWorkShift,
        startOfTheBreak,
        startOfTheWorkShift,
        updatedAt,
        id
      ]
    )
  }

  delete = async (id: number) => {
    await query('DELETE FROM workShifts WHERE id = ?', [id])
  }
}
