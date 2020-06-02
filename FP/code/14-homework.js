/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-06-02 06:55:36
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-06-02 20:30:04
 * @FilePath: /FP/code/14-homework.js
 * @Description: 
 */ 

const fp = require('lodash/fp')

const cars = [
  {
    name: 'Audi R8',
    horsepower: 660,
    dollar_value: 7000,
    in_stock: true
  },
  {
    name: 'Pagain Huayra',
    horsepower: 600,
    dollar_value: 8000,
    in_stock: false
  }
]

// 练习1
const isInstock = car => fp.prop('in_stock', car)
const isLastInStock = fp.flowRight(isInstock, fp.last)(cars)

// 练习2
const carName = car => fp.prop('name', car)
const firstCarName = fp.flowRight(carName, fp.first)(cars)

console.log(isLastInStock)
console.log(firstCarName)

// 练习3
let _average =  xs => fp.reduce(fp.add, 0, xs) / xs.length

// let averageDollarValue = cars => {
//   let dollar_values = fp.map((car) => car.dollar_value, cars)
//   return _average(dollar_values)
// }

// 重构
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))(cars)
console.log(averageDollarValue)

// 练习4
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.map(item => (
  {
    ...item,
    name: fp.flowRight(
      _underscore,
      fp.lowerCase
    )(item.name)
  }
))(cars)
console.log(sanitizeNames)