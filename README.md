# React-Vue-Comparison

This cheat sheet is for someone who already familiar with React.js or Vue.js. It can help us mapping the syntax into another framework.

- React.js vs Vue.js
  - [Render](#render)
  - [Basic-Component](#basic-component)
  - [Prop](#prop)
  - [Event-Binding](#event-binding)
  - [Custom-Event](#custom-event)
  - [State](#state)
  - [Change-State](#change-state)
  - [Two-Way-Binding(Vue.js only)](#two-way-binding)
  - [Compute](#compute)
  - [Watch](#watch)
  - [Children-and-Slot](#children-and-slot)
  - [Render-HTML](#render-html)
  - [Conditional-Rendering](#conditional-rendering)
  - [List-Rendering](#list-rendering)
  - [Render-Props](#render-props)
  - [Lifecycle](#lifecycle)
  - [Error-Handling](#error-handling)
  - [Ref](#ref)
  - [Performance-Optimization](#performance-optimization)
- Next.js vs Nuxt.js
  - [Assets](#assets)
  - [Basic-Routes](#basic-routes)
  - [Dynamic-Routes](#dynamic-routes)
  - [Link](#link)
- [CLI-Tools](#cli-tools)

---

## Render

### React.js

```javascript
ReactDOM.render(<App />, document.getElementById("root"));
```

### Vue.js

```javascript
new Vue({
  render: (h) => h(App),
}).$mount("#root");
```

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

```html
<template>
  <h1>Hello World</h1>
</template>
<script>
  export default {
    name: "MyVueComponent",
  };
</script>
```

## Prop

### React.js

```javascript
function MyReactComponent(props) {
  const { name, mark } = props;

  return <h1>Hello {name}{mark}</h1>;
}

MyReactComponent.propTypes = {
  name: PropTypes.string.isRequired,
  mark: PropTypes.string,
}
MyReactComponent.defaultProps = {
  mark: '!',
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
      name: {
        type: String,
        required: true,
      },
      mark: {
        type: String,
        default: "!",
      },
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

## Children-and-Slot

### React.js

```javascript
function MyReactComponent({ children }) {
  return <div>{children}</div>;
}

...

<MyReactComponent>Hello World</MyReactComponent>
```

### Vue.js

```html
<template>
  <div>
    <slot />
  </div>
</template>
<script>
  export default {
    name: "my-vue-component",
  };
</script>

...

<MyVueComponent>Hello World</MyVueComponent>
```

## Render-HTML

### React.js

```javascript
function MyReactComponent() {
  return <div dangerouslySetInnerHTML={{ __html: "<pre>...</pre>" }} />;
}
```

### Vue.js

```html
<template>
  <div v-html="html"></div>
</template>
<script>
  export default {
    data() {
      return {
        html: "<pre>...</pre>",
      };
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

## Render-Props

### React.js

```javascript
function Modal({children, isOpen}) {
  const [isModalOpen, toggleModalOpen] = useState(isOpen);

  return (
    <div className={isModalOpen ? 'open' : 'close'}>
      {type children === 'function' ? children(toggleModalOpen) : children}
    </div>)
  ;
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}
Modal.defaultProps = {
  isOpen: false,
}

...

<Modal isOpen>
  {(toggleModalOpen) => {
    <div>
      <div>...</div>
      <button onClick={() => toggleModalOpen(false)}>Cancel</button>
    </div>
  }}
</Modal>
```

### Vue.js (slot)

```html
<template>
  <div v-show="isModalOpen">
    <slot v-bind:toggleModal="toggleModalOpen" />
  </div>
</template>
<script>
  export default {
    name: "modal",
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isModalOpen: this.isOpen,
      };
    },
    methods: {
      toggleModalOpen(state) {
        this.isModalOpen = state;
      },
    },
  };
</script>

...

<Modal isOpen>
  <template v-slot="slotProps">
    <div>...</div>
    <button @click="slotProps.toggleModal(false)">Close</button>
  </template>
</Modal>
```

## Lifecycle

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

## Ref

### React.js

#### Class component

```javascript
class AutofocusInput extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    content: "",
  };

  componentDidMount() {
    this.ref.current.focus();
  }

  setContent = (e) => {
    this.setState({ content: e.target.value });
  };

  render() {
    return (
      <input
        ref={this.ref}
        type="text"
        value={this.state.content}
        onChange={this.setContent}
      />
    );
  }
}
```

#### Function component

```javascript
function AutofocusInput() {
  const [content, setContent] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <input
      ref={ref}
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
  <input ref="input" type="text" v-model="content" />
</template>
<script>
  export default {
    name: "autofocus-input",
    data() {
      return { content: "" };
    },
    mounted() {
      this.$refs.input.focus();
    },
  };
</script>
```

## Performance-Optimization

### React.js

#### PureComponent

```javascript
class MyReactComponent extends React.PureComponent {
  ...
}
```

#### shouldComponentUpdate

```javascript
class MyReactComponent extends React.Component {
  shouldComponentUpdate(nextProps) {...}

  ...
}
```

### React.memo

```javascript
export default React.memo(
  MyReactComponent,
  (prevProps, nextProps) => {
    ...
  }
);
```

### useMemo

```javascript
export default function MyReactComponent() {
  return React.useMemo(() => {
    return <div>...</div>;
  }, []);
}
```

### useCallback

```javascript
function MyItem({ item, handleDelete }) {
  const handleClick = useCallback(() => handleDelete(item), [
    item,
    handleDelete,
  ]);

  return <button onClick={handleClick}>{item.name}</button>;
}
```

### Vue.js

#### v:once

```html
<span v-once>This will never change: {{msg}}</span>
```

#### functional component

- https://vuejs.org/v2/guide/render-function.html#Functional-Components

```html
<template functional>
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
```

#### keep-alive component

- https://vuejs.org/v2/api/#keep-alives

```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

---

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

## CLI-Tools

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
- https://dev.to/oahehc/few-tips-to-optimizing-performance-of-react-project-5h25
- https://dev.to/veebuv/5-extremely-easy-ways-to-drastically-improve-your-vuejs-app-s-speed-5k0
