type TKeyId =
  | 'roleId'
  | 'employeeId'
  | 'workingHourId'
  | 'breakTimeId'
  | 'itineraryId'

export type TUpdate<T> = {
  columns: Partial<Omit<T, 'createdAt'>> & { updatedAt: string }
  idKey: TKeyId
  ids: number[]
}

export type TDelete = {
  table: string
  idKey: TKeyId
  ids: number[]
}

export type TEmployee = {
  employeeName: string
  roleId: number
  createdAt: string
  updatedAt: string
  employeeId?: number
}

export type TRole = {
  roleName: string
  createdAt: string
  updatedAt: string
  roleId?: number
}

export type TWorkingHour = {
  startOfTheWorkingDay: string
  startOfLunch: string
  endOfLunch: string
  endOfTheWorkingDay: string
  createdAt: string
  updatedAt: string
  workingHourId?: number
}

export type TBreakTime = {
  start: string
  end: string
  createdAt: string
  updatedAt: string
  breakTimeId?: number
}

export type TItinerary = {
  employeeId: number
  workingHourId: number
  breakTimeId: number
  createdAt: string
  updatedAt: string
  itineraryId?: number
}

export type TEmployeeItinerary = TEmployee &
  TRole &
  TWorkingHour &
  TBreakTime &
  TItinerary
