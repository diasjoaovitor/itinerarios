import { XiorError } from 'xior'
import { api } from '@/services'
import { prepareTestsEnvironment } from '@/tests/orchestrator'
import {
  mockedBreakTimes,
  mockedDatabaseError,
  mockedEmployees,
  mockedItineraries,
  mockedRoles,
  mockedWorkingDays
} from '@/tests/mocks'
import { TDBDelete, TDBItinerary, TDBRole, TDBUpdate } from '@/types'
import { getTimestamp, localToUTC } from '@/utils'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/itineraries', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/itineraries')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('Adding itineraries should fail due to a foreign key error when there is no data in the "roles" table', async () => {
    await api
      .post('/itineraries', mockedItineraries)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(
          mockedDatabaseError.referenced_table_does_not_have_the_id
        )
      })
  })

  test('should add itineraries correctly', async () => {
    await api.post('/roles', mockedRoles)
    await Promise.all([
      api.post('/employees', mockedEmployees),
      api.post('/working-days', mockedWorkingDays),
      api.post('/break-times', mockedBreakTimes)
    ])

    const { status, data } = await api.post('/itineraries', mockedItineraries)

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([4, 5, 6])

    const { data: result } = await api.get('/itineraries')

    const role = (result as TDBRole[])[0]

    expect(role).toEqual({
      ...mockedItineraries[0],
      id: 4,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should fail when adding duplicate itineraries', async () => {
    const itineraries: TDBUpdate<TDBItinerary> = {
      columns: {
        morningBreakId: 1,
        afternoonBreakId: 1,
        workingDayId: 1,
        employeeId: 1,
        updatedAt: timestamp
      },
      ids: [5, 6]
    }

    await api
      .patch('/itineraries', itineraries)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.duplicated_data)
      })
  })

  test('should update itineraries correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const itineraries: TDBUpdate<TDBItinerary> = {
      columns: {
        employeeId: 4,
        updatedAt
      },
      ids: [5, 6]
    }

    const { status, data } = await api.patch('/itineraries', itineraries)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/itineraries')
    const itinerary = (result as TDBItinerary[])[1]

    expect(itinerary.createdAt).not.toBe(updatedAt)
    expect(itinerary).toEqual({
      ...mockedItineraries[1],
      id: 5,
      employeeId: 4,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(updatedAt)
    } as TDBItinerary)
  })

  test('should delete itineraries correctly', async () => {
    const { status, data } = await api.delete('/itineraries', {
      data: {
        ids: [4, 5, 6],
        table: 'itineraries'
      } as TDBDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 3 })

    const { data: result } = await api.get('/itineraries')

    expect(result).toHaveLength(mockedItineraries.length - 3)
  })
})
