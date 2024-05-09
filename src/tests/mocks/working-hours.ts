import { TWorkingHour } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedWorkingHours: TWorkingHour[] = [
  {
    startOfTheWorkingDay: '07:00:00',
    startOfLunch: '11:00:00',
    endOfLunch: '13:00:00',
    endOfTheWorkingDay: '16:20:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    startOfTheWorkingDay: '08:00:00',
    startOfLunch: '12:00:00',
    endOfLunch: '14:00:00',
    endOfTheWorkingDay: '17:20:00',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    startOfTheWorkingDay: '09:40:00',
    startOfLunch: '13:00:00',
    endOfLunch: '15:00:00',
    endOfTheWorkingDay: '19:00:00',
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
