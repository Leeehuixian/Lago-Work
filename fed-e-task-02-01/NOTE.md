# 开发脚手架与自动化构建工作流封装



## 内容概要

* 脚手架工具开发
* 自动化构建系统
* 模块化打包
* 项目代码规范
* 自动化部署



## 工程化概述



### 工程化主要解决的问题

* 传统语言或者语法的弊端（ES6、ES7、Sass、Less）
* 无法使用模块化/组件化
* 重复的机械工作（手动压缩代码和文件、手动将代码部署到服务器）
* 代码风格统一、质量保证（多人协作开发）
* 依赖后端服务接口支持
* 整体依赖后端项目

#### 一个项目过程中的工程化表现

工程化的表现：一切以提高效率、降低成本、质量保证为目的的手段都属于【工程化】

* 创建项目（利用脚手架工具创建项目结构、自动生成特定类型的文件）
* 编码（借助工程化的工具进行格式化代码、校验代码风格，借助一些编译工具对浏览器不支持的新特性进行编译/构建/打包）
* 预览/测试（热更新，Source Map， Mock）
* 提交（Git Hooks进行提交前的代码检查）
* 部署（CI/CD，自动发布）

**工程化不等于某个工具**

Vue-cli/angular-cli是官方提供的工程化集成方案，不仅仅是一个脚手架

技术都是为了解决问题而存在的，切莫为了技术而技术！！！



### 脚手架工具

作用：创建项目基础结构、提供项目规范和约定

* 相同的组织结构
* 相同的开发范式
* 相同的模块依赖
* 相同的基础代码
* 相同的工具配置

#### 常用的脚手架工具

Vue-cli/angular-cli（针对特定项目）

Yeoman（通用性的脚手架）

Polp（一般不会独立使用，而会集成到项目中，用于自动化的创建同类型的项目文件）

#### Yeoman

现代化web应用的脚手架工具，不同于vue-cli，yeoman更像一个脚手架运行平台，我们可以通过Yeoman搭配不同的Generator创建任何类型的项目，也就是我们可以通过定义自己的Generator去定制自己的前端脚手架

##### 基本使用

````js
// 练习generator-node构建Node项目结构
node -v
npm -v
yarn -v
yarn global add yo
yarn global add generator-node
cd golden
mkdir my-module
cd my-module\
yo node // 通过yo运行generator
按提示填写
````

* 在全局范围安装yo

  ````js
  npm install yo --global // or yarn global add yo
  ````

* 安装对应的generator

  ````js
  npm install generator-node --global // or yarn global add generator-node
  ````

* 通过yo运行generator

  ````js
  cd path/to/project-dir
  mkdir my-module
  yo node
  ````

  

#### Sub Generator

不需要创建完整的项目结构，只需要创建某些文件时，可以利用yeoman的Sub Generator特性来实现

具体操作：在项目目录下运行特定的Sub Generator命令与生成对应的文件

```js
// 利用generator-node的子集生成器cli去帮助我们生成一个cli应用所需要的文件
yo node:cli
// overwrite package.json
npm link
my-module --help
// 遇到一个错误：Permission denied，原因：创建文件的用户跟执行文件的不是一个用户，需要执行：
chmod -R 777 . // 修改权限,然后在执行my-module就可以正常运行了
```

**并不是所有的Generator都提供有Sub Generator子集生成器，使用前需要先通过所使用的Generator的官方文档来确认是否提供有对应的Sub Generator子集生成器**



#### Yeoman常规使用步骤

* 明确你的需求
* 找到合适的Generator；（官网：yeoman.io/generators）
* 全局范围安装Yeoman和找到的Generator;
* 通过Yo运行对应的Generator；
* 通过命令行交互填写选项；
* 生成你所需要的项目结构；



#### 自定义Generator(基于Yeoman搭建自己的脚手架)

不同的Generator可以用来生成不同的项目，我们可以通过自己创建Generator，来实现自定义的项目结构。虽然市面上已经有很多Generator，但是我们还是有创建自己的Generator的必要因为市面上的Generator都是通用性的，在实际开发中我们可能有些基础代码甚至是业务代码相同类型项目还是重复的可能，我们可以把公共的部分都放进脚手架去生成，让脚手架发挥更大的价值。例如我们使用vue-cli来创建项目时，它只会创建最基础的项目骨架，并不包含我们常用的模块（axios，vue-router，vuex），需要在每次创建完项目，手动引入这些模块并且编写使用的基础代码，如果放在脚手架中就不需要每次都重复操作了。

Q：具体怎么样拓展vue-cli把axios，vue-router，vuex常用的的模块集成进脚手架里面？

创建Generator本质上就是创建一个NPM模块，但是Generator有特定的结构：

特定的结构

TODO 插图Generator基本结构

**名称必须是generator-<name>的形式**

````js
// 自定义Generator的具体步骤
mkdir generator-sample // 创建生成器目录
cd generator-sample\
yarn init // 创建package.json
yarn add yeoman-generator // 安装yeoman-generator模块（提供生成器的基类，工具函数，方便创建生成器）
// 打开生成器目录，创建/generators/app/index.js此文件作为Generator的核心入口
yarn link // 把模块链接到全局范围，使之成为全局模块包，这样Yeoman在工作时才可以找到我们自定义的Generator
yo sample // 运行自定义的Generator
````

````js
//generators/app/index.js
// 需要导出一个继承自Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，比如文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing () {
    // Yeoman 自动在生成文件阶段调用此方法
    // 我们这里尝试在项目目录中写入文件
    this.fs.write(
      this.destinationPath('temp.txt'),
      Math.random().toString()
    )
  }
}
````

#### 根据模板创建文件

自动创建文件很多，文件内容复杂，可以使用模板创建文件比较便捷提高效率

````js
//在 generators>app>templates目录下创建模板文件foo.txt 
//generators/app/index.js改为模板方式写入文件
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing () {
    // // Yeoman 自动在生成文件阶段调用此方法
    // // 我们这里尝试在项目目录中写入文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )

    // 通过模板方式写入文件到目标目录

    // 模板文件路径
    const tmpl = this.templatePath('foo.txt')

    // 输出目标路径
    const output = this.destinationPath('foo.txt')

    // 模板数据上下文
    const context = { title: 'Hello lhx~', success: false }

    this.fs.copyTpl(tmpl, output, context)

  }
}
````



#### 接收用户输入

对于模板中的动态数据，例如项目的标题、名称，一般通过命令行交互的方式询问使用者从而得到，在generator中想要发起命令行交互的询问可以通过Generator类型中的promoting方法

TODO 实操

#### Vue Generator案例

#### 发布Generator

通过npm publish 命令把自定义的Generator模块发布到npm官网

托管源代码到公开的源代码仓库上面，如github

首先：在项目根目录下通过命令行创建本地仓库

````js
echo node-modules > .gitignore // 忽略node_modules文件夹
git init // 本地空仓库
git status // 查看本地仓库状态
git add . // 添加当前目录下所有文件
git commit -m 'feat: initial commit' // 提交
打开github创建新的仓库，复制仓库地址
git remote add origin 仓库地址 // 为本地仓库创建了一个远端仓库的别名
git push -u origin master // 把本地master分支代码推送到远端的master分支
yarn publish // or npm publish
按照提示操作
// 错误：Couldn't publish package :~~~,因为镜像指向的是淘宝，淘宝镜像是只读的，所以发布不了
yarn publish --registry=https://registry.yarnpkg.com // 发布到yarn官方镜像与npm镜像是同步的
// 发布成功可以到npm官网看到已经发布的模块
// 想要模块出现在官方列表，需要添加Yeoman关键词

````



### Plop

小而美的脚手架工具，主要用于项目中特定文件的小工具，类似于Yeoman中的Sub Generator

一般不会独立使用，而会集成到项目中，用于自动化的创建同类型的项目文件

#### Plop的基本使用

* 将plop模块作为项目开发依赖安装（`yarn add plop --d`）
* 在项目根目录下创建一个plopfile.js文件
* 在plopfile.js文件中定义脚手架任务
* 编写用于生成特定类型文件的模板
* 通过Plop提供的CLI运行脚手架任务（`yarn plop 生成器名称`）

````js
yarn add plop --d //把plop当做项目开发依赖安装到项目当中
项目根目录新建plopfile.js // Plop 工作的入口文件 
yarn plop component // 运行plop生成器
````

````js
//plopfile.js
// Plop入口文件
````



### 脚手架的工作原理

脚手架——node-cli应用

自已构建一个脚手架：

准备工作：创建一个脚手架项目目录(sample-scaffolding)，并且新建一个package.json文件（`yarn init`），在package.json文件中添加bin字段，用来指定CLI应用的入口文件， 然后在项目根目录创建CLI的入口文件cli.js

````js
// package.json
{
  "name": "sample-scaffolding",
  "version": "1.0.0",
  "main": "index.js",
  "bin": "cli.js", // 指定CLI应用的入口文件
  "author": "leeehuixian@163.com",
  "license": "MIT"
}
````

````js
// cli.js
#!/usr/bin/env node
// Node CLI应用入口文件必须要有这样的头
// 如果是 Linux 或者 macOs 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chomd 755 cli.js实现修改

// 脚手架的工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户的回答结果生成文件

//console.log('cli working~') 
// 检验脚手架是否可用,命令行:
// yarn link // 把模块link到全局
// sample-scaffolding // 试运行，报权限错误
// chomd 755 cli.js // 修改权限
// sample-scaffolding // 再次执行，当终端正常打印log语句，表示CLI基础已经OK了

// Node中发起命令行交互询问使用inquirer,需要安装
// yarn add inquirer

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
])
.then(answer => {
  // 模板目录
  const tempDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()
  
  // 将模板文件全部输出到目标目录
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      // 通过模板引擎渲染文件，yarn add ejs
      ejs.renderFile(path.join(tempDir, file), answer, (err, result) => {
        if (err) throw err
        // 将结果写入目标文件路径
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})

// 使用脚手架
// 新建一个项目文件夹，执行脚手架命令：
// sample-scaffolding
// 命令行交互输入答案
// 项目创建完成
````

Q: 视频里老师在命令行通过code .就能自动在vscode中打开当前项目怎么做到的？

Q: vue-cli项目目录里并没有找到templates文件夹，是怎么进行文件的生成的呢？

## 自动化构建

源代码自动化转换成生产环境可以运行的代码

NPM scripts（处理简单的自动化操作）

Grunt（最早，插件最完善，但是工作过程基于临时文件，构建速度比较慢）

Gulp（很好的解决了Grunt构建速度慢的问题，基于内存进行读写，可以支持多个任务，插件也相对完善，是目前最流行的前端构建系统）

FIS（百度前端团队推出构建系统，相对于前两者FIS更像捆绑套餐，对于项目中典型的需求尽可能的集成在内，例如：资源加载、模块开发，代码部署、性能优化，大而全，开源之后在国内流行）

webpack是模块打包工具，不在本次讨论返回内

初学者FIS更适合，要求灵活的话Grunt、Gulp更优



### Grunt的基本使用

````js
yarn init --yes // 初始化，新建package.json
yarn add grunt // 添加Grunt模块
// 项目根目录新建gruntfile.js文件Grunt的入口文件
yarn grunt TaskName // 执行任务
yarn grunt // 执行默认任务
````

````js
// gruntfile.js
// Grunt 的入口文件
// 用于定义一些需要Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用到的 API

module.exports = grunt => {
  // registerTask用来注册任务，接收三个参数（任务名称、任务描述、任务函数）
  grunt.registerTask('foo', () => {
    console.log('hello grunt')
  })
  
  grunt.registerTask('bar', '任务描述', () => { // 任务描述可以通过grunt --help中的Available tasks进行查看
    console.log('other task~')
  })
  
  // grunt.registerTask('default', () => { 
  //  console.log('default task~')
  // })
  
  grunt.registerTask('default', ['foo', 'bar']) // grunt default会先执行foo任务，再执行bar任务
  
  grunt.registerTask('async-task',function () { // grunt处理异步任务
    const done = this.async()
    setTimeout(() => {
      console.log('async task working~')
      done() // 异步任务标记失败，需要给done(false)传递false实参
    }, 1000)
  })
  
  grunt.registerTask('bad', () => {
    console.log('bad working~')
    return false // 标记任务失败，任务标记失败后，任务列表后面的任务将不再被执行，可以使用在命令后面添加 --force强制任务继续执行
  })
  
  // initConfig 配置属性
  grunt.initConfig({
    foo: 'bar'
  })
  
  grunt.registerTask('foo', () => {
    console.log(grunt.config('foo')) // bar
  })
}
````



### gulp的使用

#### 基本使用

安装gulp到项目

项目目录下创建gulpfile.js的文件，作为gulp的入口文件

然后再gulpfile.js中编写gulp任务

在Gulp V4.0以前注册任务需要先引入gulp模块，通过gulp.task()的方式注册任务，V4.0之后可以直接通过导出函数的方式进行注册

````js
// gulpfile.js
// V4.0以前

const gulp = require('gulp')

gulp.task('bar', done => {
  console.log('bar working~')
  done()
})

// V4.0以后
export.foo = done => {
  console.log('foo task working~')
  done()
}
````



#### 组合任务

串行：series

并行：parallel

### 异步任务的三种方式

回调：

```js
exports.callback = done => {
  console.log('callback task~')
  done()
}

exports.callback_error = done => {
  console.log('callback task~')
  done(new Error('task failed!'))
}
```

promise：（避免嵌套过深）

````js
exports.promise = () => {
  console.log('promise task~')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task~')
  return Promise.reject(new Error('task failed~'))
}
````

Async/await(Promise的语法糖，node版本需要时8以上)：

````js
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async() => {
  await timeout(1000)
  console.log('async task~')
}
````

stream：（经常用来处理文件）

````js
const fs = require('fs')
exports.stream = () => {
  const readStream = fs.creatReadStream('package.json')
  const writeStream = fs.creatWriteStream('temp.txt')
  readStream.pipe(writeStream) // 相当于执行了一个文件复制的操作
  return readStream
}
````



#### Gulp 构建过程核心工作原理

输入->加工->输出

读取流 ->转换流->写入流

````js
const fs = require('fs')
const { Transform } = require('stream') // 转换对象

exports.default = () => {
  // 文件读取流
  const read = fs.creatReadStream('normalize.css')
  // 文件写入流
  const write = fs.creatWriteStream('normalize.min.css')
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程实现
      // chunk =》 读取流中读取到的内容（Buffer）
      const input = chunk.toString()
      const output = input.replace(/s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output) // 错误优先，第一个参数用来抛出错误，没有错误传null
    }
  })
  
  // 把读取出来的文件流导入写入文件流
  read
  	.pipe(transform) // 转换
  	.pipe(write) // 写入
  
  return read
}
````

Q：关于静态资源缓存，怎么处理，因为相同的文件名可能会导致浏览器缓存，样式、脚本文件等更改之后不会及时反映到浏览器里面



#### Gulp文件操作API+插件的使用

````js
const { src, dest } = require('gulp') // 引入Gulp读取流、写入流API,相对原始API，Gulp的API更强大
// 转换流:独立插件，使用插件需要先安装！！！
const cleanCss = require('gulp-clean-css') // css的压缩插件
const rename = require('gulp-rename') // 重命名插件

exports.default = () => {
  return src('src/*.css')
  	.pipe(cleanCss())
  	.pipe(rename({ extname: '.min.css' }))
  	.pipe(dest('dist'))
}
````



#### Gulp自动化构建案例-样式编译（gulp-sass）

````js
const { src, dest } = require('gulp')
const sass = require('gulp-sass') // 直接用yarn安装sass报错，因为里面依赖国外的一些站点，可以通过把node-sass的镜像设置为淘宝镜像(`yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g`)然后再yarn add gulp-sass --dev 安装

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist')) // styles文件夹下面的_开头的文件不会被编译
}

module.exports = {
  style
}

// 需要注意的几个点：
// base选项可以指定编译后的文件结构与src保持一致
// outputStyle选项可以让编译后的结束符号占空行，而不是跟在最后一个属性后面
// styles文件夹下面的_开头的文件不会被编译
````

Q: 文件编译过后，开发调试的时候怎么定位错误？



#### Gulp自动化构建案例-脚本编译（gulp-babel）

````js
const { src, dest } = require('gulp')
const babel = require('gulp-babel')

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(babel({ presets: ['@babel/preset-env'] })) // 通过配置presets选项指定babel按照ES哪个规范进行编译，@babel/preset-env会编译所有ES的新特性
    .pipe(dest('dist'))
}

module.exports = {
  script
}

// 注意：
// 如果babel中没有配置presets选项，那么编译后的文件跟编译前基本没变化
// gulp-babel唤醒了转换，但是并不会安装转换模块，还需要手动安装@babel/core和@babel/preset-env到项目，不然会报错：Cannot find module '@babel/core'
````



#### Gulp自动化构建案例-模板文件编译（gulp-swig）

````js
yarn add gulp-swig --dev // 安装
const { src, dest } = require('gulp')
const swig = require('gulp-swig') // 引入

// 注册任务
const page = () => {
  return src('src/*.html', { base: 'src'}) // src配置可以为‘src/**/*.html’表示src下所有子文件夹下的html文件
  	.pipe(plugins.swig({ data, defaults: { cache: false} })) // defaults选项防止模板缓存导致页面不能及时更新
  	.pipe(dest('dist'))
}

// 导出任务
module.export = {
  page
}

// 运行
yarn gulp page
````



#### Gulp自动化构建案例-图片和字体文件压缩（gulp-imagemin）

````js
yarn add gulp-imagemin --dev // 安装（图片和字体都用此插件）
const { src, dest } = require('gulp')
const imagemin = require('gulp-imagemin') // 引入

// 注册任务
const images = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

const fonts = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

// 导出任务
module.exports = {
  images,
  fonts
}
````



#### Gulp自动化构建案例-其他文件及文件清除

##### public文件夹下的文件拷贝

````js
// src文件夹下的文件处理完了，我们还需要对public文件夹下的文件进行处理，public文件夹下的文件不需要进行编译，直接拷贝即可，我们一样借助gulp的读写流完成
const extra = () {
  return src('public/**', { base: 'public' })
  	.pipe(dest('dist'))
}
````

##### 文件清除（del插件）

````js
yarn add del --dev // 安装
const { src, dest, parallel, series } = require('gulp')
const del = require('del')
// 注册任务
const clean = () => {
  return del(['dist'])
}

// series组合任务，串行，先清空dist目录，再进行文件编译
const build = series(clean, parallel(compile, extra))
````



#### Gulp自动化构建案例-自动加载插件（gulp-load-plugins）

```js
// 随着构建任务的复杂，会用到原来越多的插件，都手动require比较繁琐且不易维护，可以借助gulp-load-plugins插件来实现自动加载所需插件
yarn add gulp-load-plugins --dev // 安装

const loadPlugins = require('gulp-load-plugins') // 引入
const plugins = loadPlugins() // 得到的是一个对象，插件是对象的属性
// 在使用gulp插件的地方需要替换，例如：plugin.sass(),插件名中划线需要替换成驼峰命名规则,就不需要手动引入使用的插件了
```



#### Gulp自动化构建案例-开发服务器

browser-sync: 热更新开发服务器，自动打开浏览器，代码变更以后自动刷新页面

````js
yarn add browser-sync --dev // 安装
const browserSync = require('browser-sync')
const bs = browserSync.create()

const server = () => {
  bs.init({
    notify: false,
    port: 2080, // 服务端口号
    open: false, // 是否自动打开浏览器
    files: 'dist/**', // browser-sync启动后监听的文件路径通配符
    server: {
      baseDir: 'dist',
      rotues: {
      	'/node_modules': 'node_modules' // 引用文件 
      }
    }
  })
}

module.exports = {
  server
}
````



#### Gulp自动化构建案例-监视变化以及构建优化

````js
const { src, dest, paraller, series, watch } = require('gulp')
const server = () => {
  watch('src/assets/style/*.css', style), // 监视：watch('需要监听的文件路径', 执行任务函数名)
}
  
// 开发过程中，没必要对图片、字体进行压缩，所以不需要watch，编译也可以直接去掉，减少构建过程，加快编译速度
baseDir: ['dist', 'src', 'public']
  
// 图片、字体、public文件发生变化时进行自动更新
watch([
  'src/assets/images/**',
  'src/assets/fonts/**',
  'public/**'
], bs.reload)
  
  
// styles，scripts，pages任务也可以借助bs.reload当文件发生变化的时候再次把文件推给浏览器，从而实现自动刷新，就不需要server中files选项了
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
  	.pipe(bs.reload({ stream: true })) // 当文件发生变化时自动刷新浏览器
}

````



#### Gulp自动化构建案例-useref文件引用处理

````js
// 以上的编译任务并不会对引用的外部文件进行编译处理，但是编译后的html文件中对于引用，用build...enbuild进行注释，gulp-useref插件会自动识别，并对引用问价进行合并打包处理
<!-- build:js assets/scripts/vendor.js -->
<script src="/node_modules/jquery/dist/jquery.js"></script>
<script src="/node_modules/popper.js/dist/umd/popper.js"></script>
<script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
<!-- endbuild -->
<!-- build:js assets/scripts/main.js -->
    <script src="assets/scripts/main.js"></script>
<!-- endbuild -->

yarn add gulp-useref --dev // 安装
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
  	.pipe(plugins.useref({ searchPath: ['dist', '.'] }))
  	// html js css需要被压缩
  	.pipe(dest('dist'))
}

moudle.exports = {
  useref
}

yarn gulp useref // 执行命令

// 编译后：会把多个引用文件合并成一个vendor.js
<script src="assets/scripts/vendor.js"></script>
<script src="assets/scripts/main.js"></script>
````



#### Gulp自动化构建-useref生成文件的压缩

````js
yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev // 安装html js css的压缩插件
yarn add gulp-if --dev // 安装分别对不同文件进行pipe处理的插件

const useref = () => {
  return src('dist/*.html', { base: 'src' })
  	.pipe(plugins.useref({ searchPath: ['dist', '.'] }))
  	.pipe(plugins.if(/\.js$/, plugins.uglify()))
  	.pipe(plugins.if(/\.css$/, plugins.cleanCss()))
  	.pipe(plugins.if(/\.html$/, plugins.htmlmin({ // 不指定参数，htmlmin不工作
    	collapseWhitespace: true,
    	minifyCss: true,
    	minifyJS: true
  	})))
  	.pipe(dest('release')) // dest('dist')=>dest('release').避免文件读写冲突，导致写不进去
}

````



#### Gulp自动化构建案例-重新规划构建过程

避免文件读写冲突，我们把useref生成的文件写入到release文件夹，而不是dist目录，这样破坏了构建的目录结构（原本约定：开发编码放到src目录下，打包上线放到dist目录），我们可以把style，script，page的任务写入文件目录改成temp，然后把useref任务中的读取文件目录改成temp，写入文件目录还改为dist

````js
// 需要做的修改
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp')) // 修改，script和page任务做相同的修改
}

const server = () => {
  ...
  baseDir: ['temp', 'src', 'public']
  ...
}
  
const useref = () => {
  return src('temp/*.html', { base: 'temp' })
         ...
         .pipe(dest('dist'))
}

// 编译任务组合
const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(
	clean,
  parallel(
  	serise(compile, useref),
    image,
    font,
    extra
  )
)

// 开发时执行的任务
const develop = series(compile, server)
````



#### Gulp自动化构建过程-补充

vscode快捷键折叠到最高层：command+k+command+1

需要导出的只有clean，build， develop任务

放入package.json的scripts中

````js
// package.json
"scripts": {
  "clean": "gulp clean",
  "build": "gulp build",
  "dev": "gulp develop"
}

// 运行
yarn clean
yarn build
yarn dev
````

添加需要忽略的文件目录

````js
// .gitignore
temp

dist

````



### 封装工作流

多个项目重复使用相同的构建任务，提取可复用的工作流

Gulpfile + Gulp = 构建工作流

创建一个模块，发布到npm的仓库上面，在项目中使用

 Q:pages.config.js中的data可不可以也进行包装



### FIS的基本使用

高度集成；前端常用的开发任务和调试任务

用的人越来越少，官方也很少维护，不推荐在新项目中使用

````js
yarn global add fis3 --dev // 安装
fis3 release -d output // 自动构建项目开发文件到output文件夹下，但是并没有进行编译，而只是把引用文件的路径转换成绝对路径
项目根目录新建fis-conf.js
fis.match('*.{js,scss,png}', {
  release: '/asstets/$0' // $0当前文件的原始目录结构
})
````

#### FIS编译与压缩

```js
yarn global add fis-parser-node-sass // scss编译模块
yarn global add fis-parser-babel-6.x // js编译模块
fis3 inspect // 可以用来调试配置文件
```

```js
// fis-conf.js
fis.match('**/*.scss', {
  rExt: '.css', // 修改扩展名
  parser: fis.plugin('node-sass'), // 编译scss
  optimizer: fis.plugin('clean-css'), // 压缩css
})

fis.match('**/*.js', {
  parser: fis.plugin('babel-6.x'), // 编译js
  optimizer: fis.plugin('uglify-js') // 压缩js
})
```



### npm or yarn

都是包管理工具

yarn 可以自动找到node_modules/.bin下的可执行文件， npx也可以

npx可以直接执行远端（线上）模块， 一次性使用的，可以用npx



### 全局安装 or 本地安装

全局安装模块：只有本地经常用到，而且与某一特定项目无关的工具或者模块

脚手架类型的工具，建议使用npx/yarn init, 一次性使用

其他所有的模块都应该安装到项目本地，也就是在package.json声明这个依赖

输出所有环境变量：

Mac： echo $PATH

Windows: CMD set PATH

找到命令的路径：

Mac：which XXXX 

Windows：where XXXX



