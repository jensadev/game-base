import skyImage from './assets/layers/sky_layer.png'
import middleImage from './assets/layers/middle_layer.png'
import groundImage from './assets/layers/ground_layer.png'
import foregroundImage from './assets/layers/foreground_layer.png'
import Layer from './Layer'

export default class Background {
  constructor(game) {
    this.game = game
    const sky = new Image()
    sky.src = skyImage
    this.skyLayer = new Layer(this.game, sky, 1708, 500, 0.2)
    const middle = new Image()
    middle.src = middleImage
    this.middleLayer = new Layer(this.game, middle, 1708, 500, 0.4)
    const ground = new Image()
    ground.src = groundImage
    this.groundLayer = new Layer(this.game, ground, 1708, 500, 0.6)
    const foreground = new Image()
    foreground.src = foregroundImage
    this.foregroundLayer = new Layer(this.game, foreground, 1708, 500, 0.8)
    this.layers = [
      this.skyLayer,
      this.middleLayer,
      this.groundLayer,
      this.foregroundLayer,
    ]
  }

  update() {
    this.layers.forEach((layer) => layer.update())
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context))
  }
}
