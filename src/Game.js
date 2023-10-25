import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Candy from './Candy.js'
import PowerUp from './PowerUp.js'


export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = true
    this.gameTime = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 750

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    if (this.enemyTimer > this.enemyInterval) {
      let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
      if (x === 0) {
        y = Math.random() * this.height // if on left edge, randomize y position
      } else if (x === this.width) {
        y = Math.random() * this.height // if on right edge, randomize y position
      } else if (y === 0) {
        x = Math.random() * this.width // if on top edge, randomize x position
      } else {
        x = Math.random() * this.width // if on bottom edge, randomizea x position
      }
      if (Math.random() < 0.4) {
        this.enemies.push(new Candy(this, Math.random() * (this.width - 0) + 0, y))
      } else if (Math.random() < 0.6) {
        this.enemies.push(new PowerUp(this, Math.random() * (this.width - 0) + 0, y))
      }
      else {
        this.enemies.push(new Pumpkin(this, x, y))
      }
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    this.enemies.forEach((enemy,) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        this.player.lives--
        enemy.markedForDeletion = true
        if (enemy.type === 'candy') {
          this.player.ammo += 5
          this.player.lives++
        }
        if (enemy.type === 'powerup') {
          this.player.damage++
          this.player.lives++
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > projectile.damage) {
            enemy.lives -= projectile.damage
          } else {
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
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
