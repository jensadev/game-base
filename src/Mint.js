import Pickup from './Pickup.js'

export default class Mint extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.lives = 1
    this.color = '#22dd8d'
    this.type = 'mint'
  }
}
