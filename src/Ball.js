export default class Ball {
  constructor(game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 10
  }
}
