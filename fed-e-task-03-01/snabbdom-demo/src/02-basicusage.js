/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-24 20:51:10
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-24 21:02:48
 * @FilePath: /fed-e-task-03-01/snabbdom-demo/src/02-basicusage.js
 * @Description: 
 */
// 2.div中放置子元素h1， p
import {h, init} from 'snabbdom'

let patch = init([])

let vnode = h('div#container', [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是一个p标签')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container', [
    h('h1', 'Hello World'),
    h('p', 'Hello P')
  ])
  patch(oldVnode, vnode)

  // 清空页面元素
  patch(oldVnode, h('!'))
}, 2000)