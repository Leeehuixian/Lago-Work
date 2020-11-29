## Vuex状态管理

### 状态管理包含以下几个部分：

* state，驱动应用的数据源
* view，以声明方式将`state`映射到视图
* actions，响应在`view`上的用户输入导致的状态变化

### 什么是Vuex

* Vuex是专门为Vue.js设计的状态管理库

* 它采用集中式的方式存储需要共享的数据

* 从使用角度，它就是一个javascript库

* 它的作用是进行状态管理，解决复杂组件通信，数据共享

  #### 使用场景：

  * 多个视图依赖同一状态

  * 来自不同视图的行为需要变更同一状态

    例如购物车



## 服务端渲染

### SPA单页面应用的优缺点

优点：

* 用户体验好
* 开发效率高
* 渲染性能好
* 可维护性好
* ...

缺点：

* 首屏渲染时间长

  SPA使用JavaScript在客户端生成HTML来呈现内容，用户需要等待客户端JS解析完成才能看到页面，这就使得首屏加载事件变长，从而影响用户体验；

* 不利于SEO

  当搜索引擎爬取网站HTML文件时，单页面应用的HTML没有内容，因为它需要通过客户端JS解析执行才能生成网页内容，而且当前的主流搜索引擎对这一部分内容的抓取还不是很好。

  

### 什么是渲染

* 把数据+模板拼接到一起

  例如对于我们前端开发者来说最常见的一种场景就是：请求后端接口数据，然后将数据通过模板绑定语法绑定到页面中，最终呈现给用户。这个过程就是我们这里所指的渲染。**渲染的本质就是字符串的解析替换**

  

### 传统的服务端渲染（TODO：工作流程绘图）

这种渲染模式在今天看来是不合理的或者说是不先进的，因为网页越来越复杂的情况下，这种模式存在很多明显的不足：

* 应用的前后端部分完全耦合在一起，在前后端协同开发方面会有非常大的阻力；

* 前端没有足够的发挥空间，无法充分里利用现在的前端生态下的一些更优秀的方案；

* 由于内容都是在服务端动态生成的，服务端的压力比较大；

* 相比当前流行的SPA应用来说，用户体验一般；

* 在网页应用并不复杂的情况下，这种方式也是可取的；

  

### 客户端渲染（TODO：工作流程绘图）

Ajax技术可以使得客户端动态获取数据变为可能，前后端的分工更加明确，【后端】负责数据处理，【前端】负责页面渲染，这种分离模式大大提高了开发效率和可维护性；



### 现代化的服务端渲染（同构渲染）（TODO：工作流程绘图）

【服务端渲染】 + 【客户端渲染】

* 基于React、Vue等框架，客户端渲染和服务器端渲染的结合
  * 在服务端执行一次，用于实现服务器端渲染（首屏直出）
  * 在客户端在执行一次，用于接管页面交互

* **核心解决SEO和首屏渲染慢的问题** 
* 拥有传统服务端渲染的优点，也有客户端渲染的优点

工作流程：

* 客户端发起请求
* 服务端渲染首屏内容 + 生成客户端SPA相关资源
* 服务端将生成的首屏资源发送给客户端
* 客户端直接展示服务端渲染好的首屏内容
* 首屏中的SPA相关资源执行之后会激活客户端Vue
* 之后客户端所有的交互都由客户端处理

同构渲染的问题：

* 开发条件所限
* 涉及构建设置和部署的更多要求
* 更多的服务器端负载



## Nuxt.js基础

### Nuxt.js介绍

​	[官方文档](https://www.nuxtjs.cn/)

* Nuxt,js是一个基于Vue.js的服务端渲染应用框架，他可以帮助我们轻松的实现同构应用；

* Nuxt.js主要关注的是应用的UI渲染

* 可以基于它初始化新项目的基础结构代码，或者在已有Node.js项目中使用Nuxt.js

* Nuxt.js预设了利用Vue.js开发服务端渲染的应用所需的各种配置

  特性：

* 强大的路由功能，支持异步数据
* ES2015+语法支持
* 打包和压缩JS和CSS
* 本地开发支持热加载
* 集成ESLint
* 支持各种样式预处理器：SASS、LESS、Stylus等等

### Nuxt.js异步数据-asyncData方法

* 基本用法
  * 它会将`asyncData`返回的数据融合组件`data`方法返回数据一并给组件
  * 调用实际：服务端渲染期间和客户端路由更新之前
* 注意事项
  * 只能在页面组件中使用
  * 没有this，因为它是组件初始化之前被调用的



### Nuxt.js案例

##### 创建项目：

* mkdir  realword-nuxt.js

* npm init -y

* npm i nuxt

* 配置启动脚本: 

  ````javascript
  // package.json
  "scripts": {
    "dev": "nuxt"
  },
  ````

* 创建pages目录，配置初始页面

##### 布局组件：

pages/layout/index.vue

**不要忘记设置子路由出口：<nuxt-child />**

##### 自定义路由规则：

src/nuxt.config.js

````javascript
module.exports = {
  router: {
    extendRoutes(routes, resolve) { // 自定义路由规则
      routes.splice(0) // 清空 Nuxt.js 基于 pages 目录默认生成的路由规则表
      routes.push(...[ 
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
						path: '', // 默认子路由
            name: 'home',
            component: resolve(__dirname, 'pages/home/'),
          ]
        }
      ])
    }
  }
}
````



##### 登录/注册

* 计算属性区分登录or注册

  ````javascript
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  }
  ````



##### 导航高亮

* 修改路由配置中组件激活类名

````javascript
module.exports = {
  router: {
    linkActiveClass: 'active-link' // 保持与样式表中的类名一直
  }
}
````

* 精确匹配（避免包含的父路由组件也会携带激活类名）

  给首页的导航添加 exact 属性

  ````javascript
  <nuxt-link to="/" exact>Home</nuxt-link>
  ````



##### 封装请求模块

安装：npm i axios

创建：src/utils/request.js

````javascript
import axios from 'axios'

const request = axios.creat({
  baseURL: 'https//conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default request
````



##### 封装请求方法（方便维护）

创建：src/api/user.js

````javascript
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
````



##### 错误信息捕获

````javascript
try {
  const { data } = await({
    user: this.user
  })
} catch (err) {
  console.dir(err)
  this.errors = err.response.data.errors
}
````

````html
// 错误信息遍历
<ul class="err0r-messages">
  <template
    v-for="(messages, field) in errors"
  >
  	<li
        v-for="(message, index) in messages"
        :key="index"
    >{{ field }}{{ message }}</li>
  </template>
</ul>
````



##### 同构渲染存储登录状态

[文档中的相关案例](https://www.nuxtjs.cn/examples/auth-external-jwt)

1.将token存储到vuex中，方便共享

2.同时还需要存储到cookie中，为了前后端可以共用

````javascript
//login.vue
const Cookie = process.client ? require('js-cookie') : undefined // 仅客户端才加载js-cookie包
export default {
	middleware: 'notAuthenticated',
  methods: {
    postLogin () {
      setTimeout(() => {
        const auth = {
          auth: 'someStringGotFromApiService'
        }
        // 存储到容器为了方便共享
        this.$store.commit('setAuth', 'auth')
        // 把登录状态存到 Cookie 中, 必须，因为token需要客户端和服务端共用，而不能进行本地存储
        Cookie.set('auth', auth)
      }, 1000)
    }
  }
}
````

````javascript
// store/index.js
const cookieparser = process.server ? required('cookieparser') : undefined // 把cookie解析成字符串
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    auth: null
  }
}

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  }
}

export const actions = {
  // 这个特殊的action 会在服务端渲染期间自动调用
  // 作用： 初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.header.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    
    // 提交mutation 修改 state状态
    commit('setAuth', auth)
  }
}
````



##### 同构渲染中使用路由中间件来处理页面的访问权限

中间件：每个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称（middleware/auth.js 将成为 auth 中间件）

````javascript
// middleware/auth.js
export default function ({ store, redirect }) {
  // 如果没有登录就跳转登录页面
  if (!store.state.auth) {
    return redirect('/login')
  }
}
// 要对哪个页面进行权限管理就在哪个页面组件中添加middleware属性指向定义的中间件
// pages/editor/index.vue
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'auth',
  name: 'EditorIndex'
}
````



##### 页码的处理

````javascript
// pages/home/index
export default {
  name: 'HomeIndex',
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1) // query中获取查询页数
    const limit = 2
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      page
    }
  },
  // 默认情况下，query的改变不会调用asyncData方法，如果要监听这个行为，页面组件的watchQuery属性监听参数
  watchQuery: ['page'], // 监听所有参数设置为true
  computed: {
    totalPage () { // 总页数
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
}
````



##### 优化并行异步任务

````javascript
const [ articleRes, tagRes ] = await Promise.all([
  getArticles({
    limit,
    offset: (page - 1) * limit
  }),
  getTags()
])

const { articles, articlesCount } = articleRes.data
const { tags } = tagRes.data
````



##### 首页统一设置用户Token

1.axios请求拦截器

2.Nuxt.js插件：通过插件机制获取到上下文对象（query,  params, req, res, app, store...）

````javascript
// plugins/request.js
export const request = axios.creat({
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    // 发送请求经过这里
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authoriztion = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 如果请求失败（此时请求还没发送出去）就会进入这里
    return Promise.reject(error)
  })
}
````



##### 发布时间格式化

Day.js + 过滤器：对字符串进行相同规则的处理 + Nuxt.js插件

````javascript
// plugins/dayjs.js
import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
````



##### 文章详情-把Markdown转为HTML

markdown-it把markdown格式的字符串转换成HTML标签

v-html渲染文章内容



##### 文章详情-设置页面meta优化SEO

Nuxt.js视图-HTML头部-个性化特定页面的 Meta 标签

````javascript
// pages/article/index.vue
export default {
  name: 'ArticleIndex',
  head () {
    return {
      title: `${this.article.title} -RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
````



##### 发布部署

1.打包

````javascript
// package.json增加两个script
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "generate": "nuxt generate" // 用于静态网点的部署，不需要可以删除
}
````

命令列表：

| 命令          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| nuxt          | 启动一个热加载的web服务（开发模式）localhost:3000            |
| nuxt build    | 利用webpack编译应用，压缩JS和CSS资源（发布用）               |
| nuxt start    | 以生产模式启动一个web服务器（需要先执行nuxt build）          |
| nuxt generate | 编译应用，并依据路由配置生成对应的HTML文件（用于静态站点的部署） |

2、最简单的部署方式

* 配置Host + Port

  ````javascript
  // nuxt.config.js中增加server配置Host + Port
  module.export = {
    ...
    server: {
      host: '0.0.0.0', // 默认是localhost只能本地访问，部署到生产环境服务器需要修改为'0.0.0.0'，监听所有网卡地址，使得外网可访问
      port: 3000 // 根据需要更改
    }
  }
  ````

* 压缩发布包

  发布包需要包含的文件：.nuxt文件夹，static文件夹，nuxt.config.js，package.json，package-lock.json

* 把发布包上传服务端

* 解压

* 安装依赖

* 启动服务

  



