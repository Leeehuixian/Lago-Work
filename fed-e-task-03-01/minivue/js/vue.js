/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-09-18 15:51:13
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-21 20:53:18
 * @FilePath: /fed-e-task-03-01/minivue/js/vue.js
 * @Description: 
 */
class Vue {
  constructor (options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$methods = options.methods || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2.把data中的成员转换成getter 和 setter，注入到vue实例中
    this._proxyData(this.$data)
    // 把methods中的成员注入到vue实例中
    this._proxyMethods(this.$methods)
    // 3.调用observe对象, 监听数据的变化
    new Observer(this.$data)
    // 4.调用compile对象, 解析指令和插值表达式
    new Compiler(this)
  }
  _proxyData (data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 把data的属性注入到vue实例中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[key]
        },
        set (newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
  _proxyMethods(methods) {
    Object.keys(methods).forEach(key => {
      // 把methods的成员注入到vue实例中
      this[key] = methods[key]
    })
  }
}