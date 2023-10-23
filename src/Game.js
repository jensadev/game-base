import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Background from './Background.js'
import Sound from './Sound.js'

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.background = new Background(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.player = new Player(this)

    this.ground = this.height - 82

    this.speed = 1

    this.sound = new Sound(this)
    // this.sound.playBackgroundMusic()

    this.levels = {
      danger: {
        y: 200,
        color: {
          r: 255,
          g: 55,
          b: 55,
          a: 0.4,
        },
      },
      warning: {
        y: 400,
        color: {
          r: 200,
          g: 100,
          b: 100,
          a: 0.5,
        },
      },
      safe: {
        y: 600,
        color: {
          r: 155,
          g: 155,
          b: 155,
          a: 0.6,
        },
      },
      void: {
        y: 700,
        color: {
          r: 100,
          g: 100,
          b: 100,
          a: 0.7,
        },
      },
    }
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    this.background.update()
    // this.background.layers[3].update()

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
    this.background.draw(context)
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }

  addEnemy() {
    // this.enemies.push(new Slime(this))
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
