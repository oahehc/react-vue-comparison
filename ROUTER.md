# Router: React-Router & Vue-Router

## Basic-Routing

### React-Router

```js
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

### Vue-Router

```js
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
];
const router = new VueRouter({
  mode: 'history',
  routes,
});
const app = new Vue({ router }).$mount('#app');
```

```html
<div id="app">
  <router-view></router-view>
</div>
```

## Dynamic-Routing

### React-Router

```js
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/contact/:id" component={Contact} />
      </div>
    </BrowserRouter>
  );
}

...

import { useParams } from 'react-router-dom';

function Contact() {
  let { id } = useParams();

  return ...;
}
```

### Vue-Router

```js
const router = new VueRouter({
  mode: 'history',
  routes: [{ path: '/contact/:id', component: Contact }],
});

export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
```

## Nested-Routing

### React-Router

```js
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

...

import { Route } from 'react-router-dom';

const Tacos = ({ match }) => (
  <div>
    {/* here's a nested Route, match.url helps us make a relative path */}
    <Route path={match.url + '/carnitas'} component={Carnitas} />
  </div>
);
```

### Vue-Router

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          path: 'profile',
          component: UserProfile,
        },
        {
          path: 'posts',
          component: UserPosts,
        },
      ],
    },
  ],
});

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
};
```

## Link

### React-Router

```js
<Link
  to={{
    pathname: '/courses',
    search: '?sort=name',
    hash: '#the-hash',
    state: { fromDashboard: true },
  }}
>
  courses
</Link>
```

### Vue-Router

```html
<router-link to="/courses">courses</router-link>
```

## NavLink

NavLink is used to display different style when current URL match to the link.

### React-Router

```js
<NavLink to="/react" activeClassName="react">
  React
</NavLink>
```

### Vue-Router

`router-link` automatically gets the .router-link-active class when its target route is matched.

```html
<router-link to="/vue">vue</router-link>
```

## Get-Location

### React-Router

#### Function component

```js
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return ...;
}
```

#### Class component

```js
import { withRouter } from "react-router";

class App extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    const { location } = this.props;

    return ...;
  }
}
export default withRouter(App);
```

### Vue-Router

```js
export default {
  computed: {
    path() {
      return this.$route.path;
    },
    params() {
      return this.$route.params;
    },
    query() {
      return this.$route.query;
    },
    hash() {
      return this.$route.hash;
    },
    fullPath() {
      return this.$route.fullPath;
    },
  },
};
```

## Push

### React-Router

```js
import { useHistory } from 'react-router-dom';

function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push('/home');
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

### Vue-Router

```js
export default {
  methods: {
    toHome() {
      this.$router.push('/home');
    },
    toUser(id) {
      this.$router.push({ name: 'user', params: { userId: id } });
    },
    toRegister(id) {
      // /register?plan=private
      this.$router.push({ path: 'register', query: { plan: 'private' } });
    },
  },
};
```

## Replace

replacing the current entry instead of push a new entry onto the history stack.

### React-Router

```js
<Link to="/courses" replace />;

// or

const history = useHistory();

function handleClick() {
  history.replace('/courses');
}
```

### Vue-Router

```html
<router-link :to="/courses" replace />
```

or

```js
export default {
  methods: {
    toHome() {
      this.$router.replace('/home');
    },
  },
};
```

## Redirect

### React-Router

```html
<Redirect to="/login" />
<Redirect from="/invoices" to="/invoices/dashboard" />
// push a new entry onto the history instead of replacing the current one.
<Redirect push to="/somewhere/else" />
```

### Vue-Router

```js
const router = new VueRouter({
  routes: [{ path: '/a', redirect: { name: 'foo' } }],
});
```

## Event

### React-Router

#### Function component

```js
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = this.props.history.listen(...);
    return () => unlisten();
  }, [])

  return ...;
}
```

#### Class component

```js
import { withRouter } from "react-router";

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(...);
  }

  componentWillUnmount() {
    if (this.unlisten && typeof this.unlisten === 'function') {
      this.unlisten();
    }
  }

  render() {
    return ...;
  }
}
export default withRouter(App);
```

### Vue-Router

#### global

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => { ... })
router.afterEach((to, from) => { ... })
```

#### by route

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => { ... }
    }
  ]
})
```

### by component

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) { ... },
  beforeRouteUpdate (to, from, next) { ... },
  beforeRouteLeave (to, from, next) { ... },
}
```

## Scroll

### React-Router

Because browsers are starting to handle the `default case` and apps have varying scrolling needs, `React-Router` don’t ship with default scroll management.  
_https://reacttraining.com/react-router/web/guides/scroll-restoration_

```js
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

### Vue-Router

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
```

## Lazy-Loading-and-Code-Splitting

_If you are using Babel, you will need to add the [syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/) plugin so that Babel can properly parse the syntax._

### React-Router

_https://github.com/gregberge/loadable-components_

```js
import loadable from '@loadable/component';

const LoadableComponent = loadable(() => import('./Dashboard.js'), {
  fallback: <Loading />,
});
```

### Vue-Router

```js
const Foo = () => import('./Foo.vue');

const router = new VueRouter({
  routes: [{ path: '/foo', component: Foo }],
});
```
