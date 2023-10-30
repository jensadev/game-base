import Pickup from './Pickup.js'

export default class Gumball extends Pickup {
    constructor(game, x, y) {
        super(game)
        this.width = 8
        this.height = 8
        this.x = xs
        this.y = y
        this.taste = (Math.random() * (2 - 1) + 1)
        this.color = '#ff00ff'
        this.type = 'gumball'
    }
}