import attackAsset from './assets/sprites/Attack (78x58).png'

export default class Projectile {
  constructor(game, x, y) {
    this.game = game
    this.width = 4
    this.height = 4
    this.x = x
    this.y = y

    this.speed = 5
    this.damage = 1
    this.markedForDeletion = false

    // adding sprite image
    const attackImage = new Image()
    attackImage.src = attackAsset
    this.image = attackImage
  }

  update() {
    this.x += this.speed
    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    // context.fillStyle = '#ff0'
    // context.fillRect(this.x, this.y, this.width, this.height)
    // image, sx, sy, sw, sh, dx, dy, dw, dh
    context.drawImage(this.image, 120, 0, 32, 58, this.x, this.y, 32, 38)
  }
}
