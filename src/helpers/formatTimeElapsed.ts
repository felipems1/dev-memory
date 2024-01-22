export const formatTimeElapsed = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60

  const secString = `${seconds < 10 ? '0' + seconds : seconds}`
  const minString = `${minutes < 10 ? '0' + minutes : minutes}`

  return `${minString}:${secString}`
}
