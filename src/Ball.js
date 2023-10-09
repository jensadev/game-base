export default class Ball {
  constructor(game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.radius = 8
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2
    this.direction = 1

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 10
  }

  update(deltaTime) {
    this.speedX += this.direction * this.maxSpeed

    this.x += this.speedX
  }

  draw(context) {
    context.fillStyle = '#fff'
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.fill()
  }
}
