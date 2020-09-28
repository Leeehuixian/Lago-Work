<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:02:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-17 23:00:05
 * @FilePath: /01-vue-router-basic-usage/src/views/Index.vue
 * @Description: 
-->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>这里是首页</h1>
    <router-link to="/login">登录</router-link>
    <router-link to="/detail/12">详情页</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
