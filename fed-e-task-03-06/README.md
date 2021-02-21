简答题：

1.说说`application/json`和`application/x-www-form-urlencoded`二者之间的区别。

答：两种请求方式对服务器端都没有什么影响。`application/x-www-form-urlencoded`方式是比较老的一种方式，这种方式的好处就是浏览器都支持，在请求发送过程中会对数据进行序列化处理，以键值对形式`?key1=value1&key2=value2`的方式发送到服务器。`application/json`,随着json规范的越来越流行，并且浏览器支持度越来越好，许多开发人员以`application/json`作为请求content-type，告诉服务器请求的主体内容是json格式的字符串，服务器端会对`json`字符串进行解析，这种方式的好处就是前端人员不需要关心数据结构的复杂度，只要是标准的json格式就能提交成功，application/json数据格式越来越得到开发人员的青睐。举例：向服务器发送数据`{a: '12', 'b': '34'}`,如果头的格式是`application/x-www-form-urlencoded`,则`ajax.send("a='123'&b='34'")`,如果头的格式是`application/json`则`ajax.send(JSON.stringify(data))`



2.说一说在前端这块，角色管理你是如何设计的。

答：



3.`@vue/cli`跟`vue-cli`相比，`@vue/cli`的优势在哪？

答：（1）创建项目命令变了

```bash
# vue-cli2.x
vue init webpack project-name

# Vue-cli3.x
vue create project-name
```

（2）@vue/cli3.x使用图形化界面这是一个非常大的改动，对于不喜欢终端（dos面板）里输入命令的小伙伴，它可以说是你的福音。可以直接通过`vue ui`命令以图形化界面创建和管理项目：

````bash
vue ui
````

执行上述命令打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。



4.详细讲一讲生产环境下前端项目的自动化部署的流程。

答：

````bash
# 1.进入项目根目录执行以下命令进行项目打包
npm run build
# 打包之后项目目录下出现dist目录

# 2.本地测试
# 安装serve
npm install -g serve
# 项目目录下执行以下命令进行预览
serve -s dist

# 3.设置生产环境代理
# 项目根目录下创建test-serve/app.js
# npm i -D express
# 执行以下命令安装http代理中间件
npm i -D http-proxy-middleware
# 4.package.json中配置预览脚本，之后预览的时候可以直接执行npm run preview
"preview": "node test-serve/app.js"
````

```javascript
// test-serve/app.js
const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

// 托管了 dist 目录， 当访问 / 的时候, 默认会返回托管目录中的 index.html文件
app.use(express.static(path.join(__dirname, '../dist')))

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
})

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
})
        
app.listen(3000, () => {
  console.log('running...')
})
```





5.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

答：



6.针对新技术，你是如何过渡到项目中？

答：（1）通过官方文档全面、大致的了解新技术的原理和基本使用方法；

（2）借助类似realworld等开源项目运用新技术做一个实战案例；总结遇到的问题和在使用中需要注意的问题；

（3）过渡到实际开发的项目中；