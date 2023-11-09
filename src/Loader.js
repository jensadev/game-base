export default class Loader {
  constructor() {
    this.images = {}
    this.sounds = {}
    this.json = {}

    this.loaded = 0
  }

  loadImages(images) {
    for (let image of images) {
      this.loadImage(image)
    }
  }

  loadImage(image) {
    const img = new Image()
    img.src = image.src
    img.onload = () => {
      this.images[image.name] = img
      this.loaded++
    }
  }

  loadSounds(sounds) {
    for (let sound of sounds) {
      this.loadSound(sound)
    }
  }

  loadSound(sound) {
    const audio = new Audio(sound.src)
    audio.oncanplaythrough = () => {
      this.sounds[sound.name] = audio
      this.loaded++
    }
  }

  loadJSON(json) {
    for (let file of json) {
      this.loadFile(file)
    }
  }

  loadFile(file) {
    fetch(file.src)
      .then((response) => response.json())
      .then((data) => {
        this.json[file.name] = data
        this.loaded++
      })
  }

  onReady(callback) {
    const interval = setInterval(() => {
      if (this.isReady()) {
        callback()
        clearInterval(interval)
      }
    }, 1000 / 60)
  }

  isReady() {
    return this.loaded === 3
  }

  getImages() {
    return this.images
  }

  getSounds() {
    return this.sounds
  }

  getJSON() {
    return this.json
  }
}
