import Slime from './Slime.js'
import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Hiscore from './Hiscore.js'
export default class Game {
  constructor(canvasElement, hiscoreElement) {
    this.width = canvasElement.width
    this.height = canvasElement.height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.hiscore = new Hiscore(this, hiscoreElement)
    this.hiscore.draw()
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.player = new Player(this)
    this.score = 0
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    } else {
      return
    }

    this.player.update(deltaTime)

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.player.health -= 10
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true
          projectile.markedForDeletion = true
          this.score += enemy.score
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

    if (this.player.health <= 0) {
      this.hiscore.setScore(this.score)
      this.hiscore.draw()
      this.gameOver = true
    }
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
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
}
