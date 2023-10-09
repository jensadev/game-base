import Player from './Player.js'

export default class Paddle extends Player {
  constructor(game, x, color, player) {
    super(game)
    this.width = 24
    this.height = 64
    this.x = x
    this.y = this.game.height / 2 - this.height / 2
    this.color = color
    this.player = player
  }

  update(deltaTime) {
    if (this.game.keys.includes('ArrowUp') && this.player === 1) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown') && this.player === 1) {
      this.speedY = this.maxSpeed
    } else if (this.player === 1) {
      this.speedY = 0
    }

    if (this.game.keys.includes('w') && this.player === 2) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('s') && this.player === 2) {
      this.speedY = this.maxSpeed
    } else if (this.player === 2) {
      this.speedY = 0
    }

    this.y += this.speedY
  }

  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
