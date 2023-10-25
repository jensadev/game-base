import Pickup from './Pickup.js'

export default class Gumball extends Pickup {
    constructor(game, x, y) {
        super(game)
        this.width = 64
        this.height = 64
        this.x = x
        this.y = y
        this.taste = (Math.random() * (5 - 0) + 0)
        if (this.taste < 1) {
            this.color = '#ff00e0'
        } else if (this.taste < 2){
            this.color = '#2b953f'
        } else  if (this.taste < 3){
            this.color = '#9a4bb4'
        } else if (this.taste < 4){
            this.color = '#ff2700'
        } else {
            this.color = '#fffd00'
        }
        this.type = 'gumball'
    }
}