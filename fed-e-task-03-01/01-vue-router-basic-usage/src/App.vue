<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:02:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-17 23:01:47
 * @FilePath: /01-vue-router-basic-usage/src/App.vue
 * @Description: 
-->
<template>
  <div id="app">
    <div id="nav">
      <!-- 5.创建连接 -->
      <!-- <router-link to="/">Index</router-link> |
      <router-link to="/detail/12">Detail</router-link> -->
      <router-link to="/" exact>首页</router-link>
      <router-link to="/login" exact>登录</router-link>
      <router-link to="/detail/12" exact>详情页</router-link>
    </div>
    <!-- 4.创建路由组件的占位 -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
