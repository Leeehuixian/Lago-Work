/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-25 22:03:16
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-09-17 11:26:34
 * @FilePath: /02-my-vue-router/src/router/index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from '../vuerouter'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
