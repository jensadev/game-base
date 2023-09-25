För att möjligöra kollision mellan objekt i spelet så behöver vi redigera Game klassen.

Vi behöver iterera över spelets objekt och kolla om de kolliderar med varandra. Om de kolliderar så utför vi något, det kan vara att ta bort fienden eller sätta game over.

### Kollision mellan objekt

För att undersöka om två objekt kolliderar så behöver vi undersöka om deras rektanglar (hittills så består våra objekt i spelet av rektanglar)överlappar varandra. 

```javascript
  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
```

- `return (...)`: Denna del innehåller en retursats som består av flera villkor som utvärderas och sammanfogas med logiska "och" (`&&`) operatorer. Om alla dessa villkor är sanna, kommer funktionen att returnera `true`, vilket indikerar att objekten kolliderar. Annars returnerar den `false`, vilket indikerar att de inte kolliderar.

De enskilda villkoren kontrollerar om:

1. `object1.x` (x-koordinaten för objekt 1) är mindre än `object2.x + object2.width` (x-koordinaten för objekt 2 plus dess bredd). Detta kontrollerar om objekt 1 är till vänster om objekt 2.

2. `object1.x + object1.width` (x-koordinaten för objekt 1 plus dess bredd) är större än `object2.x` (x-koordinaten för objekt 2). Detta kontrollerar om objekt 1 är till höger om objekt 2.

3. `object1.y` (y-koordinaten för objekt 1) är mindre än `object2.y + object2.height` (y-koordinaten för objekt 2 plus dess höjd). Detta kontrollerar om objekt 1 är över objekt 2.

4. `object1.height + object1.y` (y-koordinaten för objekt 1 plus dess höjd) är större än `object2.y` (y-koordinaten för objekt 2). Detta kontrollerar om objekt 1 är under objekt 2.

Om alla dessa villkor är sanna samtidigt, innebär det att objekten överlappar varandra på något sätt, och funktionen returnerar `true`. Annars, om något av villkoren inte är sant, kommer den att returnera `false`, vilket betyder att objekten inte kolliderar.

### Använd checkCollision

Uppdatera koden i spelets update metod där vi itererar över spelets fiender. I denna loop kan vi dels kontrollera om fienden krockar med spelaren, men också iterera över spelarens projektiler för att se om vi träffar fienden.

```javascript
update (deltaTime) {
  ...
  this.enemies.forEach((enemy) => {
    enemy.update(deltaTime)
    if (this.checkCollision(this.player, enemy)) {
      enemy.markedForDeletion = true
    }
    this.player.projectiles.forEach((projectile) => {
      if (this.checkCollision(projectile, enemy)) {
        enemy.markedForDeletion = true
        projectile.markedForDeletion = true
      }
    })
  })
  ...
}
```

- `this.enemies.forEach((enemy) => { ... })`: Här används en forEach-loop för att iterera över varje fiende i listan `enemies` i spelet.

- `enemy.update(deltaTime)`: För varje fiende i listan uppdateras dess position och logik med hjälp av metoden `update` och det förflutna tiden `deltaTime`.

- `if (this.checkCollision(this.player, enemy)) { ... }`: Här kontrolleras om det finns en kollision mellan spelaren (`this.player`) och den aktuella fienden (`enemy`) genom att anropa funktionen `checkCollision`. Om en kollision detekteras markeras fienden för borttagning (`enemy.markedForDeletion = true`). Här kan vi sätta this.gameOver = true om vi vill att spelet ska sluta när spelaren kolliderar med en fiende.

- `this.player.projectiles.forEach((projectile) => { ... })`: Här används en inre forEach-loop för att iterera över varje projektil som tillhör spelaren.

- `if (this.checkCollision(projectile, enemy)) { ... }`: För varje projektil kontrolleras om det finns en kollision med den aktuella fienden. Om en kollision detekteras, markeras både fienden (`enemy.markedForDeletion = true`) och projektilen (`projectile.markedForDeletion = true`) för borttagning. Om en fiende har mer än ett liv så behöver vi här istället minska antalet liv för fienden, vi kan sedan kontrollera om fienden har några liv kvar i dess update metod. Annars ska fienden markeras för borttagning.
