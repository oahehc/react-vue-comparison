# State Management: Redux & Vuex

## Create Store

### Redux: https://redux.js.org/basics/store

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

const store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Vuex: https://vuex.vuejs.org/guide/

```js
const store = new Vuex.Store({
  state: { ... },
  mutations: { ... }
})

...

new Vue({
  el: '#app',
  store,
});
```

## Action

### Redux: https://redux.js.org/basics/actions

```js
const ADD_TODO = 'ADD_TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

### Vuex: https://vuex.vuejs.org/guide/actions.html

```js
const store = new Vuex.Store({
  actions: {
    increment(context) {
      context.commit('increment'); // commit a mutation to trigger state update
    },
  },
});
```

## Async-Action

### Redux(redux-thunk): https://redux.js.org/advanced/async-actions

```js
// apply redux-thunk
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

...

export function fetchPosts() {
  return function (dispatch) {
    dispatch(requestPosts())
    return fetch('xxx')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}
```

### Vuex: https://vuex.vuejs.org/guide/actions.html

```js
actions: {
  async fetchPosts ({ commit }) {
    commit('requestPosts');
    const res = await fetch('xxx');
    commit('receivePosts', res);
  },
}
```

## Reducer-or-Mutation

### Redux(reducer): https://redux.js.org/basics/reducers

```js
const initialState = {
  todos: [],
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false,
          },
        ],
      };

    default:
      return state;
  }
}
```

### Vuex(mutation): https://vuex.vuejs.org/guide/mutations.html

```js
const store = new Vuex.Store({
  mutations: {
    addTodo(state, payload) {
      state.todos = [...state.todos, { text: payload.text, completed: false }];
    },
  },
});
```

## Combine-Reducers-or-Modules

### Redux(combine-reducers): https://redux.js.org/api/combinereducers

```js
import { combineReducers } from 'redux';

const reducers = combineReducers({
  reducerA,
  reducerB,
});

export default reducers;
```

### Vuex(modules): https://vuex.vuejs.org/guide/modules.html

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

## Connect-with-Component

### Redux: https://redux.js.org/basics/usage-with-react

```js
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import TargetComp from '../components/TargetComp';

// state
const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.todos,
  };
};

// action
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTodo: text => {
      dispatch(addTodo(text));
    },
  };
};

const TargetContainer = connect(mapStateToProps, mapDispatchToProps)(TargetComp);

export default TargetContainer;
```

### Vuex

#### state: https://vuex.vuejs.org/guide/state.html

```js
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['count']),
  },
};
```

#### action: https://vuex.vuejs.org/guide/actions.html

```js
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['increment']),
  },
};
```

## Middleware-or-Plugin

### Redux(middleware): https://redux.js.org/advanced/middleware

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
const todoApp = combineReducers(reducers);
const store = createStore(todoApp, applyMiddleware(logger));
```

### Vuex(plugin): https://vuex.vuejs.org/guide/plugins.html

```js
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // compare `prevState` and `nextState`...

    // save state for next mutation
    prevState = nextState
  })
}

const store = new Vuex.Store({
  ...,
  plugins: process.env.NODE_ENV !== 'production' ? [myPluginWithSnapshot] : [],
})
```

## Selector-or-Getter

### Redux(reselect): https://redux.js.org/recipes/computing-derived-data

```js
import { createSelector } from 'reselect'

const getTodos = state => state.todos

export const getDoneTodos = createSelector(
  [getTodos],
  todos.filter(t => t.completed),
)

...

import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { getDoneTodos } from '../selectors'

const mapStateToProps = state => {
  return {
    doneTodos: getDoneTodos(state)
  }
}

const DoneTodoList = connect(mapStateToProps)(TodoList)

export default DoneTodoList
```

### Vuex: https://vuex.vuejs.org/guide/getters.html

```js
const store = new Vuex.Store({
  state: { ... },
  getters: {
    doneTodos: state => {
      return state.todos.filter(t => t.completed)
    }
  }
})

...

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['doneTodos'])
  }
}
```

## DevTools

### Redux

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

### Vuex

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

---

## Reference

- [Redux](https://redux.js.org/introduction/getting-started)
- [React-Redux](https://react-redux.js.org/introduction/quick-start)
- [Reselect](https://github.com/reduxjs/reselect)
- [Vuex](https://vuex.vuejs.org/guide/)
