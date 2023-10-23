import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height - this.height - 40

    this.frameX = 0

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.ammo = 100
    this.ammoInterval = 1000
    this.ammoTimer = 0
  }

  update(deltaTime) {
    if (this.game.keys.includes('ArrowLeft')) {
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowRight')) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    if (this.ammoTimer > this.ammoInterval) {
      this.ammo++
      this.ammoTimer = 0
    } else {
      this.ammoTimer += deltaTime
    }

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
    }
  }

  shoot() {
    if (this.ammo > 0) {
      this.ammo--
      this.projectiles.push(
        new Projectile(this.game, this.x + this.width / 2, this.y - 10)
      )
    }
  }
}
