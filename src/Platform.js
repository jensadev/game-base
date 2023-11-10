export default class Platform {
  constructor(game, x, y, width, height, imageUrl) {
    this.game = game
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    if (imageUrl) {
      const image = new Image()
      image.src = imageUrl
      this.image = image
    }
  }

  update() {}

  draw(context) {
    if (this.image) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      context.fillStyle = '#795548'
      context.fillRect(this.x, this.y, this.width, this.height)
    }

    if (this.game.debug) {
      context.fillStyle = 'black'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}
