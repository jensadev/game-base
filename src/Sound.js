import backgroundAudio from './assets/sounds/songtember19_5_2.mp3'

export default class Sound {
  constructor(game) {
    this.game = game
    const music = new Audio()
    music.src = backgroundAudio
    this.music = music
  }

  playShootSound() {
    this.shootSound.currentTime = 0
    this.shootSound.play()
  }

  playBackgroundMusic() {
    this.music.currentTime = 0
    this.music.play()
  }
}
