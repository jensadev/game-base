import Pickup from './Pickup.js'

export default class Candy extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.lives = 1
    this.color = '#0f0'
    this.type = 'candy'
  }
}
