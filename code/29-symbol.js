/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-20 22:45:00
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-21 06:48:55
 * @FilePath: /ES2015/29-symbol.js
 * @Description: symbol数据类型
 */ 
// ES2015以前对象的属性都是字符串，字符串存在重复的问题，由此产生了symbol表示独一无二的值
// 用Symbol生成的数值都是独一无二的
const s = Symbol()
console.log(s)
console.log(Symbol() === Symbol()) // false
// 由于Symbol独一无二的特性，主要用来为对象添加独一无二的属性名
// const obj = {
//   [Symbol()]: 123
// }
// console.log(obj)

// 也可以用来模拟对象的私有属性
// a.js=====================
const name = Symbol()
const obj = {
  [name]: '123',
  say() {
    console.log(this[name])
  }
}
// console.log(obj)

// bar.js==================
console.log(obj[Symbol()]) // undefined
obj.say() // 123
