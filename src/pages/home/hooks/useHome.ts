import { useEffect, useState } from 'react'
import { GridItemType } from '../../../types/GridItemType'
import { items } from '../../../data/items'

export const useHome = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  // verify if opened are equal
  useEffect(() => {
    if (showCount === 2) {
      const opened = gridItems.filter((item) => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          // v1 - if both are equal, make every "shown" permanent
          const tmpGrid = [...gridItems]
          for (const i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        } else {
          // v2 - if they are NOT equal, close all 'shown'
          setTimeout(() => {
            const tmpGrid = [...gridItems]
            for (const i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid)
            setShowCount(0)
          }, 1000)
        }

        setMoveCount((moveCount) => moveCount + 1)
      }
    }
  }, [showCount, gridItems])

  // verify if game is over
  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo

    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    // passo 2 - criar grid
    // 2.1 - criar um grid vazio

    const tmpGrid: GridItemType[] = []
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      })
    }

    // passo 2.2 - preencher o grid

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }

    // passo 2.3 - jogar no state

    setGridItems(tmpGrid)

    // passo 3 - reiniciar o jogo

    setPlaying(false)
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      const tmpGrid = [...gridItems]
      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true
        setShowCount(showCount + 1)
      }
      setGridItems(tmpGrid)
    }
  }

  const startGame = () => {
    setPlaying(true)
  }

  return {
    gridItems,
    moveCount,
    timeElapsed,
    handleItemClick,
    resetAndCreateGrid,
    startGame,
  }
}
