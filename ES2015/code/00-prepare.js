/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-18 13:21:59
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-18 22:54:44
 * @FilePath: /ES2015/00-prepare.js
 * @Description: 
 */ 
class Car {
  constructor (name, color, price) {
    this.name = name
    this.color = color
    this.price = price
  }

  intro() {
    console.log(`I am ${this.name}, my color is ${this.color}, my price is ${this.price}`)
  }
}

const BMW = new Car('BMW', 'White', '80W')
BMW.intro()
