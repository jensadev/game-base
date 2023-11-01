# Sprite animation

Assets för den här delen finns här, [itch.io/kings-and-pigs](https://pixelfrog-assets.itch.io/kings-and-pigs)

För det första exemplet så har jag redigerat bilden. Detta för att underlätta så att animationerna finns i samma fil. Detta kräver dock redigering, att rutorna är lika stora och framförallt att de innehåller lika många frames.

![Kings and Pigs](../src/assets/sprites/Idle%20Run%20(78x58).png)

Bilden importeras sedan och skapas i javascript. Notera att för att skapa en bild i javascript så måste vi anropa Image klassen. Detta för att skapa ett image element.

Redigera `Player.js` och lägg till följande kod:
```diff
+ import spriteImage from './assets/sprites/Idle Run (78x58).png'
```

I konstruktorn.
```diff
+ const image = new Image()
+ image.src = spriteImage
+ this.image = image

+ // sprite animation
+ this.frameX = 0
+this.frameY = 1
+this.maxFrame = 8
+this.fps = 20
+this.timer = 0
+this.interval = 1000 / this.fps
+
+// flip sprite direction
+this.flip = false
```

Dessa egenskaper krävs för att kunna rita ut bilden och att animera den. `frameX` och `frameY` är vilken ruta i bilden som ska ritas ut. `maxFrame` är hur många rutor som finns i bilden. `fps` är hur många frames per sekund som ska ritas ut. `timer` är en timer som räknar upp tills den når `interval`. `interval` är hur ofta vi ska rita ut en ny frame. Timer och fps används för att kunna styra hur snabbt animationen ska spelas upp, så att den är fristående från spelets uppdatering.

## update()

I `update` metoden.
```diff
+  // flip sprite direction
+  if (this.speedX < 0) {
+    this.flip = true
+  } else if (this.speedX > 0) {
+    this.flip = false
+  }

+ // sprite animation update
+ if (this.timer > this.interval) {
+   this.frameX++
+   this.timer = 0
+ } else {
+   this.timer += deltaTime
+ }
+ // reset frameX when it reaches maxFrame
+ if (this.frameX >= this.maxFrame) {
+   this.frameX = 0
+ }
```

Här uppdateras `frameX` och `timer`. `frameX` ökar med 1 varje gång `timer` når `interval`. När `frameX` når `maxFrame` så återställs `frameX` till 0.
För att styra vilken animation som spelas upp så kan vi använda `frameY`. `frameY` är vilken rad i bilden som ska ritas ut. `frameY` är 0-indexerad, så första raden är 0, andra raden är 1 osv.

## draw()

I `draw` metoden så sker en stor förändring för att styra hur bilden ska ritas ut. Dels så byter vi från en solid färg till att rita ut en bild. Sedan så lägger vi till fler parametrar för att kunna styra vilken del av bilden som ska ritas ut. `this.frameX` och `this.frameY` används för att styra vilken ruta i bilden som ska ritas ut. `this.width` och `this.height` används för att styra hur stor del av bilden som ska ritas ut. `this.x` och `this.y` används för att styra var bilden ska ritas ut.

I `draw` metoden.

```diff
+  if (this.flip) {
+    context.save()
+    context.scale(-1, 1)
+  }
+  context.drawImage(
+    this.image,
+    this.frameX * this.width,
+    this.frameY * this.height - 14,
+    this.width,
+    this.height,
+    this.flip ? this.x * -1 - this.width : this.x,
+    this.y,
+    this.width,
+    this.height
+  )
+  context.restore()
```

Notera att 14 här är ett värde som är baserat på bildens storlek för att få fötterna att hamna på rätt ställe. Detta värde kan behöva ändras beroende på hur stor bilden är. Testa dig fram.

## Testa

Byt ut bilden och testa att animera din spelkaraktär. Testa även att ändra på `fps` och `maxFrame` för att se hur det påverkar animationen.