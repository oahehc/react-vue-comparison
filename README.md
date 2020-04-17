# React-Vue-Comparison

---

```javascript
Vue.component("component-name", {
  template: "<h1>My Component</h1>",
});
```

```javascript
class ComponentName extends React.Component {
  render() {
    return <h1>My Component</h1>;
  }
}
```

<style>
  th {
    text-align: left;
  }
  td {
    vertical-align: text-top;
  }
</style>
<table valign="top">
  <tr>
    <th>React.js</th>
    <th>Vue.js</th>
  </tr>
  <tr>
    <td>
      <pre>
class ComponentName extends React.Component{
  render(){
    return (<span>My Component</span>);
  }
}</pre>
    </td>
    <td>
      <pre>
Vue.component('component-name', {
  template: '<span>My Component</span>'
});</pre>
    </td>
  </tr>
</table>
---

## Reference

- https://medium.com/myriatek/vue-and-react-side-by-side-55d02b9fb222
- https://reactjs.org/docs/getting-started.html
- https://nextjs.org/docs/getting-started
- https://vuejs.org/v2/guide/#Getting-Started
- https://nuxtjs.org/guide/installation
