/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-22 16:42:06
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-22 17:23:38
 * @FilePath: /ES2015/31-for-of.js
 * @Description: for...of循环
 */ 

// ES中有有很多遍历数据的方法
// for适合遍历普通的数组
// for...in 适合遍历键值对
// Array.forEach()
// 以上方法都有一定的局限性，ES2015引入了全新的for...of循环-作为遍历所有数据结构的统一方式
// for...of循环的基本用法
const arr = [100, 200, 300, 400, 500]
// for(const item of arr) {
//   console.log(item)
//   if (item > 200) {
//     break
//   }
// }

// 1.for...of可以替代Array.forEach()遍历数组，且可以用break跳出循环，但是Array.forEach()是不能跳出循环的
// arr.forEach(item => {
//   console.log(item)
//   // if (item > 200) {
//   //   break //报错：Illegal break statement
//   // }
// })
// let isBreaked = arr.some(item => {
//   console.log(item)
//   return item > 200
// }) // true

// let isBreaked = arr.every(item => { // false
//   console.log(item)
//   return item > 200
// })
// console.log(isBreaked)

// 2.遍历Set
// const s = new Set(['123', '456'])
// for (const item of s) {
//   console.log(item)
// }

// 3.遍历Map， 配合数组的解构语法，可以拿到每一对键值
// const m = new Map()
// m.set('foo', 123).set('bar', 456)
// for ( const [key, value] of m) {
//   console.log(key, value) 
// }

// 4.遍历普通的对象， 思考为什么遍历对象报错？？？
const obj = {
  name: 'Tom',
  age: 18
}
for (const item of obj) {
  console.log(item) // 报错：obj is not iterable
}