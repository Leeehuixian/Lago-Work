/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-22 09:45:40
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-22 09:55:12
 * @FilePath: /fed-e-task-03-01/minivue/js/watcher.js
 * @Description: 
 */
class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get发生，在get方法中会调用addSub
    this.oldValue = vm[key]
    Dep.target = null
  }

  // 当数据发生变化的时候更新视图
  update () {
    let newValue = this.vm[this.key]
    if (this.oldValue === newValue) {
      return
    }
    this.cb(newValue)
  }
}