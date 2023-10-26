import Pickup from './Pickup.js'

export default class PowerUp extends Pickup {
    constructor(game, x, y) {
        super(game)
        this.width = 8
        this.height = 8
        this.x = x
        this.y = y
        this.lives = 1
        this.color = '#ff00ff'
        this.type = 'powerup'
    }
}