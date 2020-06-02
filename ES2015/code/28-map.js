/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-19 22:59:19
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-19 23:28:14
 * @FilePath: /ES2015/28-map.js
 * @Description: Map数据结构
 */ 

// Map类似EMACScript中的对象，都是键值对的集合，只不过对象的键只能是字符串类型的, 定义非字符串类型的键，也都会被转换成字符串，这种情况导致没法定义复杂的数据结构
const obj = {}
// obj[true] = 'value'
// obj[123] = 'value'
// obj[{ a: 1 }] = 'value'
// console.log(obj) // { '123': 'value', true: 'value', '[object Object]': 'value' }

// 而Map就是严格意义上的键值对集合，用来映射两个任意类型的数据之间的对应关系，可以用任意类型的数据作为键
const m = new Map() // 用Map构造函数穿件Map实例
const tom = { name: 'tom' }
// set方法添加键值对, 可以指定任意类型的键，而不用担心被转换为字符串
m.set(tom, 90)
console.log(m)
// get方法获取键对应的值
console.log(m.get(tom))
// has方法判断某一个键是否存在
// console.log(m.has('jan')) // false
// delete方法删除键值对
// m.delete(tom)
// clear清空Map中所有的键值对
// m.clear()
// console.log(m)
// forEach方法遍历Map的键值对
m.forEach((value, key) => { // ！注意参数的顺序
  console.log(value, key)
})



