/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-31 10:08:04
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-31 10:16:29
 * @FilePath: /FP/code/07-lodash.js
 * @Description: 
 */ 

// 演示 lodash
// first / last / toUpper / reserve / each / includes / find / findIndex
const _ = require('lodash')

const array = ['jack', 'tom', 'lucy', 'kate']

console.log(_.first(array))
console.log(_.last(array))
console.log(_.toUpper(_.first(array)))
console.log(_.reverse(array))
const r = _.each(array, (item, index) => {
  console.log(item, index)
})

console.log(r)