import layer1Image from './assets/background/background_1.png'
import layer2Image from './assets/background/background_2.png'
import layer3Image from './assets/background/background_3.png'
import layer4Image from './assets/background/background_4.png'
import Layer from './Layer'

export default class Background {
  constructor(game) {
    this.game = game
    const layer1 = new Image()
    layer1.src = layer1Image
    this.layer1 = new Layer(this.game, layer1, 256, 224, 0.2)
    const layer2 = new Image()
    layer2.src = layer2Image
    this.layer2 = new Layer(this.game, layer2, 256, 224, 0.4)
    const layer3 = new Image()
    layer3.src = layer3Image
    this.layer3 = new Layer(this.game, layer3, 256, 224, 0.6)
    const layer4 = new Image()
    layer4.src = layer4Image
    this.layer4 = new Layer(this.game, layer4, 256, 224, 0.8)

    this.layers = [this.layer1, this.layer2, this.layer3, this.layer4]
  }

  update() {
    this.layers.forEach((layer) => layer.update())
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context))
  }
}
