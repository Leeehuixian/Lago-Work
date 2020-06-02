/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-23 20:54:36
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-23 21:21:30
 * @FilePath: /ES2015/32-iterator.js
 * @Description: Iterator(迭代器)
 */ 

// 实现iterator接口是for...of循环的前提

const arr = [100, 200, 300, 400]
console.log(arr[Symbol.iterator]())
const iterator = arr[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())


// iterator接口的特点
// 1. 内部需要挂载Iterator方法
// 2. Iterator方法返回带有next方法的对象
// 3. 不断调用这个对象的next方法从而实现遍历

