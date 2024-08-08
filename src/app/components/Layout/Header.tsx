import { usePathname } from 'next/navigation'
import { TbCalendarTime } from 'react-icons/tb'
import { Link, Typography } from '..'
import * as S from './styles'

const links = [
  { label: 'Início', href: '/' },
  { label: 'Expedientes', href: '/working-days' },
  { label: 'Intervalos', href: '/break-times' },
  { label: 'Funcionários', href: '/employees' },
  { label: 'Cargos', href: '/roles' }
]

export const Header = () => {
  const path = usePathname()
  return (
    <S.Header>
      <S.Container>
        <S.Title href="/">
          <TbCalendarTime size={28} />
          <Typography variant="md">Itinerários</Typography>
        </S.Title>
        <S.Nav>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              active={`/${path.split('/')[1]}` === href}
            >
              {label}
            </Link>
          ))}
        </S.Nav>
      </S.Container>
    </S.Header>
  )
}
