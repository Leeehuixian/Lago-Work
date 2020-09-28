import { String } from "core-js"

/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-25 22:07:14
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-17 16:00:17
 * @FilePath: /02-my-vue-router/src/vuerouter/index.js
 * @Description: 
 */
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 1.判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }

    VueRouter.install.installed = true
    // 2.把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3.把创建Vue实例时候传入的router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({ // 让一个对象可响应
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: '#' + this.to // hash & history的区别1
          },
          on: {
            click: this.handlerClick
          },
        }, [this.$slots.default])
      },
      methods: {
        handlerClick (e) {
          // history.pushState({}, '', this.to) // hash & history 的区别2
          window.location.hash = '#' + this.to
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    let self = this
    Vue.component('router-view', {
      render(h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent() {
    // hash & history 的区别3
    // window.addEventListener('popstate', () => {
    //   this.data.current = window.location.pathname 
    // })
    // window.addEventListener('load', this.hashChange.bind(this))
    // window.addEventListener('hashchange', this.hashChange.bind(this))
    window.addEventListener('hashchange', () => {
      if (!window.location.hash) {
        window.location.hash = '#/'
      }
      this.data.current = window.location.hash.substr(1)
    })
  }

  // hashChange() {
  //   if (!window.location.hash) {
  //     window.location.hash = '#/'
  //   }
  //   this.data.current = window.location.hash.substr(1)
  // }
}

/**
 * 模拟实现思路：
 * 1.在router/index.js里面引入vueRouter/index.js模块，并注册路由插件，然后创建router对象
 * 2.在vueRouter/index.js中创建VueRouter类，并创建静态方法-install，这个方法做了如下事情：
 * （1）判断当前插件是否已经安装
 * （2）把vue构造函数记录到全局变量
 * （3）_Vue.mixin: 用混入的方式把创建vue实例时候传入的router对象注入到vue实例上，并调用了初始化init的方法
 * 3.在init方法里面我们做了三件事
 * （1）createRouteMap：遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
 * （2）initComponents: 初始化和router相关的组件
 * （3）initEvent: 监听页面load和hashchange方法，在这个地方有个判断，如果当前页面的hash不存在，则自动加上‘#/’,并加载‘/’的组件
 * 4.在constructor中我们会接收到传过来的参数options并保存在实例中。在这儿有个需要注意的点，我们使用了Vue.observable方法使current变为响应式对象，这样在current变化的时候回重新渲染依赖current变量的组件，如本例中依赖current变量的router-view组件
*/