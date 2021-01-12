### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

* 响应式系统升级
  * Vue 3.0使用Proxy对象重写响应式系统
  * 可以监听动态新增的属性
  * 可以监听删除的属性
  * 可以监听数组的索引和length属性
  * 嵌套属性只在访问某个属性的时候才会递归处理下一级的属性
* 编译优化
  * Vue.js 2.x中通过标记静态根节点，优化diff过程
  * Vue.js 3.0中标记和提升所有的静态节点，diff的时候只需要对比动态节点的内容
    * 引入Fragments（模板中不再需要创建一个根节点，可以直接放文本内容或者同级标签）
    * 静态节点提升
    * Patch flag
    * 缓存事件处理函数，减少不必要的更新操作
* 源码体积优化
  * Vue.js 3.0中移除了一些不常用的API，一定程度上缩小的源码的体积
  * 更好的TreeShaking支持，一些内置的组件如`transtion、keep-alive`和内置指令如`v-model`，都是按需引入的，而3.0中新增的API如果没有使用的话是不会打包的

### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

* Options Api包含一个描述组件选项（`data、methods、props等`）的对象，一个功能需要在不同Vue配置项中定义属性和方法，比价分散。
* Composition API是一组基于函数的API，代码是根据逻辑功能来组织的，一个功能所定义的所有api会放在一起（更加的高内聚、低耦合），提高可读性和可维护性。而且基于函数组合的API可以更好的重用逻辑代码，而Vue 2.X Options API中需要通过Mixins重用逻辑代码，更容易发生命名冲突且关系不清。

### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

* Proxy可以直接监听对象新增的属性
* 可以直接监听对象删除的属性
* 可以监听数组的索引和length属性
* 嵌套属性只在访问某个属性的时候才会递归处理下一级的属性
* Proxy有多达13中拦截方法，不限于`get/set/apply/deleteProperty/has`等，是Object.defineProperty不具备的
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化

### 4、Vue 3.0 在编译方面有哪些优化？

Vue.js 3.0中标记和提升所有的静态节点，diff的时候只需要对比动态节点的内容

* 引入Fragments（模板中不再需要创建一个根节点，可以直接放文本内容或者同级标签）
* 静态节点提升
* Patch flag
* 缓存事件处理函数，减少不必要的更新操作

### 5、Vue.js 3.0 响应式系统的实现原理？

1. Reactive:

* 接收一个参数，判断这个参数是否是对象，不是对象则直接返回，不做响应式处理
* 创建拦截器对象handler，设置get、set、deleteProperty
  * get：收集依赖（track）；返回当前的key的值，如果当前key的值是对象，则递归调用reactive对对象的属性进行响应式处理，如果当前的key的值不是对象，则返回当前key的值
  * set：当新值和老值不相等时，把key的值更新为新值，并触发更新（trigger）
  * deleteProperty：当前对象有这个key，删除这个key并触发更新（trigger）

2. effect：接收一个函数作为参数，作用是：访问响应式对象属性时去收集依赖
3. track：
   * 接收两个参数：target、key
   * 如果没有activeEffect，则说明没有创建effect依赖，直接返回
   * 如果有activeEffect，则去判断WeakMap集合中是否有target属性
     * WeakMap集合中没有 target 属性，则 `set(target, (depsMap = new Map))`
     * WeakMap集合中有 target 属性，则判断 target 属性的 map 的值的 depsMap 中是否有 key 属性
       * depsMap 中没有 key 属性，则`set(key, (dep = new Set()))`
       * depsMap 中有 key 属性，则添加这个 activeEffect

4. trigger
   * 判断 WeakMap 中是否有 target 属性
     * WeakMap 中没有 target 属性，则没有 target 响应的依赖
     * WeakMap 中有 target 属性，则判断 target 属性的 map 中是否有 key属性， 有的话循环触发收集的 effect()

 具体代码如下：

````js
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target,key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      console.log('get', key)
      track(target, key) // track见下文
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        console.log('set', key, value)
        trigger(target, key) // 见下文trigger
      }
      return result
    },
    deleteProperty(target, key) {
      const hasKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hasKey && result) {
        // 触发更新
        console.log('delete', key)
        trigger(target, key) // 见下文trigger
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象的属性， 去收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) { // 收集依赖
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  dep.add(activeEffect)
}

export function trigger(target, key) { // 触发更新
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}
````

