<template>
  <div>MainLayout</div>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>

<style scoped></style>
