# 模块化开发



## 模块化演变过程

* Stage1-文件划分方式

  一个文件放在一个独立的文件中，script引入

  缺点：

  1. 污染全局作用域
  2. 命名冲突
  3. 无法管理模块依赖关系
  4. 完全依赖约定

* Stage2-命名空间

  减少命名冲突，没有解决模块依赖关系

* Stage3-IIFE立即执行函数



## 模块化标准规范

### CommonJS规范（Nodejs提出的标准）

* 一个文件就是一个模块
* 每个模块都有单独的作用域
* 通过module.exports导出成员
* 通过require函数载入模块

不适用于浏览器端，因为CommonJS是以同步模式加载模块，在浏览器端使用效率低下，为浏览器端专门制定了AMD（Asynchronous Module Definition）规范——异步模块定义规范

AMD的缺点：

* AMD使用起来相对复杂
* 模块JS文件请求频繁

### 模块化的最佳实践-ES Modules

CommonJS in Node.js

ES Modules in Browers——ES2015（ES6）定义的新的最新的模块化系统，存在兼容问题，但是当前绝大多数浏览器已经开始支持，相对于AMD是从语言层面解决了模块化更为完善



## ES Modules

### 基本特性

* 自动采用严格模式，忽略‘use strict’

* 每个ESM模块都是单独的私有作用域

* ESM是通过CORS取请求外部JS模块的

* ESM的script标签会延迟执行脚本

  ````js
  // 通过给script标签添加 type = module 的属性，就可以以 ES Module 的标准执行其中的JS代码了
  <script type="module">
    console.log('this is es module')
  </script>
  ````



### ES Modules 导入导出

````js
// ./module.js
const foo = 'es modules'
export { foo }

// ./app.js
import { foo } from './module.js'
console.log(foo) // => es modules
````

注意事项：

* export {} 和 import {} 是特定的语法，不可以理解为export的是一个字面量对象，import是对导入的对象进行结构赋值
* export 导出的是变量的引用关系，import引入的也是变量的引用关系，而不是将对象进行了复制操作
* 外部导入一个模块的成员是只读的，不可以进行修改

import的用法：

(1).import的文件的路径必须有完整的文件拓展名、文件的相对路径的./不能省略、可以只用绝对路径或者完整的url

````js
import { name } from './module' // 错误
import { name } from './module.js' // 正确

import { lowercase } from './utils' // 错误
import { lowercase } from './utils/index.js' // 正确

import { name } from 'module.js' // 错误
import { name } from './module.js' // 正确，相对路径

import { name } from '/04-import/module.js' // 绝对路径
import { name } from 'http://localhost:3000/04-import/module.js' // 完整的url
````

(2).只是需要执行模块，而不提取具体的模块成员

````js
import {} from './module.js'
// 可以简写为
import './module.js'
````

(3).导入的模块成员比较多，可以用*提取

````js
import * as mod from './module.js'
// 模块的所有成员都会被导入作为mod对象的属性
````

(4).动态的导入模块

```js
// import全局函数
import('./module.js').then(function(module){
  console.log(module)
})
```

(5).同时导入默认成员和具名成员

````js
// app.js
import { name, age, default as title} from './module.js'
// 可以简写为
import title, { name, age } from './module.js'

// ./module.js
var name = 'jack'
var age = 18

export { name, age }
export default 'default export'
````



# Webpack打包

模块化的问题：

* ES Modules存在环境兼容问题

* 模块文件过多，网络请求频繁

* 所有的前端资源都需要模块化

  

前端模块打包工具亟待解决的问题：

* 新特性代码的编译

* 模块化JavaScript打包

* 支持不同类型的资源模块

  

模块打包工具概述：

Webpack的特性：

* 模块打包器，把零散的JavaScript打包到一个文件中，打包过程中有兼容问题的代码可以借助，模块加载器进行编译转换

* 代码拆分，支持将应用中的所有的代码按照需要进行打包，而不必担心将所有模块打包到一起导致文件很大，我们可以把应用初次运行需要的代码打包到一起，在程序运行过程中再按照需要异步的加载模块，从而实现增量的或者渐进式的加载模块

* 资源模块，支持模块化的方式载入任意资源文件，如：样式文件也可以通过import的形式载入

打包工具解决的是前端整体的模块化，并不单指JavaScript模块化



Webpack的安装&使用:

```js
yarn init
yarn add webpack webpack-cli --dev
yarn webpack // 打包
```

Webpack配置文件:

````js
const path = require('path')

// webpack.config.js
module.exports = {
  mode: 'development', // 工作模式
  entry: './src/main.js', // 输入文件
  output: { // 输出文件
    filename: 'bundle.js', // 输出文件名称
    path: path.join(__dirname, 'output') // 输出文件路径
  }
}

// 4.0新增工作模式：yarn webpack --mode production/development/none,可以在配置文件中通过mode属性来指定
````

````js
// 资源模块加载
// webpack内部的loader只能处理js文件，处理其他的文件如样式文件需要安装相应的loader，如css-loader，style-loader
// yarn add css-loader style-loader --dev
// 安装过后在配置文件中添加相应的配置，
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /.css$/, //匹配的文件路径
        use: [// 执行的时候从后往前执行
          'style-loader' 
          'css-loader'
        ]
      }
    ]
  }
}
// Loader是webpack的核心特性，借助Loader就可以加载任何类型的资源
````

````js
// 导入资源模块
// js文件作为打包的入口，也是程序的运行入口，JavaScript驱动整个前端应用，在js中以import的形式导入css等文件
````

webpack的思想：根据代码的需要动态导入资源，优点：

* 逻辑合理，JS确实需要这些资源文件
* 确保上线资源不缺失，都是必要的

````js
// 文件资源加载器：file-loader
// 对于图片、字体等文件资源，无法通过js的方式来表示，这一类的资源我们需要用到文件资源加载器：file-loader
// yarn add file-loader --dev
// 安装过后，需要在webpack配置文件中，对png文件添加加载规则配置
module.exports = {
  ...
  output: { // 输出文件
    ...
    publicPath: 'dist/' // 配置打包后的资源文件的路径，不然图片资源可能是404！！！
  }
  module: {
    rules: [
      {
        test: /.png$/,
        use: 'file-loader'
      }
    ]
  }
}

// 除了file-loader以copy物理文件的形式进行文件资源的加载，以Data URLs和url-loader的形式进行文件资源加载也非常常见
// Data URLs是一种特殊的url协议，可以直接用来表示一个文件：
// data:[<mediatype>][;base64],<data>
// 协议，媒体类型和编码，文件内容
// 例如：data:text/html;charset=UTF-8,<h1>html content</h1> // html文件类型的内容，编码是UTF-8，内容是包含h1标签的html代码
// 其他图片、字体等无法转换成字符串的文件，可以用base64编码，然后以base64编码的结果及字符串来表示文件内容，例如：data:image/png;base64,iVBORwOKGgoAAAANSUhE...SuQmcc
// 通过Data URLs我们就可以以代码的形式表示任意类型的文件了，但是需要借助url-loader加载器
// yarn add url-loader --dev
// 安装过后，将上面file-loader的配置改为url-loader，再次执行打包命令，图片资源文件不会再被打包生成到dist目录下了，而是被url-loader转换成了Data URLs的嵌入代码中，再被导出
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /.png$/,
        use: 'url-loader'
      }
    ]
  }
}
// 好处：减少网络请求，适合体积比较小的资源
// 最佳实践：
// 小文件使用Data URLs,减少请求次数
// 大文件单独提取存放，提高加载速度
// 最佳实践的配置：
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10kB,10kB以内的文件会被转换成Data URLs嵌入代码中，超过10kB的文件还是会交给file-loader处理，单独提取存放，需要注意的是：不要忘记安装file-loader
          }
        }
      }
    ]
  }
}
````

Webpack常用加载器的分类：

* 编译转换类：css-loader
* 文件操作类：file-loader
* 代码检查类：eslint-loader

Webpack模块加载的方式：

* 遵循ES Modules标准的import声明

* 遵循CommonJS标准的require函数

* 遵循AMD标准的define函数require函数

* 样式代码中的@import指令和url函数

* HTML代码中图片标签的src属性

  前三种标准尽量不要混用

Webpack核心工作原理：

Loader机制是Webpack的核心，没有Loader，Webpack就没法处理各种各样的资源文件，仅仅相当于一个合并工具；

Loder负责资源文件从输入到输出的转换，对于同一个资源可以一次使用多个Loader

### 插件机制

插件机制是Webpack的另一个核心特性，插件增强Webpack自动化能力，Loader专注实现资源模块加载，Plugin解决其他自动化工作，eg：清除dist目录、拷贝静态文件至输出目录，压缩输出代码

常用插件：

* 自动清除输出目录的插：clean-webpack-plugin

* 自动生成html文件的插件：html-webpack-plugin

* 自动copy文件到打包目录的插件：copy-webpack-plugin

  ````js
  yarn add clean-webpack-plugin --dev // 安装
  yarn add html-webpack-plugin --dev
  yarn add copy-webpack-plugin --dev
  // webpack.config.js
  const { cleanWebpackPlugin } = require('clean-webpack-plugin') // 导入
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  module.exports = {
    ...
    plugins: [ // 配置
      new CleanWebpackPlugin(),
      // 用于自动生成index.html
      new HtmlWebpackPlugin({
        title: 'webpack-device-sample',
        meta: {
          viewport: 'width=device-width'
        },
        template: './src/index.html' // 模板文件
      }),
      // 用于生成about.html
      new HtmlWebpackPlugin({
        filename: 'about.html'
      }),
      new CopyWebpackPlugin([
        'public'
      ])
    ]
  }
  yarn webpack // 执行打包命令，dist目录下的文件会先被清空，然后放入本次打包后的文件
  ````

插件总结：

需求-关键词-搜索：在官网可以搜索需要的插件

相比于Loader，Plugin拥有更宽的能力范围， Plugin通过钩子机制实现

webpack的插件要求是一个函数或者是一个包含apply方法的对象

插件：通过在生命周期的钩子中挂载函数实现扩展

### 增强Webpack开发体验

#### 一、实现自动编译-watch工作模式

监听文件变化，自动重新打包

````js
yarn webpack --watch
````

#### 二、自动刷新浏览器-Webpack Dev Server

集成「自动编译」和『自动刷新浏览器』等功能

````js
yarn add webpack-dev-server --dev
yarn webpack-dev-server // 运行命令，实现打包&监视文件的变化自动编译，注意webpack-dev-server并不会直接把打包的文件生成到dist目录，而是放在了内存里，这样减少了磁盘的写入读取操作，提高了开发效率
yarn webpack-dev-server --open // 添加open选项，实现在自动唤起浏览器打开项目的运行地址，并且当文件发生变化后，自动刷新浏览器
````

静态资源访问：

Dev Server默认只会server打包输出文件，其他静态资源文件也需要serve，需要通过在webpack.config.js中增加对应的配置：

````js
// webpack.config.js
module.exports = {
  ...
  devServer: {
    contentBase: './public' // 额外为开发服务器指定查找资源目录
  }
}
// 注意：在开发阶段没必要把public文件夹下的文件copy到dist目录，以免增加打包过程的操作，降低打包效率
````

#### 三、Webpack Dev Server 代理API

CORS 资源共享处理跨域的前提是API必须支持，并不是任何情况下API都应该支持CORS

如果说生产环境前后端的项目是同源部署，就没有必要开启CORS

这里主要解决的是开发阶段接口跨域问题：

可以通过开发服务器中配置代理服务来解决跨域

````js
// Webpack Dev Server 配置代理,webpack.config.js
module.exports = {
  ...
  devServer: {
    contentBase: './public',
    proxy: {
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}

````

#### 四、Webpack 配置 Source Map

Source Map解决了源代码与运行代码不一致所产生的问题

````js
module.exports = {
  ...
  devtool: 'source-map'
}
// Webpack 支持12种不同的source-map方式，每种方式的效率和效果各不相同
````

#### 五、Webpack开启HMR

HMR集成在webpack-dev-server中，使用不需要安装额外的模块



## Rollup

与Webpack作用类似，Rollup更为小巧，仅仅是一款ESM打包器，并不支持类似HMR这种高级特性，Rollup并不是要与Webpack全面竞争，提供一个充分利用ESM各项特性的高效打包器

使用：

```js
yarn add rollup --dev

yarn rollup ./src/index.js --format iife --file dist/bundle.js
```

配置文件：

````js
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  }
}
// 打包命令
yarn rollup --config rollup.config.js
````

使用插件：

插件是Rollup唯一扩展途径

rollup-plugin-json

````js
yarn add rollup-plugin-json --dev // 安装插件
// rollup.config.js
import json from 'rollup-plugin-json' // 导入插件

export default {
  ...
  plugins: [ // 配置插件
    json()
  ]
}
````

加载 NPM 模块：

借助rollup-plugin-node-resolve插件，实现利用模块的名称导入模块

```js
yarn add rollup-plugin-node-resolve --dev
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'

export default {
  ...
  plugins: [
    resolve()
  ]
}

```

Rollup 加载 CommonJs 模块

借助rollup-plugin-commonjs插件，实现加载CommonJS模块

````js
yarn add rollup-plugin-commonjs --dev
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'

export default {
  ...
  plugins: [
    commonjs()
  ]
}
````

Rollup 代码拆分

````js
// index.js静态导入，改为动态导入
// import { log } from './logger'
 import('./logger').then(({ log }) => {
   log('code splitting~')
 })

// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'amd'
  }
}

// 打包命令
yarn rollup --config
````

Rollup 多入口打包：

````js
// rollup.config.js
export default {
  input: [
    foo: 'src/index.js',
    bar: 'src/album.js'
  ],
  output: {
    dir: 'dist',
    format: 'amd'
  }
}

// 注意引入AMD模式的文件，需要额外处理：
// dist目录下新建index.html
// index.html
<body>
	<script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="foo.js"></script>  
</body>
````

Rollup 选用原则：

优点：

* 输出结果更加扁平
* 自动移除未引用代码
* 打包结果依然完全可读

缺点：

* 加载非 ESM 的第三方模块比较复杂
* 模块最终被打包到一个函数中，无法实现 HMR 
* 浏览器环境中，代码拆分功能依赖 AMD 库

Webpack 大而全，Rollup小而美

应用开发使用webpack，库/框架开发使用 Rollup



## Parcel-零配置的前端应用打包器

官方建议以html文件作为打包的入口文件

yarn init

yarn add parcel-bundle --dev

yarn parcel src/index.html

自动启动server，支持自动刷新，自持热替换，支持自动安装依赖，自持加载其他类型的资源模块不需要配置loader，支持动态导入，自动拆分代码

yarn parcel build src/index.html // 以生产模式打包

多进程，比webpack打包速度快

首个版本发布于2017年，因为当时的Webpack使用过于繁琐，完全零配置，构建速度快，Webpack有更好的生态，可以方便拓展，Webpack越来越好用，所以Webpack依然是主流。







