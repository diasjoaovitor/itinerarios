import { useRouter } from 'next/navigation'
import { errorMessage } from '@/errors'
import { Alert } from '../UI/Alert'
import * as S from './styles'

type TTableProps = {
  columns: string[]
  keys: string[]
  data: any[]
  path: string
  isAlertOpen: boolean
}

export const Table = ({
  columns,
  keys,
  data,
  path,
  isAlertOpen
}: TTableProps) => {
  const router = useRouter()
  return (
    <S.Wrapper>
      <table>
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => router.push(`/${path}/${item.id}`)}
              >
                <td>{index + 1}</td>
                {keys.map((key, colIndex) => (
                  <td key={colIndex}>{item[key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>Nenhum dado cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
      <Alert open={isAlertOpen} severity="error" title={errorMessage.get} />
    </S.Wrapper>
  )
}
