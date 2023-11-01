# Ljud

Precis som för bilder så måste vi skapa ett nytt objekt innan vi kan  spela / hantera / ladda ljud.

Skapa en ny klass för ljud, `Sound.js` och lägg till följande kod:
I dess konstruktor så skapar vi ett nytt ljudobjekt och laddar in ljudfilen.

```javascript
import url from './assets/sounds/ljudfil'

const sound = new Audio()
sound.src = url
```

När det är gjort så kan vi styra ludet med hjälp av följande metoder:

```javascript
sound.play() // spelar ljudet
sound.pause() // pausar ljudet

sound.currentTime = 0 // sätter ljudet till början
```

För att undvika att spelet ska spela över varandra och ställa till det så sätter vi ljudeffektens timestamp till 0 innan vi börjar spela upp det igen.För
Allt detta gör vi med en ny klass, `Sound`.

## Testa

Skapa och lägg till egna ljud i spelet. Det kan vara när en karaktär hoppar, skjuter eller förlorar ett liv.

Du kan även lägga till bakgrundsmusik, flera ljudfiler och format stöds. Testa att lägga till en bakgrundsmusik från en `.mp3` som spelas upp när spelet startar.