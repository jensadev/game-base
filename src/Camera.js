export default class Camera {
  constructor(game, x, y, minX = 0, minY = 0, lerpFactor = 0.1) {
    this.game = game
    this.x = x
    this.y = y
    this.width = this.game.width
    this.height = this.game.height
    this.worldWidth = 854
    this.worldHeight = 500
    this.minX = minX
    this.minY = minY
    this.lerpFactor = lerpFactor
  }

  update(player) {
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2
    const maxX = this.worldWidth
    const maxY = this.worldHeight - this.height

    console.log(maxX, this.minX)

    // calculate the target position for the camera
    let targetX = Math.min(Math.max(player.x - halfWidth, this.minX), maxX)
    let targetY = Math.min(Math.max(player.y - halfHeight, this.minY), maxY)

    // if the player is grounded, lock the camera to the player's y position
    if (player.grounded) {
      targetY = player.y - halfHeight
    }

    // smoothly move the camera towards the target position using lerp
    this.x += (targetX - this.x) * this.lerpFactor
    this.y += (targetY - this.y) * this.lerpFactor
  }

  apply(context) {
    context.save()
    context.translate(-this.x, -this.y)
  }

  reset(context) {
    context.restore()
  }
}
