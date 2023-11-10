export default class Item {
  constructor(game, x, y) {
    this.game = game
    this.x = x
    this.y = y
    this.width = 32
    this.height = 32
    this.speedY = 0
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.speedY += this.game.gravity
    this.y += this.speedY

    if (this.y > this.game.height) this.markedForDeletion = true
  }

  draw(context) {
    context.fillStyle = '#fff'
    context.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}
