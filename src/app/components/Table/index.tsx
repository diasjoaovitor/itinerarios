import { useRouter } from 'next/navigation'
import { Layout, LinkButton, TLayoutProps, Typography } from '@/components'
import * as S from './styles'

type TTableProps = {
  columns: string[]
  keys: string[]
  data: any[]
  path: string
  text: string
  layoutProps: TLayoutProps
}

export const Table = ({
  columns,
  keys,
  data,
  path,
  text,
  layoutProps
}: TTableProps) => {
  const router = useRouter()
  return (
    <Layout {...layoutProps}>
      <S.Wrapper>
        <LinkButton href={`/${path}/new`}>{text}</LinkButton>
        {data.length ? (
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
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/${path}/${item.id}`)}
                >
                  <td>{index + 1}</td>
                  {keys.map((key, index) => (
                    <td key={index}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography component="p">Nenhum registro encontrado</Typography>
        )}
      </S.Wrapper>
    </Layout>
  )
}
