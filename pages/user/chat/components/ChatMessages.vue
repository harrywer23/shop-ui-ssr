<template>
  <div class="chat-messages" ref="messageContainer">
    <div v-if="loading" class="loading-history">
      <q-spinner color="primary" size="2em" />
      <span>{{ t('chat.loadingHistory') }}</span>
    </div>
    
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="message"
      :class="msg.type"
    >
      <div class="message-content">
        <div class="message-sender">{{ msg.sender }}</div>
        <div class="message-text" v-html="formatMessage(msg.text)"></div>
        <div class="message-time">{{ formatTime(msg.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const messageContainer = ref(null)

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const formatMessage = (text) => {
  return text.replace(/\n/g, '<br>')
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString()
}

const scrollToBottom = () => {
  setTimeout(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  }, 100)
}

watch(() => props.messages.length, () => {
  scrollToBottom()
})

defineExpose({
  scrollToBottom
})
</script>

<style lang="scss" scoped>
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
  
  .loading-history {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 10px;
    color: #666;
  }
  
  .message {
    margin-bottom: 10px;
    display: flex;
    
    &.sent {
      justify-content: flex-end;
      
      .message-content {
        background: #007AFF;
        color: white;
      }
    }
    
    &.received .message-content {
      background: white;
    }
    
    .message-content {
      max-width: 70%;
      padding: 10px;
      border-radius: 10px;
      
      .message-sender {
        font-size: 12px;
        margin-bottom: 4px;
      }
      
      .message-time {
        font-size: 10px;
        opacity: 0.7;
        margin-top: 4px;
        text-align: right;
      }
    }
  }
}
</style> 