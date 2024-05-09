import { XiorError } from 'xior'
import { api } from '@/services'
import { prepareTestsEnvironment } from '@/tests/orchestrator'
import {
  mockedBreakTimes,
  mockedDatabaseError,
  mockedEmployees,
  mockedItineraries,
  mockedRoles,
  mockedWorkingHours
} from '@/tests/mocks'
import { TBreakTime, TDelete, TItinerary, TRole, TUpdate } from '@/types'
import { getTimestamp, localToUTC } from '@/utils'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/break-times', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/break-times')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('should fail to add break times when user enters invalid time format', async () => {
    await api
      .post('/break-times', [
        ...mockedBreakTimes,
        {
          ...mockedBreakTimes[0],
          start: '10h',
          end: '10h15'
        } as TBreakTime
      ])
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.invalid_format)
      })
  })

  test('should add break times correctly', async () => {
    const { status, data } = await api.post('/break-times', mockedBreakTimes)

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([5, 6, 7])

    const { data: result } = await api.get('/break-times')
    const role = (result as TRole[])[0]

    expect(role).toEqual({
      ...mockedBreakTimes[0],
      breakTimeId: 5,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should fail when adding duplicate break times', async () => {
    const breakTimes: TUpdate<TBreakTime> = {
      columns: {
        start: '10:00',
        end: '10:15',
        updatedAt: timestamp
      },
      idKey: 'breakTimeId',
      ids: [5, 6]
    }

    await api
      .patch('/break-times', breakTimes)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.duplicated_data)
      })
  })

  test('should update break times correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const breakTimes: TUpdate<TBreakTime> = {
      columns: {
        start: '10:00',
        end: '10:15',
        updatedAt
      },
      idKey: 'breakTimeId',
      ids: [6]
    }

    const { status, data } = await api.patch('/break-times', breakTimes)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/break-times')
    const role = (result as TRole[])[1]

    expect(role.createdAt).not.toBe(updatedAt)
    expect(role).toEqual({
      ...mockedBreakTimes[1],
      breakTimeId: 6,
      start: '10:00:00',
      end: '10:15:00',
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(updatedAt)
    })
  })

  test('should fail when trying to delete a break time referenced in another table', async () => {
    await api.post('/roles', [mockedRoles[0]])
    await Promise.all([
      api.post('/employees', [mockedEmployees[3]]),
      api.post('/working-hours', [mockedWorkingHours[0]])
    ])
    await api.post('/itineraries', [
      {
        ...mockedItineraries[0],
        breakTimeId: 5,
        employeeId: 1,
        workingHourId: 1
      } as TItinerary
    ])

    await api
      .delete('/break-times', {
        data: {
          idKey: 'breakTimeId',
          ids: [5],
          table: 'breakTimes'
        } as TDelete
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

  test('should delete break times correctly', async () => {
    const { status, data } = await api.delete('/break-times', {
      data: {
        idKey: 'breakTimeId',
        ids: [6, 7],
        table: 'breakTimes'
      } as TDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/break-times')

    expect(result).toHaveLength(mockedBreakTimes.length - 2)
  })
})
