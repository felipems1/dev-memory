import { Container, Label } from './styles'

interface Props {
  label: string
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({ label, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <Label>{label}</Label>
    </Container>
  )
}
