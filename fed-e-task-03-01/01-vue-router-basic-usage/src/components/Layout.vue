<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-08-16 12:44:35
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-08-16 12:50:08
 * @FilePath: /01-vue-router-basic-usage/src/components/LayOut.vue
 * @Description: 
-->
<template>
  <div class="layout">
    <div class="page-header">
      <img src="../assets/logo.png" />
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div class="page-footer">
      Footer
    </div>
  </div>
</template>