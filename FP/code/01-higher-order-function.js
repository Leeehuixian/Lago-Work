/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 21:10:41
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 21:25:55
 * @FilePath: /FP/code/01-higher-order-function.js
 * @Description: 高阶函数-函数作为参数
 */

// 定义一个方法模拟forEach
function forEach(array, fn) {
  for(let i = 0; i < array.length; i++) {
    fn(array[i])
  }
}

// 测试
// let arr = [1, 2, 3, 4, 5]
// forEach(arr, function(item) {
//   console.log(item)
// })

// 定义一个函数模拟filter
function filter (array, fn) {
  let results = []
  for(let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      results.push(array[i])
    }
  }
  return results
}

// 测试
let arr = [1, 2, 3, 4, 5]
let r = filter(arr, function (item) {
  return item % 2 === 0
})
console.log(r)


