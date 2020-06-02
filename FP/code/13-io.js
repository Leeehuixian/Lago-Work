/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-31 22:04:16
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-31 22:12:15
 * @FilePath: /FP/code/13-io.js
 * @Description: 
 */

const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用
const r = IO.of(process).map(p => p.execPath)
console.log(r)
console.log(r._value())
