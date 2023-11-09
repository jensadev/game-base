import Projectile from './Projectile.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 78
    this.height = 58
    this.x = 50
    this.y = 100

    this.frameX = 0

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.jumpSpeed = 14
    this.grounded = false

    // sprite animation
    this.frameX = 0
    this.maxFrame = 0
    this.animationFps = 20
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    console.log(this.game.loader)
    this.idle = {
      image: this.game.loader.images.playerIdle,
      frames: 11,
    }
    this.run = {
      image: this.game.loader.images.playerRun,
      frames: 8,
    }
    this.attack = {
      image: this.game.loader.images.playerAttack,
      frames: 3,
    }
    this.image = this.idle.image

    // flip sprite direction
    this.flip = false

    // shooting
    this.shooting = false
  }

  update(deltaTime) {
    if (this.game.keys.includes('ArrowLeft')) {
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.includes('ArrowRight')) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') && this.grounded) {
      this.speedY = -this.jumpSpeed
      this.grounded = false
    }

    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

    // play run or idle animation
    if (this.shooting) {
      this.maxFrame = this.attack.frames
      this.image = this.attack.image
      if (this.frameX === this.attack.frames - 1) {
        this.shooting = false
      }
    } else if (this.speedX !== 0) {
      this.maxFrame = this.run.frames
      this.image = this.run.image
    } else {
      this.maxFrame = this.idle.frames
      this.image = this.idle.image
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

    // flip sprite direction
    if (this.speedX < 0) {
      this.flip = true
    } else if (this.speedX > 0) {
      this.flip = false
    }

    // sprite animation update
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(context) {
    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(this.frameX, this.x, this.y - 5)
      context.fillText(this.grounded, this.x + 20, this.y - 5)
    }

    // draw sprite image
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    // s = source, d = destination
    // image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight
    context.drawImage(
      this.image,
      this.frameX * this.width,
      -14,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
  }

  shoot() {
    this.shooting = true
    this.projectiles.push(
      new Projectile(this.game, this.x + this.width, this.y + this.height / 2)
    )
  }
}
