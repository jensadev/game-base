import Slime from './Slime.js'
import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Camera from './Camera.js'
import First from './levels/First.js'
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = true
    this.pause = false
    this.gameTime = 0

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.player = new Player(this)
    this.camera = new Camera(this, this.player.x, this.player.y, 0, 100)

    this.ground = this.height - 100

    this.level = new First(this)
  }

  update(deltaTime) {
    if (this.pause) return
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    let grounded = false
    this.level.platforms.forEach((platform) => {
      let direction = this.checkCollisionDirection(this.player, platform)
      if (
        direction === 'bottom' &&
        this.player.x + this.player.width > platform.x &&
        this.player.x < platform.x + platform.width
      ) {
        grounded = true
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height + 1
      }

      this.enemies.forEach((enemy) => {
        if (this.checkCollisionDirection(enemy, platform) === 'bottom') {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
        }
      })
    })

    this.player.grounded = grounded

    this.player.update(deltaTime)
    this.camera.update(this.player)

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    if (this.checkCollision(this.player, this.level.goal)) {
      this.gameOver = true
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    // console.log(this.camera)
    this.ui.draw(context)
    this.camera.apply(context)
    this.level.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.camera.reset(context)
  }

  addEnemy() {
    this.enemies.push(new Slime(this))
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }

  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }

  checkCollisionDirection(object1, object2) {
    const vectorX =
      object1.x + object1.width / 2 - (object2.x + object2.width / 2)
    const vectorY =
      object1.y + object1.height / 2 - (object2.y + object2.height / 2)

    const halfWidths = object1.width / 2 + object2.width / 2
    const halfHeights = object1.height / 2 + object2.height / 2

    if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
      const offsetX = halfWidths - Math.abs(vectorX)
      const offsetY = halfHeights - Math.abs(vectorY)
      if (offsetX >= offsetY) {
        if (vectorY > 0) {
          return 'top'
        } else {
          return 'bottom'
        }
      } else {
        if (vectorX > 0) {
          return 'left'
        } else {
          return 'right'
        }
      }
    }
  }
}
