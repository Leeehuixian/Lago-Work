/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-22 09:30:54
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-22 09:40:57
 * @FilePath: /fed-e-task-03-01/minivue/js/dep.js
 * @Description: 
 */
class Dep {
  constructor () {
    // 存储所有的观察者
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发送通知
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}