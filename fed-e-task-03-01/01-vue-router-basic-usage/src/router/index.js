/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:02:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-16 12:55:56
 * @FilePath: /01-vue-router-basic-usage/src/router/index.js
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../components/Layout.vue'
import Index from '../views/Index.vue'

// 1.注册路由插件
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'index',
        path: '',
        component: Index
      },
      {
        name: 'detail',
        path: 'detail/:id',
        props: true,
        component: () => import('../views/Detail.vue')
      }
    ]
  }
]

// 2.创建router对象
const router = new VueRouter({
  routes
})

export default router
