import Game from './Game'

export function setup(canvasElement, hiscoreElement) {
  const ctx = canvasElement.getContext('2d')
  canvasElement.width = 854
  canvasElement.height = 480

  const game = new Game(canvasElement, hiscoreElement)
  let lastTime = 0

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate(0)
}
