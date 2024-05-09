import { TItinerary } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedItineraries: TItinerary[] = [
  {
    employeeId: 1,
    breakTimeId: 2,
    workingHourId: 3,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeId: 2,
    breakTimeId: 3,
    workingHourId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeId: 3,
    breakTimeId: 1,
    workingHourId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
