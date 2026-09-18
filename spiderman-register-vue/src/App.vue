<script setup>
import Toast from './components/Toast.vue'
// 根组件：承载路由视图 + 全局 Toast
</script>

<template>
  <router-view />
  <Toast />
</template>
