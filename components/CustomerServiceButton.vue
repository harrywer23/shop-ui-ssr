<template>
  <q-btn
    class="customer-service-btn"
    color="primary"
    icon="headset_mic"
    :loading="loading"
    @click="createServiceChat"
  >
    <q-tooltip>{{ t('chat.contactCustomerService') }}</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { api } from '~/utils/axios'

const router = useRouter()
const { t } = useI18n()
const $q = useQuasar()
const loading = ref(false)

const createServiceChat = async () => {
  loading.value = true
  try {
    const response = await api.get('/chat/room/service')
    const { code, data } = response.data
    
    if (code === 200 && data) {
      // 创建成功后跳转到聊天页面
      await router.push({
        path: '/user/chat',
        query: { 
          roomId: data.id,
          type: 'service'
        }
      })
    } else {
      throw new Error(response.data.msg || '创建客服聊天失败')
    }
  } catch (error) {
    console.error('创建客服聊天失败:', error)
    $q.notify({
      type: 'negative',
      message: t('chat.createServiceChatFailed'),
      timeout: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.customer-service-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  
  &::before {
    border-radius: 50%;
  }
}
</style> 