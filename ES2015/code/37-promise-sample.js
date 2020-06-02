/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-24 10:30:23
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-24 23:12:06
 * @FilePath: /ES2015/37-promise-sample.js
 * @Description: 
 */ 

// const promise = new Promise(function(resolve, reject) {
//   for (let i = 0; i < 5; i++) {
//     // “兑现”承诺
//     console.log(i)
//     if (i > 5) {
//       resolve(i) // 把promise的状态改为onFullfilled
//     } else {
//       reject(i) // 把promise的状态onRejected
//     }
//   }
// })

// 注意：无论promise中是否有异步执行的任务，promise的then回调函数都会被放到最后执行
// promise.then(function(res) { // resolve的回调函数
//   console.log('resolve', res)
// }, function(err) { // reject的回调函数
//   console.log('reject', err)
// })

// console.log('111111')

// const foo = function () {
//   for (let i = 0; i < 5; i++) {
//     if (i < 5) {
//       console.log(i)
//       sum(i)
//     } else if (i === 3){
//       cheng(i)
//     }
//   }
// }

// let result = 0
// function sum(i) {
//   result += i
//   console.log('result', result)
// }

// let result2 = 1
// function cheng(i) {
//   result2 = result2 * i
//   console.log('result2', result2)
// }

// foo()

// const promise = new Promise((resolve, reject) => {
//   resolve('success1')
//   reject('error')
//   resolve('success2')
// })

// promise.then((res) => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })

// Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)

Promise.resolve('hello')
	.then((res) => {
		let b = ' lagou'
		return Promise.resolve(`${res}${b}`)
	})
	.then(res => {
		let c = ' I love you'
    return Promise.resolve(`${res}${c}`)
	})
	.then(res => {
		console.log(res)
	})
