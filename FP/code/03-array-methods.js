/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-30 08:13:09
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-30 08:28:32
 * @FilePath: /FP/code/03-array-methods.js
 * @Description: 常用的高阶函数
 */ 


function map(array, fn) {
  let result = []
  for (let value of array) {
    if (fn(value)) {
      result.push(value)
    }
  }
  return result
}

// 测试
let arr = [1, 2, 3, 4, 5]
const res = map(arr, item => item % 2 === 0)
console.log(res)

function every (array, fn) {
  let result = true
  for (let value of array) {
    if (!fn(value)) {
      result = false
      break
    }
  }
  return result
}

// 测试
const res2 = every(arr, item => item < 5)
console.log(res2)

function some (array, fn) {
  let result = false
  for (let value of array) {
    if (fn(value)) {
      result = true
      break
    }
  }
  return result
}

// 测试
const res3 = some(arr, item => item > 4)
console.log(res3)