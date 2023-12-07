# Hosting

Med vite behöver vi köra bygg-scriptet för att bygga sidan så att vi kan köra den. När ni har gjort det lokalt med `num run dev` så bygger vite och startar en dev server åt er, men för att hosta behöver vi göra lite annorlunda.

## Bygga sidan

För att bygga sidan kör vi `npm run build` och det kommer att skapa en `dist` mapp med allt som behövs för att hosta sidan. Det går då att ladda upp dist mappen på till exempel GitHub Pages eller Netlify och hosta den så. Klart.

## GitHub Actions

För att hosta på GitHub pages så kan vi använda GitHub Actions. Det är ett sätt att automatisera saker på GitHub. Vi kan till exempel köra ett script varje gång vi pushar till GitHub. Det är precis det vi vill göra. Vi vill bygga sidan och ladda upp den till GitHub Pages varje gång vi pushar till GitHub.

Konfigurationsfilen är hämtad från [vitejs.dev](https://vitejs.dev/guide/static-deploy.html#github-pages)

För att göra det så behöver vi skapa en fil i `.github/workflows` som heter `main.yml`. I den filen skriver vi följande:

```yml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['main']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload dist repository
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

För att allt ska fungera så behöver vi även berätta för vite att vi vill ha en `base` path. Det gör vi i `vite.config.js` filen. Vi lägger till följande:

```js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/NAMNETPÅDITTREPO/',
})
```

På GitHub Pages konfigurationen så behöver du välja GitHub Actions som källa.

Nu är det bara att pusha till GitHub och det kommer att byggas och laddas upp till GitHub Pages. Det kan ta någon minut innan det är klart.