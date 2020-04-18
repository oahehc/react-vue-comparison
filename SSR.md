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

## Fetch-On-Server

### Next.js

#### < Next.js 9.3

##### class component

```js
import fetch from "isomorphic-unfetch";

export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch(`https://.../data`);
    const data = await res.json();

    return { props: { data } };
  }

  render() {
    // Render data...
  }
}
```

##### function component

```js
import fetch from "isomorphic-unfetch";

export default function Page({ data }) {
  // Render data...
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return { props: { data } };
};
```

#### >= Next.js 9.3

```js
import fetch from "isomorphic-unfetch";

function Page({ data }) {
  // Render data...
}

export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return { props: { data } };
}

export default Page;
```

### Nuxt.js

```html
<template>
  <div v-if="$fetchState.error">Something went wrong 😭</div>
  <div v-if="$fetchState.pending">Loading...</div>
  <div v-else>
    <h1>{{ post.title }}</h1>
    <pre>{{ post.body }}</pre>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
  import fetch from "node-fetch";

  export default {
    data() {
      return {
        post: {},
      };
    },
    async fetch() {
      this.post = await this.$http.$get("xxx");
    },
    fetchOnServer: true,
  };
</script>
```

## Layout

### Next.js

`./pages/_app.js`: automatically apply to all pages

```js
export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <MyHeader />
      <Component {...pageProps} />
      <MyFooter />
    </React.Fragment>
  );
}
```

### Nuxt.js

`layouts/with-header-footer.vue`: create layout

```html
<template>
  <div>
    <MyHeader />
    <nuxt />
    <MyFooter />
  </div>
</template>
```

`pages/index.vue`: apply layout

```html
<template>
  <!-- Your template -->
</template>
<script>
  export default {
    layout: "with-header-footer",
  };
</script>
```

---

## Reference

- https://nextjs.org/docs/getting-started
- https://nuxtjs.org/guide/installation
