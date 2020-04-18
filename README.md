# React-Vue-Comparison

This cheat sheet is for someone who already familiar with React.js or Vue.js. It can help us mapping the syntax into another framework.

- [Basic-Component](#basic-component)
- [Prop](#prop)
- [Event-Binding](#event-binding)
- [Custom-Event](#custom-event)
- [State](#state)
- [Change-State](#change-state)
- [Two-Way-Binding(Vue.js only)](#two-way-binding)
- [Compute](#compute)
- [Watch](#watch)
- [Conditional-Rendering](#conditional-rendering)
- [List-Rendering](#list-rendering)
- [Lifecycle](#lifecycle)
- [Error-Handling](#error-handling)

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

#### Function component

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

MyReactComponent.propTypes = {
  name: PropTypes.string,
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

#### Function component

```javascript
function MyReactComponent() {
  const save = () => {
    console.log("save");
  };

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

## Custom-Event

### React.js

```javascript
function MyItem({ item, handleDelete }) {
  return <button onClick={() => handleDelete(item)}>{item.name}</button>;

  /*
   * Apply useCallback hook to prevent generate new function every rendering.
   *
   * const handleClick = useCallback(() => handleDelete(item), [item, handleDelete]);
   *
   * return <button onClick={handleClick}>{item.name}</button>;
  */
}

...

function App() {
  const handleDelete = () => { ... }

  return <MyItem item={...} handleDelete={handleDelete} />
}

```

### Vue.js

```html
<template>
  <button @click="deleteItem()">{{item.name}}</button>
</template>
<script>
  export default {
    name: "my-item",
    props: {
      item: Object,
    },
    methods: {
      deleteItem() {
        this.$emit("delete", this.item);
      },
    },
  };
</script>

...

<template>
  <MyItem :item="item" @delete="handleDelete" />
</template>
<script>
  export default {
    components: {
      MyItem,
    },
    methods: {
      handleDelete(item) { ... }
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

#### Function component

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

#### Function component

```javascript
function MyReactComponent() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
    // setCount(currentCount => currentCount + 1);
  };

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

## Two-Way-Binding

### React.js

_React didn't have two-way binding, so we need to handle the data flow on our own_

```javascript
function MyReactComponent() {
  const [content, setContent] = useState("");

  return (
    <input
      type="text"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
```

### Vue.js

```html
<template>
  <input type="text" v-model="content" />
</template>
<script>
  export default {
    data() {
      return { content: "" };
    },
  };
</script>
```

## Compute

### React.js

_React.js don't have `compute` property, but we can achieve this through react hook easily_

```javascript
function DisplayName({ firstName, lastName }) {
  const displayName = useMemo(() => {
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);

  return <div>{displayName}</div>;
}

...

<DisplayName firstName="Hello" lastName="World" />
```

### Vue.js

```html
<template>
  <div>{{displayName}}</div>
</template>
<script>
  export default {
    name: "display-name",
    props: {
      firstName: String,
      lastName: String,
    },
    computed: {
      displayName: function () {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  };
</script>

...

<DisplayName firstName="Hello" lastName="World" />
```

## Watch

_React.js don't have `watch` property, but we can achieve this through react hook easily_

```javascript
function MyReactComponent() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((currentCount) => currentCount + 1);
  };

  useEffect(() => {
    localStorage.setItem("my_count", newCount);
  }, [count]);

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
    watch: {
      count: function (newCount, oldCount) {
        localStorage.setItem("my_count", newCount);
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

# Lifecycle

### React.js

- http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

#### Class component

```javascript
class MyReactComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {}
  componentDidMount() {}
  shouldComponentUpdate(nextProps, nextState) {}
  getSnapshotBeforeUpdate(prevProps, prevState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}

  render() {
    return <div>Hello World</div>;
  }
}
```

#### Function component

```javascript
function MyReactComponent() {
  // componentDidMount
  useEffect(() => {}, []);


  // componentDidUpdate + componentDidMount
  useEffect(() => {});

  // componentWillUnmount
  useEffect(() => {
    return () => {...}
  }, []);

  // runs synchronously after a render but before the screen is updated
  useLayoutEffect(() => {}, []);

  return <div>Hello World</div>;
}
```

### Vue.js

- https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram

```html
<template>
  <div>Hello World</div>
</template>
<script>
  export default {
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
  };
</script>
```

## Error-Handling

### React.js

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

...

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Vue.js

```javascript
const vm = new Vue({
  data: {
    error: "",
  },
  errorCaptured: function(err, component, details) {
    error = err.toString();
  }
}
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

- https://reactjs.org/docs/getting-started.html
- https://nextjs.org/docs/getting-started
- https://vuejs.org/v2/guide/#Getting-Started
- https://nuxtjs.org/guide/installation
- https://medium.com/myriatek/vue-and-react-side-by-side-55d02b9fb222
- https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-2019-edition-42ba2cab9e56
