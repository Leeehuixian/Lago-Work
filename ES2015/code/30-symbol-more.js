/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-21 06:48:26
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-21 07:16:36
 * @FilePath: /ES2015/30-symbol-more.js
 * @Description: Symbol的补充
 */ 
// 使用symbol需要注意的点
// 1.唯一性：使用symbol生成的值一定是唯一的，即便是传入相同的字符串描述
console.log(Symbol('foo') === Symbol('foo')) // false
// 可以使用Symbol的内置方法Symbol.for()得到两个值相等的Symbol
console.log(Symbol.for('foo') === Symbol.for('foo')) // true
// 但是由于Symbol.for()内部是将字符串与Symbol()进行一一对应，所以要注意！！！给Symbol.for()传入任意类型的值都会被转换成字符串
console.log(Symbol.for(true) === Symbol.for('true')) // true

// 2.Symbol的内置常量
console.log(Symbol.iterator)
console.log(Symbol.hasInstance)
// const obj = {}
// console.log(obj.toString()) // [object Object]
const obj = {
  [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString()) // [object XObject]

// 3.对象的Symbol属性无法通过传统的方法枚举出来，也体现了对象Symbol属性的私有性
const person = {
  [Symbol('name')]: 'Tom',
  age: 18
}
for(let key in person){
  console.log(key) // 只打印出age，Symbol属性会被忽略
}
console.log(Object.keys(person)) //[ 'age' ] 同样获取不到Symbol属性
console.log(JSON.stringify(person)) // {"age":18} Symbol属性也会被忽略掉

// 如何获取Symbol类型的属性？用Object.getOwnPropertySymbols()获取对象的Symbol类型的属性名 VS Object.keys()获取到的都是对象的字符串类型的属性名
console.log(Object.getOwnPropertySymbols(person)) // [ Symbol(name) ]