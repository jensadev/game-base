Nu är det dags för att rita ut text och skapa ett gränssnitt för spelet. En stor del av detta kommer att bestå av debug information som kan hjälpa dig i utvecklandet av spelet.

När det gäller enskilda parametrar kopplade till ditt spel så behöver du själv bestämma hur du vill presentera dem. Det är dock viktigt att du presenterar dem på ett sätt som gör det enkelt för dig att se vad som händer i spelet.

Skapa en ny klass, `UserInterface`.

```javascript
export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }
```
Vid det här laget bör du känna igen hur en klass definieras och hur klassens konstruktor används för att skapa ett nytt objekt. 

```javascript
  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'
```

- `draw(context)`: Denna metod används för att rita UI-elementen på skärmen. Den tar ett `context`-objekt som argument, vilket är den ritkontext där texten och andra element kommer att ritas.

- `context.save()`: Här sparar vi den aktuella tillståndet för ritkontexten. Detta gör det möjligt att återställa det senare med `context.restore()`.

- `context.fillStyle = this.color`: Här sätter vi fyllningsfärgen för texten till den färg som är lagrad i `this.color`.

- `context.shadowOffsetX = 2` och `context.shadowOffsetY = 2`: Här ställer vi in en skugga för texten genom att ändra dess offset i x- och y-riktning med värdena 2. Detta ger texten en skuggad effekt. Helt valfritt.

- `context.shadowColor = 'black'`: Vi sätter skuggans färg till svart.

```javascript
    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(
      `Time: ${(this.game.gameTime * 0.001).toFixed(1)}`,
      20,
      100
    )
```

- `context.textAlign = 'left'`: Här ställer vi in textens justering till vänster.

- `context.font = ${this.fontSize}px ${this.fontFamily}`: Vi ställer in textens teckensnitt och storlek baserat på värdena som är lagrade i `this.fontSize` och `this.fontFamily`. Var noga med att använda backticks (`) för att skapa en sträng som innehåller variabler.

- `context.fillText(...)`: Här använder vi `fillText()` för att rita text på skärmen. I detta fall ritar vi spelets tid (`gameTime`) i sekunder och avrundar det till en decimal. Texten ritas på position `(20, 100)` på skärmen.

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

```javascript
    // debug
    if (this.game.debug) {
      // ...
    }

    context.restore()
  }
}
```

- Slutligen, om `this.game.debug` är satt till `true`, kommer en del debug-information att ritas på skärmen. Detta inkluderar information om spelarens position, hastighet och knapptryckningar. Detta används för felsökning av spelet.

### Använda UserInterface

Nu när vi har skapat en klass för att rita ut text på skärmen, måste vi använda den i spelet. Detta görs i `Game`-klassens `draw()`-metod.

```javascript
  draw(context) {
    // ...
    this.userInterface.draw(context)
  }
```

Här anropar vi `draw()`-metoden för `UserInterface`-objektet och skickar med `context`-objektet som argument. Detta gör att `UserInterface` kan rita ut text på skärmen. Notera ordningen du anropar metoderna i. Vad sker om du byter plats på UserInterface och Player?

### Debug information i klasserna

Debug flaggan i game låter oss styra om spelets debug-läge ska visas. Vi kan nu använda det för att visa information om objekt i spelet.

För att använda det i spelarklassen så kan vi göra så att den ritar upp spelarobjektets "hitbox", det vill säga det område som spelaren senare kommer att kollidera med annat med.

`Player.js`
````javascript
  draw(context) {
    // ...
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(this.frameX, this.x, this.y - 5)
    }
  }
```