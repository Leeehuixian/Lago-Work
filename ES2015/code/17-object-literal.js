/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-19 23:35:27
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-20 22:20:39
 * @FilePath: /ES2015/17-object-literal.js
 * @Description: 对象字面量的增强
 */ 
const bar = '123'
const obj = {
  // bar: bar,
  // 对象的值是一个变量，属性名跟变量名相同，可以简写, 上面的写法等同于
  bar,
  // method1: function() {
  //   console.log('method1')
  // },
  // 对象的方法，可以简写，上面的写法等同于
  method1() {
    console.log('method1')
    console.log(this) // this指向对象本身
  },
  // 计算属性名，可以使用任意表达式，表达式的结果将作为属性名
  [Math.random()]: '456'
}
obj.method1()
// ES2015 对象字面量可以用表达式的返回值作为对象的属性名，在此之前，只能等对象声明过后，用索引值的形式及[]的方式来动态添加不符合变量名规范的名称
// obj[Math.random()] = '456'
// 
console.log(obj)