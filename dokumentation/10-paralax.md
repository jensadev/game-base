# Paralax bakgrund

För att skapa en paralax bakgrund kommer vi att jobba med ett par bilder. Varje bild kommer att finnas i ett lager, en Layer klass.
Bakgrunden utgörs sedan av ett antal lager.

## Bilder

Bilderna är placeholders och finns i assets/layers. Storleken är spelets bredd x 2 och höjd, 1708 x 500. Bilderna är i png-format, så att vi kan använda transparens.

## Layer

Layer klassen laddar in en bild och placerar den på en position. Bilden ska sedan kunna flyttas med en viss hastighet. När bilden är utanför skärmen ska den flyttas tillbaka till startpositionen.

## Bakgrund

Bakgrundsklassen innehåller en lista på lager och uppdaterings och ritfunktion för att rita ut lagren.

# Använda bakgrund

För att använda bakgrunden behöver du lägga till den i game klassen.