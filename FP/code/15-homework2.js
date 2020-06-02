/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-06-02 20:52:09
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-06-02 21:47:16
 * @FilePath: /FP/code/15-homework2.js
 * @Description: 
 */ 

const fp = require('lodash/fp')

class Container {
  static of (value) {
    return new Container(value)
  }

  constructor (value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (value) {
    return new Maybe(value)
  }

  constructor (value) {
    this._value = value
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }

  map(fn) {
    return Maybe.of(this.isNothing() ? this : fn(this._value))
  }
}

//练习1：使用fp.add(x,y) 和fp.map(f, x)创建一个能让functor里的值增加的函数ex1
let maybe = Maybe.of([5, 6, 1])
// 使每个元素都增加 x
let ex1 = x => maybe.map(fp.map(item => fp.add(item, x)))
console.log(ex1(2)._value)

// 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.first)
console.log(ex2._value)

// 练习3：实现一个函数ex3， 使用safeProp和fp.first找到user的首字母
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let user = { id: 2, name: 'Albert' }
let ex3 = safeProp('name')(user).map(fp.first)
console.log(ex3._value)

// 练习4：使用Maybe重写ex4, 不要有if语句
// let ex4 = n => {
//   if (n) { return parseInt(n)}
// }

// 重构ex4
let ex4 = n =>  Maybe.of(n).map(parseInt)
console.log(ex4(10.2)._value)
