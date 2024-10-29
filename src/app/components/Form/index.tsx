import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'
import {
  Button,
  Dialog,
  IconButton,
  Layout,
  TLayoutProps,
  Typography
} from '@/components'
import { useOpen } from '@/hooks'
import * as S from './styles'

type TFormProps = {
  title: string
  children: ReactNode
  mode: 'create' | 'update'
  layoutProps: TLayoutProps
  handleSubmit(formData: FormData): void
  handleDelete?: () => void
}

export const Form = ({
  children,
  mode,
  title,
  layoutProps,
  handleSubmit,
  handleDelete
}: TFormProps) => {
  const router = useRouter()
  const {
    handleClose: handleDialogClose,
    handleOpen: handleDialogOpen,
    open: dialogOpen
  } = useOpen()

  return (
    <Layout {...layoutProps}>
      <S.Wrapper action={handleSubmit} noValidate>
        <S.Header>
          <Typography component="h1">{title}</Typography>
          <IconButton bgColor="paper" handleClick={router.back}>
            <MdArrowBack size={28} />
          </IconButton>
        </S.Header>
        {children}
        <Button type="submit">Salvar</Button>
        {mode === 'update' && handleDelete && (
          <>
            <Button variant="text" color="error" onClick={handleDialogOpen}>
              Excluir
            </Button>
            <Dialog
              title="Deseja realmente excluir?"
              open={dialogOpen}
              handleAccept={handleDelete}
              handleReject={handleDialogClose}
            />
          </>
        )}
      </S.Wrapper>
    </Layout>
  )
}
