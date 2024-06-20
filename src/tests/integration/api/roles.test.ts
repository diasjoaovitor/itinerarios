import { XiorError } from 'xior'
import { api } from '@/services'
import { prepareTestsEnvironment } from '@/tests/orchestrator'
import {
  mockedDatabaseError,
  mockedEmployees,
  mockedRoles
} from '@/tests/mocks'
import { TDBDelete, TDBRole, TDBUpdate } from '@/types'
import { getTimestamp, localToUTC } from '@/utils'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/roles', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/roles')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('should add roles correctly', async () => {
    const { status, data } = await api.post('/roles', mockedRoles)

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([1, 2, 3, 4])

    const { data: result } = await api.get('/roles')
    const role = (result as TDBRole[])[0]

    expect(role).toEqual({
      ...mockedRoles[0],
      id: 1,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should update roles correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const roles: TDBUpdate<TDBRole> = {
      columns: {
        name: 'Updated Role',
        updatedAt
      },
      ids: [2]
    }

    const { status, data } = await api.patch('/roles', roles)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/roles')
    const role = (result as TDBRole[])[1]

    expect(role.createdAt).not.toBe(updatedAt)
    expect(role).toEqual({
      ...mockedRoles[1],
      id: 2,
      name: 'Updated Role',
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(updatedAt)
    })
  })

  test('Role deletion should fail due to a foreign key error when an employee is assigning to that role', async () => {
    await api.post('/employees', mockedEmployees)

    await api
      .delete('/roles', {
        data: {
          ids: [1],
          table: 'roles'
        } as TDBDelete
      })
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(
          mockedDatabaseError.id_is_already_referenced_in_another_table
        )
      })
  })

  test('should delete roles correctly', async () => {
    const { status, data } = await api.delete('/roles', {
      data: {
        ids: [4],
        table: 'roles'
      } as TDBDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/roles')

    expect(result).toHaveLength(mockedRoles.length - 1)
  })
})
