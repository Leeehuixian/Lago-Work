一、简单题

### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答：Webpack在启动后，会从entry开始，递归解析依赖的所有Module，每找到一个Module,就会根据Module.rules里配置的Loader规则进行相应的转换处理，对Module进行转换后，再解析出当前Module依赖的Module，这些Module会以Entry为单位进行分组，即为一个chunk。因此一个Chunk，就是一个Entry及其所有依赖的Module合并的结果。最后Wepack会将所有的Chunk转换成文件输出Output。在整个构建流程中，Webpack会在恰当的时机执行plugin里定义的逻辑，从而完成Plugin插件的优化任务；

### 2.Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答：Loader用于对模块文件进行编译转换和加载处理，在modules.rules数组中进行配置，它用于告诉Webpack在遇到哪些文件时使用哪些Loader去加载和转换。Loader还可以通过querystring或者object指定选项参数；Plugin用户扩展Webpack功能，实现原理是在构建流程中注入钩子函数。在plugins数组中进行配置；两者的主要区别：Loader是转换器，操作的是文件，Plugin是扩展器，针对的是loader结束后，Webpack打包的整个过程，不是直接操作文件，而是基于事件机制工作，会监听Webpack打包过程中的某些节点，执行对应的任务。

### 3.Webpack实现Vue项目打包说明

````js
const path = require('path') 
const webpack = require('webpack') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/** @type {import('webpack').Configuration} */ // 利用jsdoc和ts，引入类型注释，实现vscode对配置编写的语法提示
module.exports = { // 导出配置对象
  mode: 'none', // 4.0新增工作模式用于webpack根据不同的模式预设优化处理，可选：‘none’，‘production’，‘development’
  entry: './src/main.js', // 指定入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 指定输出文件路径
    filename: 'js/bundle.[contenthash:6].js', // 指定输出文件名
  },
  module: { // 配置模块处理规则
    rules: [ // 配置模块的读取和解析规则
      {
        test: /\.css$/, // 处理css文件
        use: ['style-loader', 'css-loader'] // 按照从后往前的顺序应用
      },
      {
        test: /\.less$/, // 处理less文件
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.vue$/, // 处理vue文件
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/, // 处理图片文件
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[contenthash:6].[ext]',
            esModule: false, // 文件资源加载遵循commonJs规范，不设置会导致图片以export default的形式导出，无法正常加载
            limit: 5 * 1024 // kb // 不超过5kb的图片将会被转为BaseUrl嵌入到js代码里，减少网络请求次数，超过5kb的文件将交由file-loader处理文件资源加载
          }
        }
      }
    ]
  },
  plugins: [ // 插件配置，实现自动化任务
    new CleanWebpackPlugin(), // 打包前清除文件
    new VueLoaderPlugin(), // 处理.vue文件时按照module中配置的模块处理规则处理相应的文件
    new HtmlWebpackPlugin({ // 根据模板自动生成html文件
      template: './public/index.html',
      title: 'Vue App Sample'
    }),
    new webpack.DefinePlugin({ // 配置全局常量
      BASE_URL: '"/"' // 注意：注入字符串需要加“”
    })
  ]
}
````

