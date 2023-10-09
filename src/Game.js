import InputHandler from './InputHandler.js'
import Paddle from './Paddle.js'
import Ball from './Ball.js'

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false

    this.ball = new Ball(this)

    this.paddle1 = new Paddle(this, 0, '#f00', 1)
    this.paddle2 = new Paddle(this, this.width - 24, '#00f', 2)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    this.paddle1.update(deltaTime)
    this.paddle2.update(deltaTime)
    this.ball.update(deltaTime)
  }

  draw(context) {
    this.paddle1.draw(context)
    this.paddle2.draw(context)
    this.ball.draw(context)
  }
}
