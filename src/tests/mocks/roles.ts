import { TRole } from '@/types'
import { getTimestamp } from '@/utils'

const timestamp = getTimestamp()

export const mockedRoles: TRole[] = [
  {
    name: 'Operador de Caixa',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Empacotador',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Repositor',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Entregador',
    createdAt: timestamp,
    updatedAt: timestamp
  }
]
