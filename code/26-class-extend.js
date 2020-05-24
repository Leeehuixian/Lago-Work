/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-18 22:54:36
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-18 23:28:01
 * @FilePath: /ES2015/26-class-extend.js
 * @Description: 
 */
class Computer {
  add(val1, val2) {
    return val1 + val2
  }

  reduce(val1, val2) {
    console.log(val1 - val2)
    return val1 - val2
  }
}

class ComputerPro extends Computer {
  mul(val1, val2) {
    console.log(val1 * val2)
    return val1 * val2
  }
}

const com1 = new ComputerPro()
let result = com1.add(1, 2)
console.log(result)

