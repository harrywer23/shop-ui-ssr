<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="contact-info">
        <div class="name">{{ currentContact?.name }}</div>
        <div class="status">{{ currentContact?.status }}</div>
      </div>
      <q-btn
        flat
        round
        icon="people"
        @click="showOnlineUsers = !showOnlineUsers"
      >
        <q-tooltip>{{ t('chat.onlineUsers') }}</q-tooltip>
      </q-btn>
    </div>
    
    <div class="chat-content">
      <ChatMessages
        ref="messagesRef"
        :messages="messages"
        :loading="loading"
      />
      
      <div 
        class="online-users-sidebar"
        :class="{ 'is-visible': showOnlineUsers }"
      >
        <div class="sidebar-header">
          <span>{{ t('chat.onlineUsers') }} ({{ onlineUsers.length }})</span>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="showOnlineUsers = false"
          />
        </div>
        
        <div class="users-list">
          <div
            v-for="user in onlineUsers"
            :key="user.id"
            class="user-item"
          >
            <q-avatar size="32px">
              <img :src="user.avatar" :alt="user.name">
            </q-avatar>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-status">
                <span class="status-dot"></span>
                {{ t('chat.online') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ChatInput
      v-model="newMessage"
      @send="sendMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { API_CONSTANTS } from '~/utils/constants'
import { useCookie } from '#app'
import { socketManager } from '~/utils/socket'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'

const { t } = useI18n()
const $q = useQuasar()
const messages = ref([])
const loading = ref(false)
const newMessage = ref('')
const messagesRef = ref(null)
const currentContact = ref(null)
const showOnlineUsers = ref(false)
const onlineUsers = ref([])

// 获取token
const token = useCookie('token')

// 设置socket事件监听器
const setupSocketListeners = () => {
  socketManager.on('connect', () => {
    console.log('Socket connected successfully:', {
      socketId: socketManager.getSocket()?.id,
      timestamp: new Date().toISOString()
    })
    
    const authData = { 
      token: token.value,
      userId: currentContact.value?.id 
    }
    console.log('Sending authentication data:', {
      userId: authData.userId,
      hasToken: !!authData.token,
      timestamp: new Date().toISOString()
    })
    socketManager.emit('authenticate', authData)
  })
  
  socketManager.on('connect_error', (error) => {
    console.error('Socket connection error:', {
      error: error.message,
      type: error.type,
      description: error.description,
      stack: error.stack
    })
    
    console.error('Connection details:', {
      url: API_CONSTANTS.CHAT_SOCKET_URL,
      token: token.value ? 'present' : 'missing',
      socketId: socketManager.getSocket()?.id,
      readyState: socketManager.getSocket()?.io?.engine?.readyState,
      transport: socketManager.getSocket()?.io?.engine?.transport?.name
    })
    
    const errorMessage = error.message === 'xhr poll error' 
      ? t('chat.connectionError')
      : error.message
    $q.notify({
      type: 'negative',
      message: errorMessage,
      timeout: 5000
    })
  })
  
  socketManager.on('disconnect', (reason) => {
    console.error('Socket disconnected:', {
      reason,
      wasConnected: socketManager.getSocket()?.connected,
      socketId: socketManager.getSocket()?.id,
      reconnecting: socketManager.getSocket()?.io?.reconnecting
    })
    $q.notify({
      type: 'warning',
      message: `${t('chat.disconnected')} (${reason})`,
      timeout: 3000
    })
  })
  
  socketManager.on('message', (msg) => {
    console.log('Received message:', {
      message: msg,
      timestamp: new Date().toISOString(),
      socketId: socketManager.getSocket()?.id
    })
    messages.value.push({
      type: 'received',
      sender: msg.sender,
      text: msg.text,
      time: new Date()
    })
    messagesRef.value?.scrollToBottom()
  })
  
  socketManager.on('authenticated', () => {
    console.log('Socket authenticated successfully:', {
      socketId: socketManager.getSocket()?.id,
      timestamp: new Date().toISOString()
    })
  })
  
  socketManager.on('unauthorized', (error) => {
    console.error('Socket authentication failed:', {
      error,
      socketId: socketManager.getSocket()?.id,
      timestamp: new Date().toISOString()
    })
    $q.notify({
      type: 'negative',
      message: t('chat.authenticationFailed'),
      timeout: 5000
    })
  })
  
  // 监听在线用户更新
  socketManager.on('users', (users) => {
    onlineUsers.value = users
  })
  
  // 用户加入
  socketManager.on('userJoined', (user) => {
    if (!onlineUsers.value.find(u => u.id === user.id)) {
      onlineUsers.value.push(user)
    }
  })
  
  // 用户离开
  socketManager.on('userLeft', (userId) => {
    onlineUsers.value = onlineUsers.value.filter(u => u.id !== userId)
  })
}

// 加载历史消息
const loadHistoryMessages = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_CONSTANTS.CHAT_URL}/chat/message/history`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })
    const data = await response.json()
    if (data.code === 200) {
      messages.value = data.data.map(msg => ({
        ...msg,
        time: new Date(msg.time)
      }))
    }
  } catch (error) {
    console.error('加载历史消息失败:', error)
    $q.notify({
      type: 'negative',
      message: t('chat.loadHistoryFailed')
    })
  } finally {
    loading.value = false
  }
}

// 连接Socket服务器并发送认证信息
onMounted(async () => {
  console.log('Component mounted')
  await loadHistoryMessages()
  socketManager.initialize()
  setupSocketListeners()
})

// 断开连接
onUnmounted(() => {
  socketManager.disconnect()
})

// 发送消息
const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  if (!socketManager.isConnected()) {
    console.error('Cannot send message - socket not connected')
    $q.notify({
      type: 'negative',
      message: t('chat.connectionError')
    })
    socketManager.initialize()
    return
  }
  
  const messageData = {
    text: newMessage.value,
    sender: currentContact.value?.name || 'Me',
    time: new Date(),
    room: currentContact.value?.id || 'public'
  }
  
  console.log('Sending message:', {
    messageData,
    socketId: socketManager.getSocket()?.id,
    timestamp: new Date().toISOString()
  })
  
  // 通过socket发送消息
  socketManager.emit('chatMessage', messageData, (response) => {
    console.log('Message send response:', {
      response,
      messageData,
      socketId: socketManager.getSocket()?.id,
      timestamp: new Date().toISOString()
    })
    
    if (response.success) {
      messages.value.push({
        ...messageData,
        type: 'sent'
      })
      newMessage.value = ''
      messagesRef.value?.scrollToBottom()
    } else {
      console.error('Failed to send message:', {
        error: response.error,
        messageData,
        socketId: socketManager.getSocket()?.id,
        timestamp: new Date().toISOString()
      })
      $q.notify({
        type: 'negative',
        message: response.error || t('chat.sendFailed')
      })
    }
  })
}

defineExpose({
  setCurrentContact(contact) {
    currentContact.value = contact
  }
})
</script>

<style lang="scss" scoped>
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .chat-header {
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .contact-info {
      .name {
        font-size: 16px;
        font-weight: 500;
      }
      
      .status {
        font-size: 12px;
        color: #666;
      }
    }
  }
  
  .chat-content {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
    
    .online-users-sidebar {
      position: absolute;
      right: -300px;
      top: 0;
      bottom: 0;
      width: 300px;
      background: white;
      border-left: 1px solid #ddd;
      transition: right 0.3s ease;
      display: flex;
      flex-direction: column;
      
      &.is-visible {
        right: 0;
      }
      
      .sidebar-header {
        padding: 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
      }
      
      .users-list {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        
        .user-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          
          &:hover {
            background: #f5f5f5;
          }
          
          .user-info {
            margin-left: 10px;
            
            .user-name {
              font-weight: 500;
            }
            
            .user-status {
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #666;
              
              .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #4caf50;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style> 