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
import { TDBBreakTime, TDBDelete, TDBItinerary, TDBUpdate } from '@/types'
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
        } as TDBBreakTime
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
    expect(data.insertIds).toEqual([8, 9, 10, 11, 12, 13])

    const { data: result } = await api.get('/break-times')
    const breakTime = (result as TDBBreakTime[])[0]

    expect(breakTime).toEqual({
      ...mockedBreakTimes[0],
      id: 8,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should fail when adding duplicate break times', async () => {
    const breakTimes: TDBUpdate<TDBBreakTime> = {
      columns: {
        start: '10:00',
        end: '10:15',
        updatedAt: timestamp
      },
      ids: [8, 9]
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

    const breakTimes: TDBUpdate<TDBBreakTime> = {
      columns: {
        start: '10:00',
        end: '10:15',
        updatedAt
      },
      ids: [9]
    }

    const { status, data } = await api.patch('/break-times', breakTimes)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/break-times')
    const breakTime = (result as TDBBreakTime[])[1]

    expect(breakTime.createdAt).not.toBe(updatedAt)
    expect(breakTime).toEqual({
      ...mockedBreakTimes[1],
      id: 9,
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
      api.post('/working-days', [mockedWorkingDays[0]])
    ])
    await api.post('/itineraries', [
      {
        ...mockedItineraries[0],
        id: 5,
        employeeId: 1,
        workingDayId: 1,
        morningBreakId: 8,
        afternoonBreakId: 11
      } as TDBItinerary
    ])

    await api
      .delete('/break-times', {
        data: {
          ids: [8],
          table: 'breakTimes'
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

  test('should delete break times correctly', async () => {
    const { status, data } = await api.delete('/break-times', {
      data: {
        ids: [9, 10],
        table: 'breakTimes'
      } as TDBDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/break-times')

    expect(result).toHaveLength(mockedBreakTimes.length - 2)
  })
})
