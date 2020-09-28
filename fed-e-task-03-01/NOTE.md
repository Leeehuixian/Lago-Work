##  Vue.js基础回顾

### Vue语法和概念

* 插值表达式
* 指令
* 计算属性和侦听器
* Class 和 Style 绑定
* 条件渲染/列表渲染
* 表单输入绑定
* 组件
* 插槽
* 插件
* 混入mixin
* 深入响应式原理
* 不同构建版本的Vue



### Vue Router实现原理

#### Hash模式

* URL中#后面的内容作为路径地址
* 监听hashchange事件
* 根据当前路由地址找到对应组件重新渲染

#### History模式

* 通过history.pushState()方法改变地址栏
* 监听popstate事件（注意：调用history的push、replace方法不会触发popstate事件，在点击浏览器的前进、后退按钮，或者back，forward）
* 根据当前路由地址找到对应组件重新渲染



### Vue的构建版本

* 运行时版： 不支持template模板，需要打包的时候提前编译

* 完整版：包含运行时和编译器，体积比运行时版大10k左右，程序运行的时候把模板转换成render函数

* vue-cli创建项目默认使用的是运行时版

  切换成完整时版本的办法：

  修改vue-cli的配置，只需要在项目的根目录下创建vue.config.js，

  ````javascript
  module.exports = {
    runtimeCompiler: true // 是否使用包含运行时编译器的Vue构建版本。设置为true后你就可以在Vue组件使用template选项了，但是这会让你的应用额外增加10kb左右
  }
  ````

  

### Vue的响应式原理

* 数据响应式
  * 数据模型仅仅是普通的JavaScript对象， 而当我们修改数据时， 视图会进行更新，避免了繁琐的DOM操作，提高开发效率
* 双向绑定
  * 数据改变，视图改变；视图改变，数据也随之改变
  * 我们可以使用v-mode在表单元素上创建双向数据绑定
* 数据驱动是Vue最独特的特性之一
  * 开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图

**Vue2.X数据响应式核心原理基于Object.defineProperty()实现**

**Vue3.X数据响应式核心原理基于Proxy实现**

* 直接监听对象，而非属性，在把多个属性转化成getter/setter的时候不需要循环

* ES6中新增，IE不支持，性能由浏览器优化, 比defineProperty性能好

  ```` javascript
  let vm = new Proxy(data, {
    // 执行代理行为的函数
    // 当访问vm的成员会执行
    get(target, key) {
      return target[key]
    },
    // 当设置 vm 的成员会执行
    set (target, key, newValue) {
      if (target[key] === newValue) {
        return
      }
      target[key] = newValue
      document.querySelector('#app').textContent = target[key]
    }
  })
  ````



### 发布/订阅模式

概念：我们假定，存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行，这就叫做“发布/订阅”模式（publish-subscribe pattern）

```` javascript
// 事件触发器
class EventEmitter {
  constructor () {
    // { 'click': [fn1, fn2], 'change': [fn] }
    this.subs = Object.create(null)
  }
 
  // 注册事件
  $on (eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }
  
  // 触发事件
  $emit (eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach( handler => {
        handler()
      })
    }
  }
}

// 测试
let em = new EventEmitter()
em.$on('click', () => {
  console.log('click1')
})

em.$on('click', () => {
  console.log('click2')
})

em.$emit('click')
````



### 观察者模式

* 观察者（订阅者）-Watcher
  * Update(): 当事件发生试，具体要做的事情

* 目标（发布者）-Dep
  * subs数组：存储所有的观察者
  * addSub()：添加观察者
  * notify()：当事件发生，调用所有观察者的update()方法

* 没有事件中心

  ````javascript
  // 发布者-目标
  class Dep() {
    constructor () {
      // 记录所有的订阅者
      this.subs = []
    }
    
    addSub (sub) {
      if (sub && sub.update) {
        this.subs.push(sub)
      }
    }
    
    notify () {
      this.subs.forEach(sub => {
        sub.update()
      })
    }
  }
  // 订阅者-观察者
  class Watcher {
    update() {
      console.log('update')
    }
  }
  
  // 测试
  let dep = new Dep()
  let watcher = new Watcher()
  dep.addSub(watcher)
  dep.notify()
  ````

  

* 总结：观察者模式 & 发布/订阅模式的区别
  * **观察者模式**是由具体目标调度，比如当事件触发，Dep就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的；
  * **发布/订阅模式**由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在



### 模拟Vue响应式原理-分析

* Vue
  * 功能
    * 负责接收初始化的参数（选项）
    * 负责把data中的属性注入到Vue实例中，转换成getter/setter
    * 负责调用observer 监听 data 中的所有属性的变化
    * 负责调用compiler 解析指令/插值表达式

* Observer
  * 功能
    * 负责把data 选项中的属性转换成响应式数据
    * data 中的某个属性也是对象，把该属性转换成响应式数据
    * 数据变化通知

* Compiler
  * 功能
    * 负责编译模板，解析指令/插值表达式
    * 负责页面的首次渲染
    * 当数据变化后重新渲染视图

* Dep

  * 功能

    * 收集依赖，添加观察者（watcher）

    * 通知所有观察者

      

* Watcher

  * 功能

    * 当数据变化触发依赖，dep通知所有的Wather实例更新视图

    * 自身实例化的时候往dep对象中添加自己

      **程序中依赖数据的地方都需要创建Watcher对象**

      

### 虚拟DOM

* Virtual DOM（虚拟DOM），是由普通的JS对象来描述DOM对象， 因为不是真实的DOM对象，所以叫Virtual DOM。创建虚拟DOM的开销比创建真实DOM要小很多

  虚拟DOM描述真实DOM，示例

  ````javascript
  {
    $el: 'div',
    data: {},
    children: undefined,
    text: 'Hello Virtual DOM',
    elm: undefined,
    key: undefined
  }
  ````



* 为什么要使用虚拟DOM：

  * 手动操作DOM比较麻烦，还需要考虑浏览器的兼容性问题，虽然有jQuery等简化DOM操作，但是随着项目的复杂DOM操作负责提升

  * 为了简化DOM的复杂操作于是提出了各种MVVM框架，MVVM框架解决了视图和状态的同步问题

  * 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是Virtual DOM出现了

  * Virtual DOM的好处是挡状态改变时不需要立即更新DOM，只要创建一个虚拟树来描述DOM，Virtual DOM内部将弄清楚如何有效（diff）的更新DOM

    * 参考github上virtaul-dom的描述

      * 虚拟DOM可以维护程序的状态，跟踪上一次的状态

      * 通过比较前后两次状态的差异更新真实DOM

        

* 虚拟DOM的作用
  * 维护视图和状态的关系
  * 复杂视图的情况下提升渲染性能
  * 除了渲染DOM以外，还可以实现SSR（Nuxt.js/Next.js）、原生应用（Weex/React Native）、小程序（mpvue/uni-app）等



* Virtual DOM库

  * Snabbdom（Vue2.x内部使用的Virtual DOM就是改造的Snabbdom，最快的Virtaul DOM之一）

  * virtual-dom(最早的)

    

* snabbdom模块的使用步骤
  * 导入需要的模块
  * init()中注册模块
  * 使用h()函数的第二个参数传入模块需要的数据（对象），其他参数往后移



* Snabbdom的核心

  * 使用h() 函数创建JavaScript 对象（VNode）描述真实DOM

  * init() 设置模块，创建patch

  * patch() 比较新旧两个VNode，把变化的内容更新到真实DOM树上

    

* 如何学习源码

  * 先宏观了解

  * 带着目标看源码

  * 看源码的过程要不求甚解，围绕着目标进行阅读和理解

  * 调试，尝试写一些demo，加深理解

  * 在阅读源码以前可以看些别人写的文章，有个大概的认识，帮助理解源码

    

* 函数重载：**参数个数** 或者**类型**不同的函数，JavaScript中没有重载的概念，TypeScript中有重载，不过重载的实现还是通过代码调整参数



* 高阶函数的好处：

  

