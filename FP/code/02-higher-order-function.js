/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-29 21:28:07
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-29 22:23:18
 * @FilePath: /FP/code/02-higher-order-function.js
 * @Description: 高阶函数-函数作为返回值
 */ 

// function makeFn() {
//   let msg = 'Hello Higher-order Function'
//   return function() {
//     console.log(msg)
//   }
// }

// let fn = makeFn()
// fn()

// 定义一个只能执行一次的函数 once
function once(fn) {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      return fn.apply(this, arguments)
    }
  }
}

// 测试
let pay = once(function (money) {
  console.log(`支付：${money} RMB`)
})

pay(5)
pay(5)
pay(5)
pay(5)
pay(5)