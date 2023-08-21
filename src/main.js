import { createGame } from './game.js'

const game = createGame()

function handleKeydown(event) {
  const keyPressed = event.key
  game.hotKeys({ keyPressed })
}

document.addEventListener('keydown', handleKeydown)
