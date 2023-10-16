import Item from '../Item'
import Map from '../Map'
import Platform from '../Platform'

export default class First extends Map {
  constructor(game) {
    super(game, 1000, 500)

    this.addPlatform(new Platform(game, 0, 450, 300, 50))
    this.addPlatform(new Platform(game, 350, 450, 4000, 50))
    this.addPlatform(new Platform(game, 0, 400, 200, 50))
    this.addPlatform(new Platform(game, 540, 280, 200, 20))
    this.addPlatform(new Platform(game, 200, 280, 200, 20))
    this.addPlatform(new Platform(game, 300, 160, 200, 20))

    this.addGoal(new Item(game, 900, 200))
  }
}
