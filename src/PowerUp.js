import Enemy from './Enemy.js'

export default class PowerUp extends Enemy {
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