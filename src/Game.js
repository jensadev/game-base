import InputHandler from './InputHandler.js'
import Player from './Player.js'
import Camera from './Camera.js'
import UserInterface from './UserInterface.js'
export default class Game {
  constructor(canvas) {
    this.width = canvas.width
    this.height = canvas.height
    this.canvasPosition = canvas.canvasPosition
    this.canvasOffset = {
      left: canvas.offsetLeft,
      top: canvas.offsetTop,
    }
    this.input = new InputHandler(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false

    this.player = new Player(this)
    this.camera = new Camera(this, this.player.x, this.player.y, 0, 100)

    this.ui = new UserInterface(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    this.player.update(deltaTime)
    this.camera.update(this.player)
  }

  draw(context) {
    this.ui.draw(context)
    this.camera.apply(context)
    this.player.draw(context)
    this.camera.reset(context)
  }
}
