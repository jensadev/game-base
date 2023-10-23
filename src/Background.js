import bgImage from './assets/images/bg.png'
import skyImage from './assets/images/sky.png'
import fgImage from './assets/images/fg.png'
import Layer from './Layer'

export default class Background {
  constructor(game) {
    this.game = game
    const sky = new Image()
    sky.src = skyImage
    this.skyLayer = new Layer(this.game, sky, 480, 800, 0)
    const bg = new Image()
    bg.src = bgImage
    this.bgLayer = new Layer(this.game, bg, 1120, 800, 0.2)
    const fg = new Image()
    fg.src = fgImage
    this.fgLayer = new Layer(this.game, fg, 1120, 800, 0.4)

    this.layers = [this.skyLayer, this.bgLayer, this.fgLayer]
  }

  update() {
    this.layers.forEach((layer) => layer.update())
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context))
  }
}
