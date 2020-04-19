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

_getInitialProps can only be used in the default export of every page_

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

function Page({ data }) {
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

## Error-Page

### Next.js

`pages/_error.js`

```js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
```

### Nuxt.js

`layouts/error.vue`

```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ["error"],
    layout: "blog", // you can set a custom layout for the error page
  };
</script>
```

## Meta-Tag

### Next.js

```js
import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}
```

### Nuxt.js

```html
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: "Hello World!",
      };
    },
    head() {
      return {
        title: this.title,
        meta: [
          // To avoid duplicated meta tags when used in child component, set up an unique identifier with the hid key
          {
            hid: "description",
            name: "description",
            content: "My custom description",
          },
        ],
      };
    },
  };
</script>
```

## Context

### Next.js

_getInitialProps can only be used in the default export of every page_

```js
function Page({ data }) {
  // Render data...
}

Page.getInitialProps = async (context) => {
  const { pathname, query, asPath, req, res, err } = context;
  // pathname - Current route. That is the path of the page in /pages
  // query - Query string section of URL parsed as an object
  // asPath - String of the actual path (including the query) shown in the browser
  // req - HTTP request object (server only)
  // res - HTTP response object (server only)
  // err - Error object if any error is encountered during the rendering

  return { props: { project: "next" } };
};
```

### Nuxt.js

```js
export default {
  asyncData(context) {
    // Universal keys
    const {
      app,
      store,
      route,
      params,
      query,
      env,
      isDev,
      isHMR,
      redirect,
      error,
    } = context;
    // Server-side
    if (process.server) {
      const { req, res, beforeNuxtRender } = context;
    }
    // Client-side
    if (process.client) {
      const { from, nuxtState } = context;
    }

    return { project: "nuxt" };
  },
};
```

---

## Reference

- [Next.js](https://nextjs.org/docs/getting-started)
- [Nuxt.js](https://nuxtjs.org/guide/installation)
