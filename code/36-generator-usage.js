/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-23 22:07:33
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-23 22:22:44
 * @FilePath: /ES2015/36-generator-usage.js
 * @Description: 
 */ 

// 案例1：发号器
// function * creatIdMaker() {
//   let id = 1
//   while (true) {
//     yield id ++
//   }
// }

// const idMaker = creatIdMaker()
// console.log(idMaker.next().value)
// console.log(idMaker.next().value)
// console.log(idMaker.next().value)

// 案例2： 使用Generator 函数实现 iterator方法
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['数学', '语文', '英语'],
  work: ['编程'],
  
  [Symbol.iterator]: function * () {
    const all = [...this.life, ...this.learn, ...this.work]
    for (let item of all) {
      yield item
    }
  }
}

for (let item of todos) {
  console.log(item)
}
