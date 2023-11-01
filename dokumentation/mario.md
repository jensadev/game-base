# Plattformar

För att skapa en mario variant så behöver vi kunna skapa plattformar som spelaren och monster kan gå och stå på.

Det här exemplets plattformar är rektanglar som ritas ut med hjälp av `fillRect` och har en bestämd färg.

```javascript
export default class Platform {
  constructor(game, x, y, width, height) {
    this.game = game
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }

  update() {}

  draw(context) {
    context.fillStyle = '#795548'
    context.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      context.fillStyle = 'black'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }
  }
}
```

Klassen innehåller inget nytt på det stora hela. Vi har en konstruktor som tar emot spel objektet, x och y position, bredd och höjd. Vi har en `update` metod som inte gör något och en `draw` metod som ritar ut plattformen. Update metoden kan i ett senare skede användas för att uppdatera plattformen, tex. flytta den eller ändra storlek.

## Create platforms

Med hjälp av klassen kan vi nu skapa plattformar i Game klassen. Vi skapar en array, lista, som vi sedan fyller med plattformar.

```javascript
this.platforms = [
  new Platform(this, 0, this.ground, this.width, 100),
  new Platform(this, this.width - 200, 280, 200, 20),
  new Platform(this, 200, 200, 300, 20),
]
```

## Draw platforms

För att rita ut plattformarna så loopar vi igenom listan och anropar `draw` metoden på varje plattform.

```javascript
this.platforms.forEach((platform) => platform.draw(context))
```

### Collision

För att kolla ifall spelaren och fienden kolliderar med plattformarna så behöver vi kolla ifall deras positioner överlappar. 
Metoden nedan används för att kolla ifall en spelare eller fiende kolliderar med en plattform. Den justerar även objektets position och hastighet så att de inte kan gå igenom plattformen. Sist så kollar den ifall en spelare har gått utanför en plattform och sätter då `grounded` till `false`.

```javascript
checkPlatformCollision(object, platform) {
  if (
    object.y + object.height >= platform.y &&
    object.y < platform.y &&
    object.x + object.width >= platform.x &&
    object.x <= platform.x + platform.width
  ) {
    if (object.grounded && object.y + object.height > platform.y) {
      object.speedY = 0
      object.y = platform.y - object.height
      object.grounded = true
    }
    return true
  } else {
    if (object.grounded && object.y + object.height < platform.y) {
      object.grounded = false
    }
    return false
  }
}
```

- Inuti funktionen finns en stor if-sats som innehåller flera villkor som måste vara sanna för att en kollision ska anses ha inträffat. Dessa villkor kontrollerar följande:

1. `object.y + object.height >= platform.y`: Detta kontrollerar om objektets nedre kant (baserat på dess y-koordinat och höjd) är större än eller lika med plattformens överkant. Detta innebär att objektet måste vara ovanför eller på plattformen i vertikalt läge.

2. `object.y < platform.y`: Detta kontrollerar om objektets överkant är under plattformens överkant. Detta innebär att objektet inte kan vara ovanpå plattformen.

3. `object.x + object.width >= platform.x`: Detta kontrollerar om objektets högra kant (baserat på dess x-koordinat och bredd) är större än eller lika med plattformens vänstra kant. Detta innebär att objektet måste vara till höger om eller överlappande med plattformen i horisontellt läge.

4. `object.x <= platform.x + platform.width`: Detta kontrollerar om objektets vänstra kant är till vänster om eller överlappande med plattformens högra kant i horisontellt läge.

Om alla dessa villkor är sanna samtidigt, innebär det att objektet kolliderar med plattformen. Då kontrolleras om objektet är på marken och om objektets nedre kant är under plattformens överkant. Om detta är sant, innebär det att objektet är på plattformen och att objektet inte kan gå igenom plattformen. Då sätts objektets hastighet till 0 och objektets y-koordinat sätts till plattformens y-koordinat minus objektets höjd. Detta gör att objektet stannar på plattformen och inte kan gå igenom den. Objektets `grounded` sätts också till `true` för att indikera att objektet står på marken.

Annars om objektet är på marken och objektets nedre kant är över plattformens överkant, innebär det att objektet har gått utanför plattformen. Då sätts objektets `grounded` till `false` för att indikera att objektet inte står på marken.

Metoden används sedan i `update` metoden för att kolla ifall spelaren eller fienden kolliderar med en plattform.

```javascript
this.platforms.forEach((platform) => {
  if (this.checkPlatformCollision(this.player, platform)) {
    this.player.speedY = 0
    this.player.y = platform.y - this.player.height
    this.player.grounded = true
  }
  this.enemies.forEach((enemy) => {
    if (this.checkPlatformCollision(enemy, platform)) {
      enemy.speedY = 0
      enemy.y = platform.y - enemy.height
    }
  })
})
```

## Ändringar i Player klassen

För att spelaren ska kunna hoppa så behöver vi lägga till en `jump` metod i Player klassen. Metoden sätter spelarens hastighet till ett negativt värde så att spelaren åker uppåt.

Var noga med att lägga till nya variabler i konstruktorn.

```javascript
if (this.game.keys.includes('ArrowUp') && this.grounded) {
  this.speedY = -this.jumpSpeed
  this.grounded = false
}
```

I `update` metoden så behöver vi även lägga till en if-sats som kollar ifall spelaren är på marken. Om spelaren är på marken så sätts spelarens hastighet till 0. Annars så ökar vi hastigheten med gravitationen.

```javascript
if (this.grounded) {
  this.speedY = 0
} else {
  this.speedY += this.game.gravity
}
```
## Ändringar i Enemy klassen

För att fienden ska falla så behöver vi lägga till en if-sats i `update` metoden som kollar ifall fienden är på marken. Om fienden är på marken så sätts fiendens hastighet till 0. Annars så ökar vi hastigheten med gravitationen.

Precis som för spelarklassen så behöver vi lägga till nya variabler i konstruktorn.

```javascript
if (this.grounded) {
  this.speedY = 0
} else {
  this.speedY += this.game.gravity
}

this.y += this.speedY
```
