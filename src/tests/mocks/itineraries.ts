import { TItinerary } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedItineraries: TItinerary[] = [
  {
    employeeId: 1,
    morningBreakId: 3,
    afternoonBreakId: 6,
    workingDayId: 3,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeId: 2,
    morningBreakId: 1,
    afternoonBreakId: 4,
    workingDayId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeId: 3,
    morningBreakId: 2,
    afternoonBreakId: 5,
    workingDayId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
