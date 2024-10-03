import { ResultSetHeader } from 'mysql2'
import { query } from '@/infra'
import { TPositionModel } from '@/models'

export class PositionService {
  find = async () => {
    const [result] = await query('SELECT * FROM positions')
    return result
  }

  findOne = async (id: number) => {
    const [result] = await query('SELECT * FROM positions WHERE id = ?', [id])
    if (!result) return null
    return (result as TPositionModel[])[0]
  }

  create = async ({
    createdAt,
    name,
    updatedAt
  }: Omit<TPositionModel, 'id'>) => {
    const [result] = await query(
      'INSERT INTO positions (name, createdAt, updatedAt) VALUES (?, ?, ?)',
      [name, createdAt, updatedAt]
    )
    const { insertId } = result as ResultSetHeader
    return insertId
  }

  update = async ({ id, name, updatedAt }: TPositionModel) => {
    await query('UPDATE positions SET name = ?, updatedAt = ? WHERE id = ?', [
      name,
      updatedAt,
      id
    ])
  }

  delete = async (id: number) => {
    await query('DELETE FROM positions WHERE id = ?', [id])
  }
}
