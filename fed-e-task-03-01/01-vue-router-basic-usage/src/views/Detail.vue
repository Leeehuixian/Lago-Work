<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:02:12
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-16 12:28:52
 * @FilePath: /01-vue-router-basic-usage/src/views/detail.vue
 * @Description: 
-->
<template>
  <div class="about">
    <!-- 方式一：通过$route.params.id接收参数 -->
    <h1>通过当前路由规则获取：{{ $route.params.id }}</h1>

    <br>

    <!-- 方式二：通过props接收参数 -->
    <h1>通过开启 props 获取：{{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id']
}
</script>
