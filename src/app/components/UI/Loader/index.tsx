import * as S from './styles'

export const Loader = ({ open }: { open: boolean }) => {
  if (!open) return null
  return (
    <S.Wrapper>
      <S.Animation size={42}></S.Animation>
    </S.Wrapper>
  )
}
