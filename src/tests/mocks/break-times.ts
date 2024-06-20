import { TBreakTime } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedBreakTimes: TBreakTime[] = [
  {
    start: '09:00:00',
    end: '09:15:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    start: '09:15:00',
    end: '09:30:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    start: '09:30:00',
    end: '09:45:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    start: '16:00:00',
    end: '16:15:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    start: '16:15:00',
    end: '16:30:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    start: '16:30:00',
    end: '16:45:00',
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
