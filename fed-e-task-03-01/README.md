### 简答题

**1.当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。**

````javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
````

答：点击按钮动态给data增加的成员不是响应式数据，由于Vue会在初始化实例时对属性执行getter/setter转化，所以属性必须在data对象上存在才能让Vue将它转换为响应式的。对于已经创建的实例，Vue不允许动态添加根级别的响应式属性。但是，可以使用Vue.set(object, propertyName, value) 方法或是 vm.$set() 实例方法向嵌套对象添加响应式属性；Vue.set()内部不过也是调用了defineReactive() 把属性变成了getter/setter。

````javascript
method: {
  clickHandler() {
    // 调用 vm.$set() 实例方法，实现给data的对象属性dog添加响应式的name属性
    this.$set(data.dog, 'name', 'Trump')
  }
}
````



**2.请简述Diff算法的执行过程**

 答：diff算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有O(n)。

 diff算法有两个比较显著的特点：

1. 比较只会在同层级进行，不会跨层比较。
2. 在diff比较的过程中，循环从两边向中间收拢。

diff流程：

1. 首先定义oldStartIdx、oldEndIdx、newStartIdx以及oldStartIdx分别是新老两个 VNode 的两边的索引。

2. 接下来是一个 while 循环，在这个过程中，oldStartIdx、oldEndIdx、newStartIdx以及newEndIdx 会逐渐向中间靠拢。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

   while循环中会遇到四种情况：

   情形一：当新老 VNode 节点的 start 是同一节点时，直接 patchVnode 即可，同时新老 VNode 节点的开始索引都加1；

   情形二：当新老 VNode 节点的 end 是同一节点时，直接patchVnode 即可，同时新老 VNode 节点的结束索引都减1；

   情形三：当老 VNode 节点的 start 和新 VNode 节点的 end 是同一节点时， 这说明这次数据更新后 oldStartVnode 已经跑到了 oldEndVnode 后面去了。这时候在patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面， 同时老 VNode 节点开始索引加1， 新VNode 节点的结束索引减1；

   情形四：当老 VNode节点的 end 和新 VNode 节点的 start 是同一节点时， 这说明这次数据更新后 oldEndVnode 跑到了 oldStartVnode 前面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减1， 新 VNode 节点的开始索引加1。

3. while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

   情形一：如果在循环中，oldStartIdex 大于 oldEndIdx了， 那么就表示 oldChildren比newChildren 先循环完毕，那么newChildren里面剩余的节点都是需要新增的节点，把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中

   情形二：如果在循环中，newStartIdx 大于 newEndIdx 了， 那就表示newChildren 比 oldChildren先循环完毕，那么 oldChildren 里面剩余的节点都是需要删除的节点，把[oldStartIdx, oldEndIdx]之间的所有节点都删除

   

### 编程题

1. 模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

   ````javascript
   // 跟history模式不同的地方在于事件的处理
   handlerClick (e) {
     // history.pushState({}, '', this.to) // history模式
     window.location.hash = '#' + this.to // hash模式
     this.$router.data.current = this.to
     e.preventDefault()
   }
   
   initEvent() {
       // history 模式
       // window.addEventListener('popstate', () => {
       //   this.data.current = window.location.pathname 
       // })
       // window.addEventListener('load', this.hashChange.bind(this))
       // window.addEventListener('hashchange',this.hashChange.bind(this))
     
     	// hash 模式
       window.addEventListener('hashchange', () => {
         if (!window.location.hash) {
           window.location.hash = '#/'
         }
         this.data.current = window.location.hash.substr(1)
       })
     }
   ````

   

2. 在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

   ````javascript
   // 处理v-html指令
   htmlUpdater (node, key, value) {
     node.innerHTML = value
     // 创建watcher对象，当数据改变更新视图
     new Watcher(this.vm, key, (newValue) => {
       node.innerHTML = newValue
     })
   }
   
   // 处理v-on指令
   // 处理节点的时候对属性做一下判断，以‘on’开头认为是v-on:click这种
   // 然后取出事件类型、时间类名
   // 通过addEventListener在node节点上做事件监听
   // 根据事件名称在vm里面的$options.methods里找到方法执行
   
   // 编译元素节点，处理指令
   compileElement(node) {
     // 遍历所有的属性节点
     Array.from(node.attributes).forEach(attr => {
       // 判断是否是指令
       let attrName = attr.name
       if (this.isDirective(attrName)) {
         // v-text --> text
         attrName = attrName.substr(2)
         let key = attr.value
         if (attrName.startsWith('on')) {
           const event = attrName.replace('on:', '') // 获取事件名
           return this.onUpdater(node, key, event)
         }
         this.update(node, key, attrName)
       }
     })
   }
   
   // 处理v-on指令
   onUpdater (node, key, event) {
     node.addEventListener(event, (e) => this.vm[key](e))
   }
   ````

   

3. 参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果

```` javascript
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
````







