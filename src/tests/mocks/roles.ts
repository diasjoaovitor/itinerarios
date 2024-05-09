import { TRole } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedRoles: TRole[] = [
  {
    roleName: 'Role 1',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    roleName: 'Role 2',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    roleName: 'Role 3',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    roleName: 'Role 4',
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
