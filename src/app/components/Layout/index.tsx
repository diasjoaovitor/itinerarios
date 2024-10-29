import { Header } from './Header'
import { Alert, Loader, TAlertProps } from '@/components'
import * as S from './styles'

export type TLayoutProps = {
  loading: boolean
  alert: TAlertProps
}

export const Layout = ({
  children,
  loading,
  alert
}: TLayoutProps & {
  children: React.ReactNode
}) => {
  if (loading) {
    return <Loader open={loading} />
  }

  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
      <Alert {...alert} />
    </>
  )
}
