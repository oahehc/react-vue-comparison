# SSR: Next.js & Nuxt.js

## Assets

### Next.js

```js
/*
|- public/
|-- my-image.png
*/
function MyImage() {
  return <img src="/my-image.png" alt="my image" />;
}
```

### Nuxt.js

#### assets

_By default, Nuxt uses vue-loader, file-loader and url-loader for strong assets serving._

```html
<!--
|- assets/
  |- image.png
-->
<img src="~/assets/image.png" alt="image" />
```

#### static

_automatically served_

```html
<!--
|- static/
  |- image.png
-->
<img src="/image.png" alt="image" />
```

## Basic-Routes

### Next.js

```
|- pages/
  |- index.js        → href="/"
  |- blog/index.js   → href="/blog"
```

### Nuxt.js

```
|- pages/
  |- index.vue       → href="/"
  |- blog/index.vue  → href="/blog"
```

## Dynamic-Routes

### Next.js

```
|- pages/
  |- blog/[slug].js           → href="/blog/:slug" (eg. /blog/hello-world)
  |- [username]/[option].js   → href="/:username/:option" (eg. /foo/settings)
  |- post/[...all].js         → href="/post/*" (eg. /post/2020/id/title)
```

### Nuxt.js

```
|- pages/
  |- blog/[slug].vue         → href="/blog/:slug" (eg. /blog/hello-world)
  |- _username/_option.vue   → href="/:username/:option" (eg. /foo/settings)
```

## Link

### Next.js

```js
import Link from "next/link";

function Home() {
  return (
    <Link href="/">
      <a>Home</a>
    </Link>
  );
}
```

### Nuxt.js

```html
<template>
  <nuxt-link to="/">Home page</nuxt-link>
</template>
```

---

## Reference

- https://nextjs.org/docs/getting-started
- https://nuxtjs.org/guide/installation
