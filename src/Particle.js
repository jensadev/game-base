export default class Particle {
  constructor(game, x, y, color) {
    this.game = game
    const direction = Math.random() < 0.5 ? -1 : 1
    this.x = x + direction * (Math.random() * 10 + 1)
    this.y = y + direction * (Math.random() * 10 + 1)
    this.color = color
    this.alpha = color.a + Math.random() * 0.5
    this.alphaTimer = 0
    this.alphaInterval = 400 + Math.floor(Math.random() * 200)
    this.dy = 1 + Math.random() * 3
    this.dx = -1 + Math.random() * 2
    this.size = 2 + Math.floor(Math.random() * 2)
    this.markedForDeletion = false
    this.PI_2 = Math.PI * 2
  }

  update(deltaTime) {
    this.y += this.dy
    this.x += this.dx

    if (this.x < 0 || this.x > this.game.width) {
      this.markedForDeletion = true
    }
    if (this.y > this.game.height) {
      this.markedForDeletion = true
    }

    if (this.alpha > 0 && this.alphaTimer < this.alphaInterval) {
      this.alphaTimer += deltaTime
    } else if (this.alpha > 0) {
      this.alpha -= 0.1
      this.alphaTimer = 0
    } else {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, this.PI_2, false)

    context.fillStyle = `rgba(
      ${this.color.r},
      ${this.color.g},
      ${this.color.b},
      ${this.alpha})`

    context.fill()
  }
}
