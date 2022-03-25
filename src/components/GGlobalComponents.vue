<template>
  <div></div>
</template>

<script lang="ts" setup>
// 注册全局组件
import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'
function registerGlobalComponents() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notify = useNotification()
  console.log('全局消息组件注册完毕')
}
registerGlobalComponents()
</script>
<style scoped></style>
