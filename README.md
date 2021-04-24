# SWIFTORY

An exploration of micro frontend architecture,
inter-app communication, and hand-crafted langing pages for some of Taylor Swift's most
recent albums. Explore the albums, find artists that contributed to that album and collect their
other work by adding it to your personal Jukebox!

## Demo

[swiftory.ansonlichtfuss.com](https://swiftory.ansonlichtfuss.com)

## Features

- Micro frontend functionality and client side routing supplied by [single-spa](https://single-spa.js.org).
- Built using ReactJS and Svelte.
- Communication between apps using [custom browser events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events).
- Fluid animations and transitions powered by [Framer Motion](https://www.framer.com/motion/).
- Performance optimized through CDN caching (thanks [B2 + Cloudflare](https://help.backblaze.com/hc/en-us/articles/217666928-Using-Backblaze-B2-with-the-Cloudflare-CDN)) and image preloading.
- Root micro frontend app deployed with [Vercel](https://vercel.com) (child app bundles load through the CDN).
- Deduplicated dependencies (`react`, `react-dom`, and `framer-motion`) for less redundant JS downloading.
- Shared `_components` and `_utils` with fully functional Typescript types and autocomplete.
- Browser [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) for hiding splash screens and persisting user selections.

## Run Locally

Clone the project

```bash
  git clone https://github.com/ansonlichtfuss/swiftory
```

Go to the project directory

```bash
  cd swiftory
```

#### In every subfolder except `@types`, run:

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

The above command can be run in the root directory to execute all services simultaneously as well.

## Authors

- [@ansonlichtfuss](https://www.github.com/ansonlichtfuss)
