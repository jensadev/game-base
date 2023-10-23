import aurl from './assets/sounds/15_human_dash_1.wav'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = aurl
    this.shootSound = a
  }

  playShootSound() {
    this.shootSound.currentTime = 0
    this.shootSound.play()
  }
}
