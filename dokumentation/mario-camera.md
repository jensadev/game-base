Här händer det väldigt mycket och allt har inte med kameran att göra. Vi kommer att gå igenom det som har med kameran att göra och sedan förklara resten.

Målet för den här delen är att skapa en kamera som följer spelaren, vi kallar det för en kamera, men det är bara ett sätt för oss att kontrollera vilken del av spelet som ska ritas ut.

För att skapa en kamera så behöver vi först skapa en klass för den. Vi skapar en fil som heter `Camera.js` i mappen `src` och lägger till följande kod:

```javascript
export default class Camera {
  constructor(game, x, y, minX = 0, minY = 0, lerpFactor = 0.1) {
    this.game = game
    this.x = x
    this.y = y
    this.width = this.game.width
    this.height = this.game.height
    this.minX = minX
    this.minY = minY
    this.lerpFactor = lerpFactor
  }

  update(player) {
    const halfWidth = this.width / 2
    const halfHeight = this.height / 2
    const maxX = this.game.level.width

    // calculate the target position for the camera
    let targetX = Math.min(Math.max(player.x - halfWidth, this.minX), maxX)
    // let targetY = Math.min(Math.max(player.y - halfHeight, this.minY), maxY)

    // let targetX = player.x - halfWidth
    let targetY = player.y - halfHeight

    // smoothly move the camera towards the target position using lerp
    this.x += (targetX - this.x) * this.lerpFactor
    this.y += (targetY - this.y) * this.lerpFactor
  }

  apply(context) {
    context.save()
    context.translate(-this.x, -this.y)
  }

  reset(context) {
    context.restore()
  }
}
```

Vid det här laget bör du ha koll på vad en konstruktor gör, notera att konstruktorn tar emot ett spel objekt, x och y position, minX och minY position och en lerpFactor. Vi sätter några världen till default värden, dessa värden kommer att användas för att begränsa kamerans rörelse.

Lerp är en förkortning av linear interpolation, vilket betyder linjär interpolation. Det är ett sätt att flytta en punkt från en position till en annan position stegvis. Detta är ett sätt att göra kamerarörelsen mjukare.

## Flytt världen och kameran

För att flytta kamera, eller snarare flytta världen efter kameran så behöver vi skapa två metoder. `apply` och `reset`. Dessa metoder kommer att användas för att flytta världen.

```javascript
apply(context) {
  context.save()
  context.translate(-this.x, -this.y)
}

reset(context) {
  context.restore()
}
```

Dessa två funktioner anropas i `Game.js` i `draw` metoden. Vi anropar `apply` innan vi ritar ut världen och `reset` efter att vi har ritat ut världen.

Vi anropar det efter att `ui` ritas ut, för att vi vill att `ui` ska vara fast på skärmen.

```javascript
  draw(context) {
    this.ui.draw(context)
    this.camera.apply(context)
    this.level.draw(context)
    this.player.draw(context, this.camera.x, this.camera.y)
    this.enemies.forEach((enemy) =>
      enemy.draw(context, this.camera.x, this.camera.y)
    )
    this.camera.reset(context)
  }
```

## 