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
