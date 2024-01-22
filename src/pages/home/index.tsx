import { Button } from '../../components/button'
import { formatTimeElapsed } from '../../helpers/formatTimeElapsed'
import { GridItem } from './components/gridItem'
import { InfoItem } from './components/infoItem'
import { Container, Grid, GridArea, Info, InfoArea, LogoLink } from './styles'
import logoImage from '../../assets/devmemory_logo.png'
import { useHome } from './hooks/useHome'

export function Home() {
  const {
    gridItems,
    moveCount,
    timeElapsed,
    handleItemClick,
    resetAndCreateGrid,
    startGame,
  } = useHome()

  return (
    <Container>
      <Info>
        <LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </LogoLink>

        <InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </InfoArea>

        <Button label="Iniciar" onClick={startGame} />
        <Button label="Reiniciar" onClick={resetAndCreateGrid} />
      </Info>
      <GridArea>
        <Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </Grid>
      </GridArea>
    </Container>
  )
}
