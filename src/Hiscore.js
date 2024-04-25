export default class Hiscore {
  constructor(game, element) {
    this.game = game
    this.element = element
  }

  getScore() {
    return localStorage.getItem('hiscore') || 0
  }

  setScore(value) {
    if (value < this.getScore()) {
      return
    }
    localStorage.setItem('hiscore', value)
  }

  draw() {
    const li = document.createElement('li')
    li.textContent = `Hiscore: ${this.getScore()}`
    console.log(this.element, li)
    this.element.appendChild(li)
  }
}