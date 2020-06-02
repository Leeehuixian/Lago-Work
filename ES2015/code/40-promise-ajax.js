/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-05-24 17:38:22
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-05-24 23:11:15
 * @FilePath: /ES2015/40-promise-ajax.js
 * @Description: 
 */ 

// Promise 方式的AJAX
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

ajax('/api/users.json').then((res) => {
  console.log(res)
}, error => {
  console.log(error)
})
