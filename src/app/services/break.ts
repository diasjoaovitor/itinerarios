import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra'
import { TBreakModel } from '@/models'

export class BreakService {
  find = async () => {
    const [result] = await query('SELECT * FROM breaks')
    return result
  }

  findOne = async (id: number) => {
    const [result] = await query('SELECT * FROM breaks WHERE id = ?', [id])
    if (!result) return null
    return (result as TBreakModel[])[0]
  }

  create = async ({
    createdAt,
    end,
    start,
    updatedAt
  }: Omit<TBreakModel, 'id'>) => {
    const [result] = await query(
      'INSERT INTO breaks (createdAt, end, start, updatedAt) VALUES (?, ?, ?, ?)',
      [createdAt, end, start, updatedAt]
    )
    const { insertId } = result as ResultSetHeader
    return insertId
  }

  update = async ({ end, id, start, updatedAt }: TBreakModel) => {
    await query(
      'UPDATE breaks SET end = ?, start = ?, updatedAt = ? WHERE id = ?',
      [end, start, updatedAt, id]
    )
  }

  delete = async (id: number) => {
    await query('DELETE FROM breaks WHERE id = ?', [id])
  }
}
