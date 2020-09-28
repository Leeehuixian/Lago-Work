/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-28 15:11:33
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-28 16:43:36
 * @FilePath: /fed-e-task-03-01/snabbdom-demo/src/04-rank.js
 * @Description: 
 */
// 导入模块和依赖
import { h, init } from 'snabbdom'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
import { originalData } from './originData'

let patch = init([ style, eventlisteners ])

let data = originalData
const app = document.querySelector('#app')

let sortBy = 'rank'
let vnode = view(data)

// 初次渲染
let oldVnode = patch(app, vnode)

// 渲染
function render () {
  oldVnode = patch(oldVnode, view(data))
}

// 生成新的 DOM
function view(data) {
  return h('div#container', [
    h('h1', 'Top 10 movies'),
    h('div',
      [
        h('a.btn.add',
          { style: { marginRight: '10px', color: 'red' }, on: { click: add } }, 'Add'
        ),
        'Sort by:',
        h('span.btn-group',
          [
            h('a.btn.rank',
              {
                style: { marginRight: '10px' },
                'class': { active: sortBy === 'rank' },
                on: { click: [changeSort, 'rank'] },
              },
              'Rank'
            ),
            h('a.btn.title',
              {
                style: { marginRight: '10px' },
                'class': { active: sortBy === 'title' },
                on: { click: [changeSort, 'title'] },
              },
              'Title'
            ),
            h('a.btn.desc',
              {
                style: { marginRight: '10px' },
                'class': { active: sortBy === 'desc' },
                on: { click: [changeSort, 'desc'] },
              },
              'Description'
            ),
          ]
        )
      ]
    ),
    h('div.list', data.map(movieView))
  ])
}

// 创建单条数据
function movieView(movie) {
  return h('div.row', {
      key: movie.rank,
      style: {
        display: 'flex',
        margin: '10px',
        padding: '10px',
        border: '1px solid #eee'
      },
      hook: {
        insert: function insert(vnode) {
          movie.elmHeight = vnode.elm.offsetHeight;
        }
      }
    },
    [
      h('div', { style: { fontWeight: 'bold', marginRight: '10px' } }, movie.rank),
      h('div', { style: { marginRight: '10px', minWidth: '200px', textAlign: 'center' } }, movie.title),
      h('div', { style: { marginRight: '10px' } }, movie.desc),
      h('div.btn.rm-btn', { style: { marginRight: '10px' }, on: { click: [remove, movie]}}, 'X')
    ]
  )
}

// 排序
function changeSort(prop) {
  sortBy = prop;
  data.sort(function(a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    }

    if (a[prop] < b[prop]) {
      return -1
    }

    return 0
  })
  render()
}

// 添加
function add() {
  const n = originalData[Math.floor(Math.random() * 10)];
  data = [{ rank: data.length + 1, title: n.title, desc: n.desc, elmHeight: 0 }].concat(data);
  render();
}

// 移除
function remove(movie) {
  data = data.filter(function (m) {
    return m !== movie
  });
  render()
}

