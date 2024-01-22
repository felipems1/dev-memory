import { items } from '../../../../data/items'
import { GridItemType } from '../../../../types/GridItemType'
import { Container, Icon } from './styles'
import b7Logo from '../../../../assets/b7.svg'

interface Props {
  item: GridItemType
  onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <Container
      showBackground={item.permanentShown || item.shown}
      onClick={onClick}
    >
      {item.permanentShown === false && item.shown === false && (
        <Icon src={b7Logo} alt="" opacity={0.1} />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <Icon src={items[item.item].icon} alt="" />
      )}
    </Container>
  )
}
