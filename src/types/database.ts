export type TDBUpdate<T> = {
  columns: Partial<Omit<T, 'createdAt' | 'id'>> & { updatedAt: string }
  ids: number[]
}

export type TDBDelete = {
  table: string
  ids: number[]
}

export type TDBEmployee = {
  name: string
  roleId: number
  createdAt: string
  updatedAt: string
  id?: number
}

export type TDBRole = {
  name: string
  createdAt: string
  updatedAt: string
  id?: number
}

export type TDBWorkingDay = {
  startOfTheWorkingDay: string
  startOfLunch: string
  endOfLunch: string
  endOfTheWorkingDay: string
  createdAt: string
  updatedAt: string
  id?: number
}

export type TDBBreakTime = {
  start: string
  end: string
  createdAt: string
  updatedAt: string
  id?: number
}

export type TDBItinerary = {
  employeeId: number
  workingDayId: number
  morningBreakId: number
  afternoonBreakId: number
  createdAt: string
  updatedAt: string
  id?: number
}
