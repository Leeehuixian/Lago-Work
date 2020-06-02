/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-23 21:31:53
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-23 21:50:22
 * @FilePath: /ES2015/34-iterator-pattern.js
 * @Description: 迭代器模式
 */ 
// 迭代器设计模式

// 场景：你我协同开发一个任务清单应用

// 我的代码=========================
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '英语'],
  work: ['编程'],

  each() {
    const all = [].concat(this.life, this.learn, this.work)
    all.forEach(item => {
      console.log(item)
    })
  },

  [Symbol.iterator]: function() {
    const self = this
    let index = 0
    const all = [...this.life, ...this.learn, ...this.work]
    return {
      next: function() {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }

}

todos.each()
console.log('----------------------')
for (let item of todos) {
  console.log(item)
}
