export default class Ball {
  constructor(game, direction = Math.random() > 0.5 ? 1 : -1) {
    this.game = game
    this.width = 16
    this.height = 16
    this.radius = 8
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2
    this.direction = direction

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 4
  }

  update(deltaTime) {
    this.speedX = this.maxSpeed * this.direction
    if (this.direction === -1) {
      this.speedX = -Math.abs(this.speedX)
    } else if (this.direction === 1) {
      this.speedX = Math.abs(this.speedX)
    }
    this.x += this.speedX
    this.y += this.speedY
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fillStyle = '#fff'
    context.fill()
    context.closePath()

    // debug
    if (this.game.debug) {
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
      context.strokeStyle = '#000'
      context.stroke()
      context.closePath()
    }
  }
}
