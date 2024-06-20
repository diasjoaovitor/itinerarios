import { TbCalendarTime } from 'react-icons/tb'
import { Link, Typography } from '..'
import * as S from './styles'

export const Header = () => {
  return (
    <S.Header>
      <S.Container>
        <S.Title href="/">
          <TbCalendarTime size={28} />
          <Typography variant="md">Itinerários</Typography>
        </S.Title>
        <S.Nav>
          <Link href="/" active={true}>
            Home
          </Link>
          <Link href="/employees">Funcionários</Link>
          <Link href="/roles">Funções</Link>
          <Link href="/working-days">Expedientes</Link>
          <Link href="/break-times">Intervalos</Link>
        </S.Nav>
      </S.Container>
    </S.Header>
  )
}
