<template>
  <div class="personal-detail">
    <div class="page-container q-pa-md">
      <!-- 基本信息卡片 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h5 q-mb-md">{{ detail.name }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <!-- 状态展示 -->
              <div class="status-section q-mb-md">
                <q-chip
                  :color="getStatusColor(detail.status)"
                  text-color="white"
                  class="q-mb-sm"
                >
                  {{ getStatusText(detail.status) }}
                </q-chip>
                <div class="text-subtitle1">预计交付日期：{{ formatDate(detail.expectedDeliveryDate) }}</div>
              </div>

              <!-- 项目详情 -->
              <div class="detail-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">定制需求详情</div>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>联系方式</q-item-label>
                      <q-item-label>{{ detail.contact }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>定制类型</q-item-label>
                      <q-item-label>{{ detail.type }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>具体需求</q-item-label>
                      <q-item-label>{{ detail.requirements }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>预算范围</q-item-label>
                      <q-item-label>￥{{ detail.budgetMin }} - ￥{{ detail.budgetMax }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <!-- 参考图片 -->
              <div v-if="detail.referenceImages?.length" class="images-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">参考图片</div>
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="(img, index) in detail.referenceImages"
                    :key="index"
                    class="col-4 col-sm-3"
                  >
                    <q-img
                      :src="img"
                      :ratio="1"
                      class="rounded-borders cursor-pointer"
                      @click="openImagePreview(img)"
                    />
                  </div>
                </div>
              </div>

              <!-- 附件 -->
              <div v-if="detail.attachments?.length" class="attachments-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">相关附件</div>
                <q-list bordered separator>
                  <q-item
                    v-for="file in detail.attachments"
                    :key="file.url"
                    clickable
                    @click="downloadFile(file)"
                  >
                    <q-item-section avatar>
                      <q-icon name="attach_file" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ file.name }}</q-item-label>
                      <q-item-label caption>{{ formatFileSize(file.size) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <!-- 右侧信息 -->
            <div class="col-12 col-md-4">
              <!-- 定制费用 -->
              <q-card bordered class="q-mb-md">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">定制费用</div>
                  <div class="text-h5 q-mb-md">￥{{ detail.targetAmount }}</div>
                  <q-btn
                    color="primary"
                    class="full-width"
                    @click="startCustomization"
                  >
                    开始定制
                  </q-btn>
                </q-card-section>
              </q-card>

              <!-- 定制师信息 -->
              <q-card bordered v-if="detail.designer">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">定制师信息</div>
                  <div class="designer-info">
                    <q-avatar size="80px" class="q-mb-sm">
                      <img :src="detail.designer?.avatar">
                    </q-avatar>
                    <div class="text-h6">{{ detail.designer?.name }}</div>
                    <div class="text-caption">{{ detail.designer?.title }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 项目进度 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">定制进度</div>
          <q-timeline color="primary">
            <q-timeline-entry
              v-for="(progress, index) in detail.progressList"
              :key="index"
              :title="progress.title"
              :subtitle="formatDate(progress.time)"
              :color="progress.color"
            >
              <div>{{ progress.description }}</div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { api } from '~/utils/axios'

interface Progress {
  title: string
  time: string
  description: string
  color: string
}

interface Attachment {
  name: string
  url: string
  size: number
}

interface Designer {
  name: string
  avatar: string
  title: string
}

interface DetailData {
  name: string
  contact: string
  type: string
  requirements: string
  budgetMin: number
  budgetMax: number
  expectedDeliveryDate: string
  referenceImages: string[]
  attachments: Attachment[]
  status: string
  progressList: Progress[]
  targetAmount: number
  designer?: Designer
}

const detail = ref<DetailData>({} as DetailData)

onMounted(async () => {
  try {
    const response = await api.get('/custom/personal/detail/1')
    if (response.data.succ) {
      detail.value = response.data.data
    }
  } catch (error) {
    console.error('获取定制详情失败:', error)
  }
})

const formatDate = (dateStr: string) => {
  return date.formatDate(dateStr, 'YYYY-MM-DD HH:mm')
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'orange',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red'
  }
  return statusMap[status] || 'grey'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待处理',
    processing: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

const openImagePreview = (img: string) => {
  // 实现图片预览逻辑
}

const downloadFile = (file: Attachment) => {
  window.open(file.url, '_blank')
}

const startCustomization = () => {
  // 实现开始定制逻辑
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.status-section {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}

.detail-section, .images-section, .attachments-section {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
}

.designer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
