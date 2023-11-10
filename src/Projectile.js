import attackAsset from './assets/sprites/king/Attack (78x58).png'

export default class Projectile {
  constructor(game, x, y, direction) {
    this.game = game
    this.width = 4
    this.height = 4
    this.x = x
    this.y = y
    this.direction = direction

    this.speed = 5
    this.damage = 1
    this.markedForDeletion = false

    // adding sprite image
    const attackImage = new Image()
    attackImage.src = attackAsset
    this.image = attackImage
  }

  update() {
    this.x += this.speed * this.direction
    if (this.x > this.game.width + this.game.camera.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.camera.x) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    // context.fillStyle = '#ff0'
    // context.fillRect(this.x, this.y, this.width, this.height)
    // image, sx, sy, sw, sh, dx, dy, dw, dh
    context.drawImage(this.image, 120, 0, 32, 58, this.x, this.y, 32, 38)
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
