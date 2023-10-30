export default class Weapon {
  constructor(game, name) {
    this.game = game
    this.name = name
    this.x = 0
    this.y = 0
    this.offsetX = 0
    this.offsetY = 0
    this.directionX = 'right'
    this.directionY = 'down'
  }

  update(player) {
    this.directionX = this.game.input.mouseX > this.x ? 'right' : 'left'
    this.directionY = this.game.input.mouseY > this.y ? 'down' : 'up'

    // Change offset based on direction
    if (this.directionX === 'right') {
      this.offsetX = player.width
    } else {
      this.offsetX = 0
    }

    if (this.directionY === 'down') {
      this.offsetY = player.height
    } else {
      this.offsetY = 0
    }

    this.x = player.x + this.offsetX
    this.y = player.y + this.offsetY
  }

  draw(context) {
    context.save()
    context.fillStyle = 'white'
    // context.fillRect(this.x, this.y, 10, 10);

    // Draw weapon name
    context.font = '16px Arial'
    context.fillText(this.name, this.x, this.y)

    context.restore()
  }
}
