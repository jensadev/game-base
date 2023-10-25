import Pickup from './Pickup.js'

export default class Gumball extends Pickup {
    constructor(game, x, y) {
        super(game)
        this.width = 64
        this.height = 64
        this.x = x
        this.y = y
        this.taste = (Math.random() * (3 - 0) + 0)
        if (this.taste < 1) {
            this.color = '#ff00e0'
        } else if (this.taste < 2){
            this.color = '#2b953f'
        } else {
            this.color = '#9a4bb4'
        }
        this.type = 'gumball'
    }
}