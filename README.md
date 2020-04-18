# React-Vue-Comparison

---

## Basic Component

### React.js

#### Class component

```javascript
class ComponentName extends React.Component {
  render() {
    return <h1>My Component</h1>;
  }
}
```

#### Functional component

```javascript
function ComponentName() {
  return <h1>My Component</h1>;
}
```

### Vue.js

```javascript
Vue.component("component-name", {
  template: "<h1>My Component</h1>",
});
```

---

## CLI tools

### React.js: create-react-app

```zsh
# https://create-react-app.dev/docs/getting-started/
npx create-react-app react-template
```

### Next.js: create-next-app

```zsh
# https://nextjs.org/blog/create-next-app
npx create-next-app next-template
```

### Vue.js: vue-cli

```zsh
# https://cli.vuejs.org/
yarn global add @vue/cli
vue create vue-template
```

### Nuxt.js: create-nuxt-app

```zsh
# https://github.com/nuxt/create-nuxt-app
npx create-nuxt-app nuxt-template
```

---

## Reference

- https://medium.com/myriatek/vue-and-react-side-by-side-55d02b9fb222
- https://reactjs.org/docs/getting-started.html
- https://nextjs.org/docs/getting-started
- https://vuejs.org/v2/guide/#Getting-Started
- https://nuxtjs.org/guide/installation
