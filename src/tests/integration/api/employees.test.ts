import { XiorError } from 'xior'
import { api } from '@/services'
import { prepareTestsEnvironment } from '@/tests/orchestrator'
import { getTimestamp, localToUTC } from '@/utils'
import {
  mockedBreakTimes,
  mockedDatabaseError,
  mockedEmployees,
  mockedItineraries,
  mockedRoles,
  mockedWorkingHours
} from '@/tests/mocks'
import { TEmployee, TUpdate } from '@/types'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/employees', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/employees')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('Adding employee should fail due to a foreign key error when there is no data in the "roles" table', async () => {
    await api
      .post('/employees', mockedEmployees)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(
          mockedDatabaseError.referenced_table_does_not_have_the_id
        )
      })
  })

  test('should add employees correctly', async () => {
    await api.post('/roles', mockedRoles)

    const { status, data } = await api.post('/employees', mockedEmployees)

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([6, 7, 8, 9, 10])

    const { data: result } = await api.get('/employees')

    const employee = (result as TEmployee[])[0]

    expect(employee).toEqual({
      ...mockedEmployees[0],
      employeeId: 6,
      roleId: 1,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should update employees correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const employees: TUpdate<TEmployee> = {
      columns: {
        roleId: 1,
        updatedAt
      },
      idKey: 'employeeId',
      ids: [6, 10]
    }

    const { status, data } = await api.patch('/employees', employees)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/employees')

    const employee = (result as TEmployee[])[0]

    expect(employee.createdAt).not.toBe(updatedAt)
    expect(employee).toEqual({
      ...mockedEmployees[0],
      employeeId: 6,
      roleId: 1,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(updatedAt)
    })
  })

  test('should delete assigned employee correctly', async () => {
    await Promise.all([
      await api.post('/break-times', mockedBreakTimes),
      await api.post('/working-hours', mockedWorkingHours)
    ])
    await api.post(
      '/itineraries',
      mockedItineraries.map((itinerary, index) => ({
        ...itinerary,
        employeeId: 6 + index
      }))
    )

    const { status, data } = await api.delete('/employees', {
      data: [6]
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/employees')

    expect(result).toHaveLength(mockedEmployees.length - 1)
  })
})
