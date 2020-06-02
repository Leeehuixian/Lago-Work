/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-31 17:14:22
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-31 18:03:41
 * @FilePath: /FP/code/10-may-be.js
 * @Description: MyBe函子（处理外部的空值情况）
 */ 

class MyBe {
  static of (value) {
    return new MyBe(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this.isNothing() ? MyBe.of(null) : MyBe.of(fn(this._value))
  }

  isNothing () {
    return this._value === null || this._value === undefined
  }
}

const r = MyBe.of('hello world')
  .map(x => x.toUpperCase())
  .map(x => null)
  .map(x => x.split(' '))
  console.log(r)
