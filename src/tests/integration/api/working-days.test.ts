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
import { TDBWorkingDay, TDBUpdate, TDBItinerary, TDBDelete } from '@/types'
import { getTimestamp, localToUTC } from '@/utils'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/working-days', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/working-days')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('should fail to add working days when user enters invalid time format', async () => {
    await api
      .post('/working-days', [
        ...mockedWorkingDays,
        {
          ...mockedWorkingDays[0],
          startOfTheWorkingDay: '7am'
        } as TDBWorkingDay
      ])
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.invalid_format)
      })
  })

  test('should add working days correctly', async () => {
    const { status, data } = await api.post('/working-days', mockedWorkingDays)

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([5, 6, 7])

    const { data: result } = await api.get('/working-days')

    const workingDay = (result as TDBWorkingDay[])[0]

    expect(workingDay).toEqual({
      ...mockedWorkingDays[0],
      id: 5,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should fail when adding duplicate break times', async () => {
    const workingDays: TDBUpdate<TDBWorkingDay> = {
      columns: {
        startOfTheWorkingDay: '07:00',
        startOfLunch: '11:00',
        endOfLunch: '13:00',
        endOfTheWorkingDay: '16:20',
        updatedAt: timestamp
      },
      ids: [5, 6]
    }

    await api
      .patch('/working-days', workingDays)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.duplicated_data)
      })
  })

  test('should update working days correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const workingDays: TDBUpdate<TDBWorkingDay> = {
      columns: {
        startOfTheWorkingDay: '08:40:00',
        endOfTheWorkingDay: '18:00:00',
        updatedAt
      },
      ids: [6]
    }

    const { status, data } = await api.patch('/working-days', workingDays)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/working-days')
    const role = (result as TDBWorkingDay[])[1]

    expect(role.createdAt).not.toBe(updatedAt)
    expect(role).toEqual({
      ...mockedWorkingDays[1],
      id: 6,
      startOfTheWorkingDay: '08:40:00',
      endOfTheWorkingDay: '18:00:00',
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(updatedAt)
    })
  })

  test('should fail when trying to delete a working hour referenced in another table', async () => {
    await api.post('/roles', [mockedRoles[0]])
    await Promise.all([
      api.post('/employees', [mockedEmployees[3]]),
      api.post('/break-times', [mockedBreakTimes[0], mockedBreakTimes[3]])
    ])
    await api.post('/itineraries', [
      {
        ...mockedItineraries[0],
        morningBreakId: 1,
        afternoonBreakId: 2,
        employeeId: 1,
        workingDayId: 5
      } as TDBItinerary
    ])

    await api
      .delete('/working-days', {
        data: {
          ids: [5],
          table: 'workingDays'
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

  test('should delete working days correctly', async () => {
    const { status, data } = await api.delete('/working-days', {
      data: {
        ids: [6, 7],
        table: 'workingDays'
      } as TDBDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/working-days')

    expect(result).toHaveLength(mockedWorkingDays.length - 2)
  })
})
