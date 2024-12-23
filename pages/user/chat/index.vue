<template>
  <div class="chat-page">
    <ChatSidebar />
    <ChatMain />
  </div>
</template>

<script setup>
import ChatSidebar from './components/ChatSidebar.vue'
import ChatMain from './components/ChatMain.vue'
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  height: calc(100vh - 64px);
  background: #f5f5f5;
}
</style> 