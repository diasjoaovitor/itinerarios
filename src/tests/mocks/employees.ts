import { TEmployee } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedEmployees: TEmployee[] = [
  {
    name: 'João',
    roleId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Vitor',
    roleId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Cleiton',
    roleId: 3,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Maria',
    roleId: 1,
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Pedro',
    roleId: 2,
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
