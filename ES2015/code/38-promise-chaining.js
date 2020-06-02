/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-24 11:01:45
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-24 11:26:54
 * @FilePath: /ES2015/38-promise-ajax.js
 * @Description: 
 */ 

//  总结
// Promise对象的then方法会返回一个全新的Promise对象，所以可以链式调用
// 后面的then方法就是在为上一个then返回的Promise注册回调
// 前面then方法中回调函数的返回值会作为后面then方法回调的参数
// 如果回调中返回的是Promise,那后面then方法的回调会等待他的结束
const promise = new Promise(function(resolve, reject) {
  resolve(100)
})

promise
  .then(function(res){
    console.log(res)
    return new Promise(function(resolve, reject) {
      resolve(200)
    })
  })
  .then(function(res) {
    console.log(res)
    console.log(111111111)
    return 'foo'
  })
  .then(function(res) {
    console.log(res)
    console.log(222222222)
  })
  .then(function(res) {
    console.log(333333333)
  })
  .then(function(res) {
    console.log(444444444)
  })

