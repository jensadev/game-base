export default class Healthbar {
  constructor(game) {
    this.game = game
    this.width = 150
    this.height = 10
    this.x = 20
    this.y = 20
  }

  update(deltaTime) {}

  draw(context) {
    context.beginPath()
    context.rect(this.x, this.y, this.width, this.height)
    context.fillStyle = 'rgba(255, 0, 0, 0.2)'
    context.fill()
    context.beginPath()
    context.rect(this.x, this.y, this.game.player.health, this.height)
    context.fillStyle = 'rgba(255, 0, 0, 1)'
    context.fill()
    context.beginPath()
    context.rect(this.x, this.y, this.width, this.height)
    context.strokeStyle = '#000'
    context.lineWidth = 1
    context.stroke()
  }
}
