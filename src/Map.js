export default class Map {
  constructor(game, width, height) {
    this.game = game
    this.width = width
    this.height = height
    this.platforms = []
    this.goal = null
  }

  draw(context) {
    this.platforms.forEach((platform) => platform.draw(context))
    if (this.goal) {
      // console.log(this.goal)
      this.goal.draw(context)
    }
  }

  addPlatform(platform) {
    this.platforms.push(platform)
  }

  addGoal(goal) {
    this.goal = goal
  }
}
