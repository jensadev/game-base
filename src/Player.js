import Projectile from './Projectile.js'
import Particle from './Particle.js'
export default class Player {
  constructor(game) {
    this.game = game
    this.width = 16
    this.height = 16
    this.offset = 8
    this.x = this.game.width / 2
    this.y = this.game.height - 150

    this.frameX = 0

    this.projectiles = []
    this.particles = []
    this.particleTimer = 0
    this.particleInterval = 25

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.jumpSpeed = 14
    this.grounded = false

    this.health = 100
    this.healthTick = 0
    this.healthTimer = 0
    this.healthInterval = 200

    this.color = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    }
  }

  update(deltaTime) {
    if (this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.includes('d')) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.includes('s')) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    if (this.game.input.mouseDown) {
      this.beam()
    }

    this.particles.forEach((particle) => {
      particle.update(deltaTime)
    })
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    )

    // particles and color

    if (this.y < this.game.levels.danger.y) {
      if (this.healthTimer > this.healthInterval) {
        this.health -= 3
        this.healthTimer = 0
      }
      this.color = this.game.levels.danger.color
      if (this.particleTimer > this.particleInterval) {
        this.particles.push(
          new Particle(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.game.levels.danger.color
          )
        )
        this.particleTimer = 0
      }
    } else if (this.y < this.game.levels.warning.y) {
      if (this.healthTimer > this.healthInterval) {
        this.health -= 2
        this.healthTimer = 0
      }
      this.color = this.game.levels.warning.color
      if (this.particleTimer > this.particleInterval) {
        this.particles.push(
          new Particle(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.game.levels.warning.color
          )
        )
        this.particleTimer = 0
      }
    } else if (this.y < this.game.levels.safe.y) {
      if (this.healthTimer > this.healthInterval) {
        this.health -= 1
        this.healthTimer = 0
      }
      this.color = this.game.levels.safe.color
      if (this.particleTimer > this.particleInterval) {
        this.particles.push(
          new Particle(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.game.levels.safe.color
          )
        )
        this.particleTimer = 0
      }
    } else {
      if (this.healthTimer > this.healthInterval) {
        if (this.health < 100) {
          this.health += 1
        }
        this.healthTimer = 0
      }
      this.color = this.game.levels.void.color
    }
    this.particleTimer += deltaTime
    this.healthTimer += deltaTime
  }

  draw(context) {
    this.particles.forEach((particle) => {
      particle.draw(context)
    })

    if (this.game.debug) {
      context.strokeStyle = this.game.debugColor
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    // if (this.beam.active) {
    //   context.beginPath()
    //   context.rect(this.x, this.y, this.width, this.height)
    //   context.fillStyle = 'rgba(255, 55, 55, 0.5)'
    //   context.fill()
    // }

    context.beginPath()
    context.rect(this.x, this.y, this.width, this.height)
    context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
    context.fill()

    context.beginPath()
    context.rect(
      this.x + this.offset / 2,
      this.y + this.offset / 2,
      this.offset,
      this.offset
    )
    context.fillStyle = 'rgba(255, 255, 255, 0.5)'
    context.fill()
  }

  shoot() {
    this.projectiles.push(
      new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
    )
  }

  beam() {
    this.health -= 0.5
    this.particles.push(
      new Particle(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.game.levels.danger.color
      )
    )
  }
}
