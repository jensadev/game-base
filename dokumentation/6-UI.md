# User interface

Nu är det dags för att rita ut text och skapa ett gränssnitt för spelet. En stor del av detta kommer att bestå av debug information som kan hjälpa dig i utvecklandet av spelet.

När det gäller enskilda parametrar kopplade till ditt spel så behöver du själv bestämma hur du vill presentera dem. Det är dock viktigt att du presenterar dem på ett sätt som gör det enkelt för dig att se vad som händer i spelet.

## Skapa en ny klass, `UserInterface`

```javascript
export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(
      `Time: ${(this.game.gameTime * 0.001).toFixed(1)}`,
      20,
      100
    )

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `speedX: ${this.game.player.speedX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `speedY: ${this.game.player.speedY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
```

### Klass och konstruktor

Vid det här laget bör du känna igen hur en klass definieras och hur klassens konstruktor används för att skapa ett nytt objekt. 

```javascript
export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }
```

### Metoder

```javascript
  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(
      `Time: ${(this.game.gameTime * 0.001).toFixed(1)}`,
      20,
      100
    )
  }
```

- `draw(context)`: Denna metod används för att rita UI-elementen på skärmen. Den tar ett `context`-objekt som argument, vilket är den ritkontext där texten och andra element kommer att ritas.

- `context.save()`: Här sparar vi den aktuella tillståndet för ritkontexten. Detta gör det möjligt att återställa det senare med `context.restore()`. Vi gör det här för att vi bara vill att UI-elementen ska påverka ritkontexten och inte andra element i spelet.

- `context.fillStyle = this.color`: Här sätter vi fyllningsfärgen för texten till den färg som är lagrad i `this.color`.

- `context.shadowOffsetX = 2` och `context.shadowOffsetY = 2`: Här ställer vi in en skugga för texten genom att ändra dess offset i x- och y-riktning med värdena 2. Detta ger texten en skuggad effekt. Helt valfritt.

- `context.shadowColor = 'black'`: Vi sätter skuggans färg till svart.

- `context.textAlign = 'left'`: Här ställer vi in textens justering till vänster.

- `context.font = ${this.fontSize}px ${this.fontFamily}`: Vi ställer in textens teckensnitt och storlek baserat på värdena som är lagrade i `this.fontSize` och `this.fontFamily`. Var noga med att använda backticks (`) för att skapa en sträng som innehåller variabler.

- `context.fillText(...)`: Här använder vi `fillText()` för att rita text på skärmen. I detta fall ritar vi spelets tid (`gameTime`) i sekunder och avrundar det till en decimal. Texten ritas på position `(20, 100)` på skärmen.

### Styra text med villkor

```javascript
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }
```

- Här kontrollerar vi om spelet är över (`this.game.gameOver`). Om det är det, ställer vi in textens justering till centrerad (`'center'`) och ändrar textens storlek till 50px. Sedan ritar vi texten "Game over" i mitten av skärmen, något ovanför mitten.

### Restore

Sist i draw metoden så måste vi kalla på `context.restore()` för att återställa ritkontexten till det tillstånd som var innan vi började rita UI-elementen.

```javascript
    context.restore()
```

### Debug läge

För att få spelet att visa oss viktig information som kan hjälpa oss i utvecklingen samt att felsöka och förstå vad som sker i spelet så kan vi skapa ett debugläge. Detta gör vi genom att lägga till en flagga i Game klassen som vi sedan kan använda för att styra vad som ska visas i spelet.

```javascript
    // debug
    if (this.game.debug) {
      // ...
    }
```

Om `this.game.debug` är satt till `true`, kommer en del debug-information att ritas på skärmen. Detta inkluderar information om spelarens position, hastighet och knapptryckningar. Detta används för felsökning av spelet.

### Använda UserInterface

Nu när vi har skapat en klass för att rita ut text på skärmen, måste vi använda den i spelet. Detta görs i `Game`-klassens `draw()`-metod.

Redigera `Game.js`
```diff
+ import UserInterface from './UserInterface.js'
export default class Game {
  constructor(width, height) {
    ...
+    this.userInterface = new UserInterface(this)
  }
  draw(context) {
    ...
+    this.userInterface.draw(context)
  }
}
```
Klassen och filen behöver först importeras. Sedan behöver vi skapa en ny instans av klassen i konstruktorn.

Sedan kan vi anropa `draw()`-metoden för `UserInterface`-objektet i spelets `draw()`-metod och skickar med `context`-objektet som argument. Detta gör att `UserInterface` kan rita ut text på skärmen. Notera ordningen du anropar metoderna i. Vad sker om du byter plats på UserInterface och Player?

### Debug information i klasserna

Debug flaggan i game låter oss styra om spelets debug-läge ska visas. Vi kan nu använda det för att visa information om objekt i spelet.

För att använda det i spelarklassen så kan vi göra så att den ritar upp spelarobjektets "hitbox", det vill säga det område som spelaren senare kommer att kollidera med annat med.

Redigera `Player.js`
```diff
  draw(context) {
    ...
+    if (this.game.debug) {
+      context.strokeRect(this.x, this.y, this.width, this.height)
+      context.fillStyle = 'black'
+      context.font = '12px Arial'
+      context.fillText(this.frameX, this.x, this.y - 5)
+    }
  }
```

## Testa

Nu bör du se texten "Time: 0.0" i spelet. Om du väntar en stund kommer tiden att öka. Om du trycker på "d" på tangentbordet kommer debug information att visas. Om du trycker på "d" igen kommer den att försvinna.

Lägg sedan till egen information och undersök. Kanske text för din reload / ammo?
