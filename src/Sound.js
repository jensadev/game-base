export default class Sound {
  constructor(game) {
    this.game = game
    this.music = this.game.loader.getSound('music')
  }

  playShootSound() {
    this.shootSound.currentTime = 0
    this.shootSound.play()
  }

  playMusic() {
    console.log(this.music)
    this.music.currentTime = 0
    this.music.play()
  }
}
