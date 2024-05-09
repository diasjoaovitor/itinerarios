import { api } from '@/services'
import { prepareTestsEnvironment } from '@/tests/orchestrator'
import {
  mockedBreakTimes,
  mockedEmployees,
  mockedItineraries,
  mockedRoles,
  mockedWorkingHours
} from '@/tests/mocks'
import { TEmployeeItinerary } from '@/types'

beforeAll(async () => {
  await prepareTestsEnvironment()
})

describe('Route /api/employees-itineraries', () => {
  test('should return empty data', async () => {
    const { status, data } = await api.get('/employees-itineraries')

    expect(status).toBe(200)
    expect(data).toEqual([])
  })

  test('should return data correctly', async () => {
    await api.post('/roles', mockedRoles)
    await Promise.all([
      await api.post('/employees', mockedEmployees),
      await api.post('/break-times', mockedBreakTimes),
      await api.post('/working-hours', mockedWorkingHours)
    ])
    await api.post('/itineraries', mockedItineraries)

    const { status, data } = await api.get('/employees-itineraries')
    const result: TEmployeeItinerary = data[0]
    const { itineraryId, createdAt, updatedAt } = result

    expect(status).toBe(200)
    expect(data).toHaveLength(mockedItineraries.length)
    expect(result).toEqual({
      ...mockedEmployees[1],
      ...mockedRoles[1],
      ...mockedWorkingHours[0],
      ...mockedBreakTimes[2],
      ...mockedItineraries[1],
      itineraryId,
      createdAt,
      updatedAt
    })
  })
})
