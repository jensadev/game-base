Precis som för bilder så måste vi skapa ett nytt objekt innan vi kan  spela / hantera / ladda ljud.Precis

```javascript	
const sound = new Audio()
sound.src = './assets/sounds/ljudfil'
```

När det är gjort så kan vi styra ludet med hjälp av följande metoder:

```javascript
sound.play() // spelar ljudet
sound.pause() // pausar ljudet

sound.currentTime = 0 // sätter ljudet till början
```

För att undvika att spelet ska spela över varandra och ställa till det så sätter vi ljudeffektens timestamp till 0 innan vi börjar spela upp det igen.För
Allt detta gör vi med en ny klass, `Sound`.