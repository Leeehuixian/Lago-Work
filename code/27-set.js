/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-19 13:33:49
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-19 14:02:38
 * @FilePath: /ES2015/27-set.js
 * @Description: set类型
 */ 
const s = new Set()
// add方法会返回集合本身，所以可以链式调用，set成员不允许重复，所以如果add一个已经存在的值，那么所添加的值就会被忽略掉
s.add(1).add(2).add(3).add(4).add(2)
console.log(s) // set {1, 2, 3, 4}

// 遍历集合中的数据
// 1.forEach
// s.forEach(i => console.log(i))
// console.log('--------------------------')
// 2.for ... of
// for(let i of s) {
//   console.log(i)
// }

// size属性获取集合长度,与数组的length相同
// console.log(s.size) // 4

// has方法，判断是否包含某个值
// console.log(s.has(100)) // false

// delete方法，删除某个值
// console.log(s.delete(3)) // 删除成功，返回true
// console.log(s.delete(100)) // 删除不存在的值，返回false
// console.log(s) // Set {1, 2, 4}

// clear方法，清空当前集合的全部内容
// s.clear()
// console.log(s) // Set {}

// 使用场景：数组去重
const arr = ['a', 'b', 'c', 'd', 'd', 'e', 'a']
const result = new Set(arr) //接收arr数组作为Set的初始值，重复的值会被忽略掉，返回值：Set { 'a', 'b', 'c', 'd', 'e' }
// const newArr = Array.from(new Set(arr)) // 用Array.from()把Set转换为数组
// const newArr = [...result] // 展开运算符，在空的数组中，展开Set，Set成员会变成空数组的成员，从而得到去重后的数组[ 'a', 'b', 'c', 'd', 'e' ]
// console.log(newArr)
