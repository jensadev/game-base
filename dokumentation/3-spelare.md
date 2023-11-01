# Spelare

I det här steget ska vi skapa en klass som hanterar all logik och information kopplad till spelaren.

### Steg 1: Skapa klassen Player

```javascript
export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 64
    this.x = 50
    this.y = 100

    this.speedX = 1
    this.speedY = 0
  }

  update(deltaTime) {
    this.x += this.speedX
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
```

Skapa en ny fil i mappen `src` och döp den till `Player.js`. I den här filen ska vi skapa en klass som heter `Player`. Klassen ska ha en konstruktor som tar emot en en referens till spelobjektet.

### Klassens egenskaper och metoder

```javascript
export default class Player {}
```

- `export default class Player {}`: Här definieras en klass med namnet `Player`. Klassen används för att beskriva egenskaper och beteenden för en spelare i spelet. `export default` gör klassen tillgänglig för att importeras och användas i andra delar av koden.

### Konstruktor

```javascript
constructor(game) {
  this.game = game;
  this.width = 32;
  this.height = 64;
  this.x = 50;
  this.y = 100;
}
```

- `constructor(game)`: Detta är konstruktorn för klassen. Konstruktorn körs när en ny instans skapas. Den tar emot ett argument `game`, som är en referens till Game klassen där spelaren existerar. Inuti konstruktorn sätts initiala egenskaper för spelaren, bredd (`width`), höjd (`height`), x- och y-koordinater (`x` och `y`).

### Update och draw metoder

```javascript
update(deltaTime) {}
```

- `update(deltaTime) {}`: Detta är en metod som används för att uppdatera spelarens logik.

```javascript
draw(context) {
  context.fillStyle = '#f00';
  context.fillRect(this.x, this.y, this.width, this.height);
}
```

- `draw(context)`: Denna metod används för att rita spelaren på skärmen. Inuti metoden sätts färgen på spelaren till röd (`'#f00'`) och sedan ritar den en rektangel (`context.fillRect()`) på angivna x- och y-koordinater (`this.x` och `this.y`) med den specificerade bredden och höjden (`this.width` och `this.height`).

### Använda klassen Player

För att kunna använda Player klassen i spelet behöver vi skapa en instans i Game klassen. Detta gör du genom att lägga till följande kod i Game klassens konstruktor. Utöver det så kallar vi nu på `draw()` metoden för spelaren i `draw()` metoden för Game klassen.

```diff
+ import Player from './Player.js'
export default class Game {
  constructor(width, height) {
    ...
+    this.player = new Player(this)
  }
  ...
  draw(context) {
+    this.player.draw(context)
  }
}
```

## Flytta spelaren

Detta är ett test du kan prova för att se att allt fungerar. Spelaren kommer flytta sig baserat på den hastighet som är satt i Player klassen. Detta utförs av `update()` metoden i Player klassen. `update()` metoden kallas på från Game klassen.

### Ändra i Player klassen

```diff
  constructor(game) {
    ...
+    this.speedX = 1
+    this.speedY = 0
  }
  update(deltaTime) {
+    this.x += this.speedX
  }
```

- `this.speedX = 1`: Här sätts en hastighet för spelaren i x-led. Hastigheten är satt till 1 pixlar per bildruta.

- `this.speedY = 0`: Här sätts en hastighet för spelaren i y-led. Hastigheten är satt till 0 pixlar per bildruta.

- `this.x += this.speedX`: Här uppdateras spelarens x-koordinat (`this.x`) med hastigheten i x-led (`this.speedX`).

### Ändra i Game klassen

För att ändringarna i Player klassen ska få effekt behöver vi kalla på Player klassens update metod från Game loopen.

```diff
  update(deltaTime) {
+    this.player.update(deltaTime)
  }
```

## Testa

* Byt färg på spelaren
  * Ange spelarens färg i konstruktor och skapa en `this.color` variabel för att lagra färgen.
* Ändra hastigheten på spelaren
* Ändra spelarens startposition
* Ändra spelarens storlek