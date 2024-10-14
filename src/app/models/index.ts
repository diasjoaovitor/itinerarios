export type TEmployeeModel = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type TPositionModel = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type TWorkShiftModel = {
  id: number
  name: string
  startTime: string
  startLunch: string | null
  endLunch: string | null
  endTime: string
  createdAt: string
  updatedAt: string
}

export type TBreakModel = {
  id: number
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
}

export type TItineraryModel = {
  id: number
  employeeId: number
  positionId: number
  workShiftId: number
  morningBreakId: number | null
  afternoonBreakId: number | null
  createdAt: string
  updatedAt: string
}

export type TJoinItineraryModel = TItineraryModel & {
  employeeName: string
  positionName: string
  startWorkShift: string
  startMorningBreak: string | null
  endMorningBreak: string | null
  startLunch: string | null
  endLunch: string | null
  startAfternoonBreak: string | null
  endAfternoonBreak: string | null
  endWorkShift: string
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export type TDatabaseData = Nullable<
  TItineraryModel &
    TEmployeeModel &
    TPositionModel &
    TWorkShiftModel &
    TBreakModel & {
      source:
        | 'employees'
        | 'positions'
        | 'workShifts'
        | 'breaks'
        | 'itineraries'
    }
>
