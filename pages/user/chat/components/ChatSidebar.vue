<template>
  <div class="chat-sidebar">
    <div class="search-box">
      <q-input
        v-model="searchQuery"
        dense
        outlined
        :placeholder="t('chat.searchContacts')"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    
    <div class="contact-list">
      <div
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="contact-item"
        :class="{ active: currentContact?.id === contact.id }"
        @click="selectContact(contact)"
      >
        <q-avatar size="40px">
          <img :src="contact.avatar" :alt="contact.name">
        </q-avatar>
        <div class="contact-info">
          <div class="contact-name">{{ contact.name }}</div>
          <div class="last-message">{{ contact.lastMessage }}</div>
        </div>
        <div class="contact-meta">
          <div class="time">{{ formatTime(contact.lastTime) }}</div>
          <q-badge
            v-if="contact.unread"
            color="red"
            floating
          >
            {{ contact.unread }}
          </q-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const searchQuery = ref('')
const currentContact = ref(null)

// 模拟联系人数据
const contacts = ref([
  {
    id: 1,
    name: '客服小新',
    avatar: '/images/avatar/service.png',
    lastMessage: '有什么可以帮您的吗？',
    lastTime: new Date(),
    unread: 2
  }
  // 可以添加更多联系人...
])

const filteredContacts = computed(() => {
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectContact = (contact) => {
  currentContact.value = contact
  // 触发事件通知父组件
  emit('select-contact', contact)
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString()
}

const emit = defineEmits(['select-contact'])
</script>

<style lang="scss" scoped>
.chat-sidebar {
  width: 300px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  
  .search-box {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .contact-list {
    flex: 1;
    overflow-y: auto;
    
    .contact-item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #f0f0f0;
      }
      
      &.active {
        background-color: #e3f2fd;
      }
      
      .contact-info {
        flex: 1;
        margin-left: 10px;
        
        .contact-name {
          font-weight: 500;
        }
        
        .last-message {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .contact-meta {
        text-align: right;
        
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style> 