import InputHandler from './InputHandler.js'
import Paddle from './Paddle.js'
import Ball from './Ball.js'
import UserInterface from './UserInterface.js'
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
    this.userInterface = new UserInterface(this)

    this.paddle1 = new Paddle(this, 20, '#f00', 1)
    this.paddle2 = new Paddle(this, this.width - 44, '#00f', 2)

    this.player1Score = 0
    this.player2Score = 0
    this.winScore = 11
    this.pause = false
    this.countdown = 3
    this.nextBall = false
  }

  update(deltaTime) {
    if (this.pause) {
      return
    }
    if (this.gameOver) {
      return
    }

    this.paddle1.update(deltaTime)
    this.paddle2.update(deltaTime)

    if (this.countdown > 0) {
      this.countdown -= 1 / 20
      return
    } else if (this.countdown <= 0 && this.nextBall) {
      this.ball = this.nextBall
      this.nextBall = false
    }

    if (this.ball.x < 0) {
      console.log('player 2 scored')
      this.countdown = 3
      this.nextBall = new Ball(this, -1)
      this.player2Score++
    } else if (this.ball.x > this.width) {
      console.log('player 1 scored')
      this.countdown = 3
      this.nextBall = new Ball(this, 1)
      this.player1Score++
    }

    if (
      this.player1Score >= this.winScore ||
      this.player2Score >= this.winScore
    ) {
      this.gameOver = true
    }

    if (this.checkCollision(this.ball, this.paddle1)) {
      console.log('collision', this.paddle1)
      this.ball.direction = 1
      this.ball.speedY += this.paddle1.speedY / 2
    }

    if (this.checkCollision(this.ball, this.paddle2)) {
      console.log('collision', this.paddle2)
      this.ball.direction = -1
      this.ball.speedY += this.paddle2.speedY / 2
    }

    if (
      this.checkCollision(this.ball, {
        x: 0,
        y: 0,
        width: this.width,
        height: 0,
      })
    ) {
      this.ball.speedY = -this.ball.speedY
    }

    if (
      this.checkCollision(this.ball, {
        x: 0,
        y: this.height,
        width: this.width,
        height: 0,
      })
    ) {
      this.ball.speedY = -this.ball.speedY
    }

    this.ball.update(deltaTime)
  }

  draw(context) {
    this.paddle1.draw(context)
    this.paddle2.draw(context)
    this.ball.draw(context)
    this.userInterface.draw(context)
  }

  checkCollision(ball, object2) {
    // Calculate the closest point on the rectangle to the ball's center
    let closestX = this.clamp(ball.x, object2.x, object2.x + object2.width)
    let closestY = this.clamp(ball.y, object2.y, object2.y + object2.height)

    // Calculate the distance between the ball's center and this closest point
    let distanceX = ball.x - closestX
    let distanceY = ball.y - closestY

    // If the distance is less than the ball's radius, a collision occurred
    let distanceSquared = distanceX * distanceX + distanceY * distanceY
    if (distanceSquared < ball.radius * ball.radius) {
      // Collision detected
      // Determine the direction of the collision
      let collisionDirection = ''
      if (Math.abs(distanceY) > Math.abs(distanceX)) {
        collisionDirection = distanceY > 0 ? 'top' : 'bottom'
      } else {
        collisionDirection = distanceX > 0 ? 'left' : 'right'
      }

      return collisionDirection
    }

    return false
  }

  // Helper function to clamp a value between a min and max
  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
  }
}
