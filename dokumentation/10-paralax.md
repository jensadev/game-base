# Paralax bakgrund

För att skapa en paralax bakgrund kommer vi att jobba med ett par bilder. Varje bild kommer att finnas i ett lager, en Layer klass.
Bakgrunden utgörs sedan av ett antal lager.

## Bilder

Bilderna är placeholders och finns i assets/layers. Storleken är spelets bredd x 2 och höjd, 1708 x 500. Bilderna är i png-format, så att vi kan använda transparens.

## Layer

Layer klassen laddar in en bild och placerar den på en position. Bilden ska sedan kunna flyttas med en viss hastighet. När bilden är utanför skärmen ska den flyttas tillbaka till startpositionen.

Klassen i sig är inget nytt och ny bör förstå upplägget. En konstruktor sätter egenskaperna, sedan skapas en update och en draw funktion.

```javascript
  update() {
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x -= this.game.speed * this.speedModifier
  }
  ```
  
Update metoden sköter bakgrundens scroll utifrån lagrets speedModifier. När sedan bakgrunden är utanför skärmen flyttas den tillbaka till startpositionen.

## Bakgrund

Bakgrundsklassen innehåller en lista på lager och uppdaterings och ritfunktion för att rita ut lagren.

Bilderna importeras, precis som bilden för sprite animationen behöver vi skapa en ny Image, `new Image()` för att kunna ladda in bilden med javascript. Efter det sätts bildens källa och sedan kan den användas.

Varje bild används sedan till ett lager för att kunna sätta storlek och scroll speed.

```javascript
import Layer from './Layer'
import skyImage from './assets/layers/sky_layer.png'

export default class Background {
  constructor(game) {
    this.game = game
    const sky = new Image()
    sky.src = skyImage
    this.skyLayer = new Layer(this.game, sky, 1708, 500, 0.2)
    this.layers = [
      this.skyLayer    ]
  }
}
```

# Använda bakgrund

För att använda bakgrunden behöver du lägga till den i game klassen. Gör som tidigare och importera filen i din `Game` klass. I konstruktorn skapar du sedan en ny instans av bakgrunden.

```javascript
import Background from './Background'
```
```javascript
this.background = new Background(this)
```

I update och draw funktionerna anropar du sedan bakgrundens update och draw funktioner.
