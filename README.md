# React-Vue-Comparison

This cheat sheet is for someone who already familiar with React.js or Vue.js. It can help us mapping the syntax into another framework.

- [Basic-Component](#basic-component)
- [Prop](#prop)
- [Event-Binding](#event-binding)
- [State](#state)
- [Change-State](#change-state)
- [Conditional-Rendering](#conditional-rendering)
- [List-Rendering](#list-rendering)

---

## Basic-Component

### React.js

#### Class component

```javascript
class MyReactComponent extends React.Component {
  render() {
    return <h1>Hello world</h1>;
  }
}
```

#### Functional component

```javascript
function MyReactComponent() {
  return <h1>Hello world</h1>;
}
```

### Vue.js

```javascript
Vue.component("my-vue-component", {
  template: "<h1>Hello world</h1>",
});
```

## Prop

### React.js

```javascript
function MyReactComponent(props) {
  const { name } = props;

  return <h1>Hello {name}</h1>;
}

...

<MyReactComponent name="world">
```

### Vue.js

```html
<template>
  <h1>Hello {{ name }}</h1>
</template>
<script>
  export default {
    name: "MyVueComponent",
    props: {
      name: String,
    },
  };
</script>

...

<MyVueComponent name="World" />
```

## Event-Binding

### React.js

#### Class component

```javascript
class MyReactComponent extends React.Component {
  save = () => {
    console.log("save");
  };

  render() {
    return <button onClick={this.save}>Save</button>;
  }
}
```

#### Functional component

```javascript
function MyReactComponent() {
  function save() {
    console.log("save");
  }

  return <button onClick={save}>Save</button>;
}
```

### Vue.js

```html
<template>
  <button @click="save()">Save</button>
</template>
<script>
  export default {
    methods: {
      save() {
        console.log("save");
      },
    },
  };
</script>
```

## State

### React.js

#### Class component

```javascript
class MyReactComponent extends React.Component {
  state = {
    name: 'world,
  }
  render() {
    return <h1>Hello { this.state.name }</h1>;
  }
}
```

#### Functional component

```javascript
function MyReactComponent() {
  const [name, setName] = useState("world");

  return <h1>Hello {name}</h1>;
}
```

### Vue.js

```html
<template>
  <h1>Hello {{ name }}</h1>
  <!-- use component state as prop -->
  <my-vue-component :name="name">
</template>
<script>
  export default {
    data() {
      return { name: "world" };
    },
  };
</script>
```

## Change-State

### React.js

#### Class component

```javascript
class MyReactComponent extends React.Component {
  state = {
    count: 0,
  };

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
    // get current state before update to make sure we didn't use the stale value
    // this.setState(currentState => ({ count: currentState.count + 1 }));
  };

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.increaseCount}>Add</button>
      </div>
    );
  }
}
```

#### Functional component

```javascript
function MyReactComponent() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
    // setCount(currentCount => currentCount + 1);
  }

  return (
    <div>
      <span>{count}</span>
      <button onClick={increaseCount}>Add</button>
    </div>
  );
}
```

### Vue.js

```html
<template>
  <div>
    <span>{{count}}</span>
    <button @click="increaseCount()">Add</button>
  </div>
</template>
<script>
  export default {
    data() {
      return { count: 0 };
    },
    methods: {
      increaseCount() {
        this.count = this.count + 1;
      },
    },
  };
</script>
```

## Conditional-Rendering

### React.js

```javascript
function MyReactComponent() {
  const [isLoading, setLoading] = useState(true);

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {isLoading ? <div>is loading</div> : <div>is loaded</div>}
    </div>
  );
}
```

### Vue.js

```html
<template>
  <div>
    <!--v-show: always render but change css base on the condition-->
    <span v-show="loading">Loading...</span>
    <div>
      <div v-if="loading">is loading</div>
      <div v-else>is loaded</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return { loading: true };
    },
  };
</script>
```

## List-Rendering

### React.js

```javascript
function MyReactComponent({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}: {item.desc}
        </li>
      ))}
    </ul>
  );
}
```

### Vue.js

```html
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{item.name}}: {{item.desc}}
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      items: Array,
    },
  };
</script>
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
