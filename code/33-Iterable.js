/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-23 21:08:00
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-23 21:29:45
 * @FilePath: /ES2015/33-Iterable.js
 * @Description: 实现可迭代接口
 */ 

// 搞清楚Iterator的结构，Iterable、Iterator、IterationResult
// const obj = { // Iterable
//   foo: 'bar',
//   [Symbol.iterator]: function() {
//     return { // iterator
//       next: function() {
//         return { // IterationResult
//           value: 'zce',
//           done: true // 迭代有没有结束
//         }
//       }
//     }
//   }
// }

const obj = {
  store: ['foo', 'bar', 'baz'],
  [Symbol.iterator]: function() {
    const self = this
    let index = 0
    return {
      next: function() {
        return {
          value: self.store[index],
          done: index++ >= self.store.length
        }
      }
    }
  }
}

for (const item of obj) {
  console.log(item)
}


