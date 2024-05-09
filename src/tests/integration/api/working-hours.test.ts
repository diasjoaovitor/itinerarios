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
import { TWorkingHour, TUpdate, TItinerary, TDelete } from '@/types'
import { getTimestamp, localToUTC } from '@/utils'

const timestamp = getTimestamp()

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/working-hours', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/working-hours')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('should fail to add working hours when user enters invalid time format', async () => {
    await api
      .post('/working-hours', [
        ...mockedWorkingHours,
        {
          ...mockedWorkingHours[0],
          startOfTheWorkingDay: '7am'
        } as TWorkingHour
      ])
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.invalid_format)
      })
  })

  test('should add working hours correctly', async () => {
    const { status, data } = await api.post(
      '/working-hours',
      mockedWorkingHours
    )

    expect(status).toBe(200)
    expect(data.insertIds).toEqual([5, 6, 7])

    const { data: result } = await api.get('/working-hours')

    const workingHour = (result as TWorkingHour[])[0]

    expect(workingHour).toEqual({
      ...mockedWorkingHours[0],
      workingHourId: 5,
      createdAt: localToUTC(timestamp),
      updatedAt: localToUTC(timestamp)
    })
  })

  test('should fail when adding duplicate break times', async () => {
    const workingHours: TUpdate<TWorkingHour> = {
      columns: {
        startOfTheWorkingDay: '07:00',
        startOfLunch: '11:00',
        endOfLunch: '13:00',
        endOfTheWorkingDay: '16:20',
        updatedAt: timestamp
      },
      idKey: 'workingHourId',
      ids: [5, 6]
    }

    await api
      .patch('/working-hours', workingHours)
      .then(() => expect(1 + 1).toBe(3))
      .catch((error: XiorError) => {
        const { response } = error

        expect(response!.status).toBe(422)
        expect(response?.data).toEqual(mockedDatabaseError.duplicated_data)
      })
  })

  test('should update working hours correctly', async () => {
    jest.setTimeout(1000)
    await new Promise((r) => setTimeout(r, 1000))

    const updatedAt = getTimestamp()

    const workingHours: TUpdate<TWorkingHour> = {
      columns: {
        startOfTheWorkingDay: '08:40:00',
        endOfTheWorkingDay: '18:00:00',
        updatedAt
      },
      idKey: 'workingHourId',
      ids: [6]
    }

    const { status, data } = await api.patch('/working-hours', workingHours)

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 1 })

    const { data: result } = await api.get('/working-hours')
    const role = (result as TWorkingHour[])[1]

    expect(role.createdAt).not.toBe(updatedAt)
    expect(role).toEqual({
      ...mockedWorkingHours[1],
      workingHourId: 6,
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
      api.post('/break-times', [mockedBreakTimes[0]])
    ])
    await api.post('/itineraries', [
      {
        ...mockedItineraries[0],
        breakTimeId: 1,
        employeeId: 1,
        workingHourId: 5
      } as TItinerary
    ])

    await api
      .delete('/working-hours', {
        data: {
          idKey: 'workingHourId',
          ids: [5],
          table: 'workingHours'
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

  test('should delete working hours correctly', async () => {
    const { status, data } = await api.delete('/working-hours', {
      data: {
        idKey: 'workingHourId',
        ids: [6, 7],
        table: 'workingHours'
      } as TDelete
    })

    expect(status).toBe(200)
    expect(data).toEqual({ affectedRows: 2 })

    const { data: result } = await api.get('/working-hours')

    expect(result).toHaveLength(mockedWorkingHours.length - 2)
  })
})
