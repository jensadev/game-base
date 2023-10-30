export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
    this.mouseDown = false

    window.addEventListener('keydown', (event) => {
      // console.log(event.key)
      if (
        (event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (event.key === 'o') {
        this.game.debug = !this.game.debug
      }
      if (event.key === 'p') {
        this.game.pause = !this.game.pause
      }
    })
    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', () => {
      this.mouseDown = true
    })

    window.addEventListener('mouseup', () => {
      this.mouseDown = false
    })
  }
}
