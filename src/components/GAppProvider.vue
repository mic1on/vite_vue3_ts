<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-message-provider placement="top">
        <n-notification-provider :max="3">
          <slot></slot>
          <g-global-components></g-global-components>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>
<script setup lang="ts"></script>
<style lang="css" scoped></style>
