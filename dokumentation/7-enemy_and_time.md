I det här steget ska vi skapa en fiende-klass. Enemy klassen ska enbart tjäna som ett interface för att skapa fiender. Vi kommer alltså inte använda Enemy direkt utan vi kommer använda nyckelordet extends för att utöka klassen.

Vi kommer sedan titta på att timea events med hjälp av deltaTime och update funktionen för att spawna nya fiender.

I spelets huvudklass kommer vi också att kalla på både update och draw metoden för fienderna. Fiender kommer att sparas i en lista i Game klassen.

### Enemy klassen

```javascript
export default class Enemy {
  constructor(game) {
    this.game = game
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.markedForDeletion = false
  }
```

- `constructor(game)`: Konstruktorn sätter upp initiala egenskaper för fienden, Här är det viktiga att ha koll på att det finns en flagga (`markedForDeletion`) som används för att markera om fienden ska tas bort senare, precis som för projektilerna.

```javascript
  update() {
    this.x += this.speedX
    if (this.x < 0) this.markedForDeletion = true
  }
```

- `update() `: Denna metod används för att uppdatera fiendens logik och position. I detta fall ökar vi x-koordinaten (`this.x`) med `speedX` (en egenskap som saknas i koden) för att få fienden att röra sig åt höger. Om fienden går utanför vänsterkanten av skärmen, markeras den för borttagning genom att sätta `markedForDeletion` till `true`. Notera att `speedX` behöver vara definierad någonstans i koden för att detta ska fungera korrekt.

```javascript
  draw(context) {
    context.fillStyle = '#0f0'
    context.fillRect(this.x, this.y, this.width, this.height)
```

- `draw(context)`: Denna metod används för att rita fienden på skärmen. Vi sätter fyllningsfärgen till grönt (`'#0f0'`) och ritar en rektangel med fiendens position (`this.x` och `this.y`), bredd och höjd (som behöver definieras i den klass som använder Enemy).

```javascript
    if (this.game.debug) {
      // ...
    }
  }
}
```

- Slutligen, om `this.game.debug` är satt till `true`, ritas extra debug-information på skärmen.

### Använda Enemy, Slime

För att skapa en faktiskt fiende så används Enemy klassen som en mall. Vi kommer att skapa en ny klass som heter Slime som ärver från Enemy. Detta gör vi genom att använda nyckelordet extends.

```javascript
import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = this.game.width
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
    this.speedX = Math.random() * -1.5 - 0.5
    this.lives = 2
  }
}
```

Här används spelets storlek samt ett slumptal för att ange positionen för Slimes. Vi sätter också en hastighet, liv och lite annat.
Notera att vi använder `super(game)`, detta är för att anropa Enemy konstruktorn och sätta upp alla egenskaper som Enemy har.

### Spawna fiender

För att lägga till Slimes till spelet så behöver vi skapa en lista i Game klassen som håller alla fiender. Vi behöver också skapa en funktion som skapar nya fiender och lägger till dem i listan.

```javascript
export default class Game {
  constructor() {
    // ...
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
  }
```

- `this.enemies = []`: Här skapar vi en lista som kommer att hålla alla fiender.

- `this.enemyTimer = 0`: Här skapar vi en variabel som kommer att användas för att bestämma när nya fiender ska skapas.

- `this.enemyInterval = 1000`: Här skapar vi en variabel som kommer att användas för att bestämma hur ofta nya fiender ska skapas.

```javascript
  update(deltaTime) {
    // ...
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy()
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
  }
```

- `update(deltaTime)`: Här har vi lagt till en if-sats som kollar om det är dags att skapa en ny fiende. Om det är det så anropas `addEnemy()` och `enemyTimer` sätts till 0. Annars så ökar vi `enemyTimer` med `deltaTime`.

```javascript
  addEnemy() {
    this.enemies.push(new Slime(this))
  }
```

- `addEnemy()`: Här skapar vi en ny Slime och lägger till den i listan med fiender.

Så långt har vi skapat den logik som lägger till fiender i spelet.


### Uppdatera och rita fiender

För att uppdatera och rita fiender så behöver vi lägga till lite kod i Game klassen.

```javascript
  update(deltaTime) {
    // ...
    this.enemies.forEach((enemy) => enemy.update(deltaTime))
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }
```

- `update(deltaTime)`: Här anropar vi `update()` för varje fiende i listan med fiender. Vi filtrerar också listan med fiender för att ta bort de som är markerade för borttagning.

```javascript
  draw(context) {
    // ...
    this.enemies.forEach((enemy) => enemy.draw(context))
  }
```

- `draw(context)`: Här anropar vi `draw()` för varje fiende i listan med fiender.

Nu ska vi kunna se fiender i spelet, de spawnar en ny varje sekund och de åker fram över skärmen. De försvinner när de åker utanför vänsterkanten av skärmen. Du kan kontrollera att de försvinner genom att console.logga `this.enemies.length` i spelets `update()`.

Prova att lägga till en debug-text i `UserInterface` som visar antalet fiender som visas på skärmen.