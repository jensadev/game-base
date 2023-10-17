export default class Camera {
  constructor(game, x, y) {
    this.game = game
    this.x = x
    this.y = y
    this.width = this.game.width
    this.height = this.game.height
    this.worldWidth = 800
    this.worldHeight = 500
  }

  update(player) {
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2
    const maxX = this.worldWidth - this.width
    const maxY = this.worldHeight - this.height

    this.x = Math.min(Math.max(player.x - halfWidth, 0), maxX)
    this.y = Math.min(Math.max(player.y - halfHeight, 0), maxY)
  }
}
