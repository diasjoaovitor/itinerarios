import { TEmployee } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedEmployees: TEmployee[] = [
  {
    employeeName: 'Employee 1',
    roleId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeName: 'Employee 2',
    roleId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeName: 'Employee 3',
    roleId: 3,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeName: 'Employee 4',
    roleId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    employeeName: 'Employee 5',
    roleId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
