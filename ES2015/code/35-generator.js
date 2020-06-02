/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-23 21:51:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-23 22:33:08
 * @FilePath: /ES2015/35-generator.js
 * @Description: 生成器函数：避免异步编程中回调嵌套太深
 */ 

// function * foo () {
//   console.log('lhx')
//   return 100
// }

// const result = foo()
// console.log(result.next())

function * foo() {
  console.log(1111)
  yield 100 // yield 与return不同，yield不会阻断函数的执行
  console.log(2222)
  yield 200
  console.log(3333)
  yield 300
}

// 生成器函数也实现了iterator接口及迭代器的协议
const generator = foo()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

// 生成器函数可以自动返回一个生成器对象，调用对象的next方法，才会让函数的函数体开始执行，执行过程中遇到yield关键字，执行会被暂停，yield的value会被作为next的结果返回，继续调用next，函数会从暂停的位置继续执行，执行next返回的done变为false
// 生成器函数的特性：惰性执行