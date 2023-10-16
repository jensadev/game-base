Assets för den här delen finns här, [itch.io/kings-and-pigs](https://pixelfrog-assets.itch.io/kings-and-pigs)

För det första exemplet så har jag redigerat bilden. Detta för att underlätta så att animationerna finns i samma fil. Detta kräver dock redigering, att rutorna är lika stora och framförallt att de innehåller lika många frames.

![Kings and Pigs](../src/assets/sprites/Idle%20Run%20(78x58).png)

Bilden importeras sedan och skapas i javascript. Notera att för att skapa en bild i javascript så måste vi anropa Image klassen. Detta för att skapa ett image element.

```javascript
import spriteImage from './assets/sprites/Idle Run (78x58).png'

...
const image = new Image()
image.src = spriteImage
this.image = image
```

# Rita och animera

Flera ny egenskaper behövs i klassens konstruktor.

```javascript
    // sprite animation
    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    // flip sprite direction
    this.flip = false
  }
```

I draw funktionen behöver vi sedan använda dessa.

```javascript
    // draw sprite image
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height - 14,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
```