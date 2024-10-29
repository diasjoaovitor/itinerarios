import { Button, Typography } from '../..'
import * as S from './styles'

type TDialogProps = {
  open: boolean
  title: string
  handleAccept(): void
  handleReject(): void
}
export const Dialog = ({
  open,
  title,
  handleAccept,
  handleReject
}: TDialogProps) => {
  if (!open) return null

  return (
    <S.Wrapper>
      <S.Content>
        <Typography component="h3" variant="xs">
          {title}
        </Typography>
        <S.Grid>
          <Button onClick={handleAccept}>Sim</Button>
          <Button color="error" onClick={handleReject}>
            Não
          </Button>
        </S.Grid>
      </S.Content>
    </S.Wrapper>
  )
}
