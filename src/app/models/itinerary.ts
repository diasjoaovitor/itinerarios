import { TEmployeeModel } from './employee'
import { TWorkShiftModel } from './work-shift'

export type TItineraryModel = {
  id: number
  employeeId: number
  positionId: number
  workShiftId: number
  morningBreakId: number
  afternoonBreakId: number
  createdAt: string
  updatedAt: string
}

export type TJoinedItinerary = TEmployeeModel &
  TWorkShiftModel &
  TItineraryModel & {
    position: string
    startOfTheMorningBreak: string
    endOfTheMorningBreak: string
    startOfTheAfternoonBreak: string
    endOfTheAfternoonBreak: string
  }

type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export type TJoinedTables = Nullable<
  TItineraryModel &
    TEmployeeModel &
    TWorkShiftModel & {
      source: 'employees' | 'positions' | 'workShifts' | 'breaks'
    }
>
