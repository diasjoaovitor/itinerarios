import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MdArrowBack } from 'react-icons/md'
import { useOpen } from '@/hooks'
import { Alert, Button, Dialog, IconButton, Typography } from '..'
import * as S from './styles'

type TFormProps = {
  title: string
  children: ReactNode
  isFilled: boolean
  isError: boolean
  isSuccess: boolean
  errorMessage: string
  successRedirect: string
  handleSubmit(formData: FormData): void
  handleDelete?: () => void
}

export const Form = ({
  children,
  errorMessage,
  isError,
  isFilled,
  isSuccess,
  successRedirect,
  title,
  handleSubmit,
  handleDelete
}: TFormProps) => {
  const router = useRouter()
  const {
    handleClose: handleDialogClose,
    handleOpen: handleDialogOpen,
    open: dialogOpen
  } = useOpen()
  const { handleOpen: handleAlertOpen, open: alertOpen } = useOpen()

  useEffect(() => {
    if (!isError) return
    handleAlertOpen()
    handleDialogClose()
  }, [isError])

  useEffect(() => {
    if (isSuccess) router.push(successRedirect)
  }, [isSuccess])

  return (
    <S.Wrapper action={handleSubmit} noValidate>
      <S.Header>
        <Typography component="h1">{title}</Typography>
        <IconButton handleClick={router.back}>
          <MdArrowBack size={28} />
        </IconButton>
      </S.Header>
      {children}
      <Button type="submit">Salvar</Button>
      {isFilled && handleDelete && (
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
      <Alert open={alertOpen} severity="error" title={errorMessage} />
    </S.Wrapper>
  )
}
