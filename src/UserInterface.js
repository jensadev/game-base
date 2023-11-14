export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`${this.game.player1Score}`, this.game.width / 2 - 200, 40)
    context.textAlign = 'right'
    context.fillText(`${this.game.player2Score}`, this.game.width / 2 + 200, 40)

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    if (this.game.countdown > 0) {
      context.textAlign = 'center'
      context.font = `100px ${this.fontFamily}`
      context.fillText(
        `${Math.ceil(this.game.countdown)}`,
        this.game.width / 2 - 10,
        this.game.height / 2 + 20
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.ball.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.ball.y}`, this.game.width - 20, 50)
      context.fillText(
        `ballSpeedX: ${this.game.ball.speedX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `ballSpeedY: ${this.game.ball.speedY}`,
        this.game.width - 20,
        100
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
