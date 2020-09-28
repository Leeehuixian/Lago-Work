<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-25 22:03:16
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-25 22:05:35
 * @FilePath: /02-my-vue-router/src/views/Home.vue
 * @Description: 
-->
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
