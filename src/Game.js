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
    this.enemyInterval = 1000

    this.pickups = []
    this.pickupTimer = 0
    this.pickupInterval = 5000

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    // Create enemies
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
      this.enemies.push(new Pumpkin(this, x, y))

      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    // Enemy collisions, player and projectiles
    this.enemies.forEach((enemy,) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        this.player.lives -= (Math.ceil(enemy.lives / 2))
        enemy.markedForDeletion = true
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > projectile.damage) {
            enemy.lives -= projectile.damage
          } else {
            if (Math.floor(Math.random() * (5 - 1) + 1) == 1) {
              this.createPickup(Candy, this.x, this.y)
            } else if (this.player.ammo < 2) {
              this.createPickup(Candy, this.x, this.y)
            }
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })

    // Create Pickups
    /* if (this.pickupTimer > this.pickupInterval) {
       let x = Math.random() * (this.width - 0) + 0
       let y = Math.random() * (this.height - 0) + 0
       let pickup = Math.floor(Math.random() * (10 - 0) + 0)
       if (pickup < 9) {
         this.pickups.push(new Candy(this, x, y))
       } else {
         this.pickups.push(new PowerUp(this, x, y))
       }
       this.pickupTimer = 0
     } else {
       this.pickupTimer += deltaTime
     }*/


    // Pickup collisions with player
    this.pickups.forEach((pickup,) => {
      if (this.checkCollision(this.player, pickup)) {
        if (pickup.type === 'candy') {
          this.player.ammo += 5
        } else {
          this.player.damage++
        }
        pickup.markedForDeletion = true
      }
    })

    // Filter out enemies and pickups
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    this.pickups = this.pickups.filter((pickup) => !pickup.markedForDeletion)
  }

  createPickup(pickup, x, y) {
    this.x = Math.random() * (this.width - 0) + 0
    this.y = Math.random() * (this.height - 0) + 0
    this.pickups.push(new pickup(this, x, y))
  }

  draw(context) {
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.pickups.forEach((pickup) => {
      pickup.draw(context)
    })
    this.ui.draw(context)
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
