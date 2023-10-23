import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = Math.random() * (this.game.width * 0.9 - this.width)
    this.y = 0
    this.speedY = Math.random() * +1.5 + 0.5
    this.speedX = 0
    this.lives = 2
  }
}
