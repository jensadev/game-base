import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = 50
    this.y = 100

    this.frameX = 0

    this.projectiles = []

    this.direction = 1
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.jumpSpeed = 16
    this.jumpTimer = 0
    this.jumpInterval = 600
    this.grounded = false
  }

  update(deltaTime) {
    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

    if (this.game.keys.includes('ArrowLeft')) {
      this.direction = -1
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowRight')) {
      this.direction = 1
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.jumpTimer <= this.jumpInterval) {
      this.jumpTimer += deltaTime
    }

    if (this.game.keys.includes('ArrowUp')) {
      this.jump()
    }

    this.y += this.speedY
    this.x += this.speedX

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update()
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(this.frameX, this.x, this.y - 5)
      context.fillText(this.grounded, this.x + 20, this.y - 5)

      const x = this.direction === 1 ? this.x + this.width + 10 : this.x - 10
      context.beginPath()
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, this.y + this.height / 2)
      context.stroke()
    }
  }

  jump() {
    if (this.jumpTimer > this.jumpInterval && this.grounded) {
      this.speedY = -this.jumpSpeed
      this.jumpTimer = 0
      this.grounded = false
    }
  }

  shoot() {
    const offset = 10
    const x =
      this.direction === 1 ? this.x + this.width + offset : this.x - offset
    this.projectiles.push(
      new Projectile(this.game, x, this.y + this.height / 2, this.direction)
    )
  }
}
