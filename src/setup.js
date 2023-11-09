import Game from './Game'
import Loader from './Loader'

export function setup(canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = 854
  canvas.height = 480

  const loader = new Loader()

  loader.loadImages([
    { name: 'playerIdle', src: './assets/sprites/Idle (78x58).png' },
    { name: 'playerRun', src: './assets/sprites/Run (78x58).png' },
    { name: 'playerAttack', src: './assets/sprites/Attack (78x58).png' },
  ])

  loader.loadSounds([])

  loader.loadJSON([])

  console.log(loader.isReady())

  const run = () => {
    const game = new Game(canvas.width, canvas.height, loader)
    let lastTime = 0

    const animate = (timeStamp) => {
      const deltaTime = timeStamp - lastTime
      lastTime = timeStamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      game.update(deltaTime)
      game.draw(ctx)
      requestAnimationFrame(animate)
    }

    animate(0)
  }

  loader.onReady(() => {
    console.log('ready')
    run()
  })
}
