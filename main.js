import './node_modules/modern-css-reset/dist/reset.min.css'
import './src/assets/css/style.css'
import { setup } from './src/setup.js'

document.querySelector('#app').innerHTML = `
  <canvas id="canvas1"></canvas>
  <ul id="hiscore"></ul>
`

setup(document.querySelector('#canvas1'), document.querySelector('#hiscore'))
