/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-18 17:24:45
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-22 09:43:57
 * @FilePath: /fed-e-task-03-01/minivue/js/observer.js
 * @Description: 
 */
class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    // 1.判断data是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive (obj, key, val) { // 之所以传递第三个参数val，而不使用obj[key]，是为了避免发生死递归而报错，因为在使用obj的时候会触发get
    let that = this
    let dep = new Dep()
    this.walk(val) // 如果val是对象，把val内部的属性转换成响应式数据
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val // 闭包，扩展了val的作用域
      },
      set (newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}