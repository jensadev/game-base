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

## 9.5 - Ställa in antalet frames i animationen

För att animera så flyttar vi vad vi ritar upp för att skapa frames, eller bildrutor. Vi styr vilken animation vi ritar ut med `frameY` egenskapen. Max antalet rutor att rita ut styrs av variabeln `maxFrames`. 
Men när en sprite inte har lika många rutor för alla animationerna så stöter vi på problem, saknas det rutor så ritas inget ut (testa att i steg 9 ändra maxFrames till 11, det kommer då bli några tomma rutor i run animationen).

Vi kan lösa detta genom att spara antalet frames som hör till animationen i en variabel och sedan modifera maxFrames.

`Player.js`
```javascript
constructor() {
  ...
  this.animationFps = 20
  this.animationTimer = 0
  this.animationInterval = 1000 / this.animationFps
  this.idleFrames = 10
  this.runFrames = 8
}
```

Sedan använder vi dessa värden och justerar maxFrames när vi byter animation.

`Player.js`
```javascript
update() {
  ...
  // play run or idle animation
  if (this.speedX !== 0) {
    this.frameY = 1
    this.maxFrame = this.runFrames
  } else {
    this.frameY = 0
    this.maxFrame = this.idleFrames
  }
}
```

Nu har vi möjligheten att styra hur många frames som ska spelas upp i varje animation. 

### Fler bilder

Det kan vara så att bilderna ni har inte finns samlade i ett stort spritesheet, utan animationerna laddas från olika filer. Då kan vi byta source bild när vi byter animation, ni behöver alltså skapa olika image element för er sprite och sedan växla mellan dessa.