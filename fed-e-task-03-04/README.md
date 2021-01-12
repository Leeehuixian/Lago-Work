### 封装Vue.js组件库

##### $attrs / $listeners

* $attrs：把父组件中非prop属性绑定到内部组件，需要禁用inheritAttrs, v-bind="$attrs"接收，注意除了class, style

* $listeners：把父组件中的DOM对象的原生事件绑定到内部组件

  

