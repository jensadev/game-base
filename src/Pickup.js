export default class Pickup {
    constructor(game, color) {
        this.game = game
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.markedForDeletion = false
        this.color = color
        this.type = 'pickup'
    }

    draw(context) {
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)

        if (this.game.debug) {
            context.fillText(this.type, this.x, this.y - 5)
        }
    }
}