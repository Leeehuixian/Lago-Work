/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:02:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-16 12:15:28
 * @FilePath: /01-vue-router-basic-usage/src/main.js
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
  // 3.注册路由对象
  router,
  render: h => h(App)
}).$mount('#app')
console.log(vm)