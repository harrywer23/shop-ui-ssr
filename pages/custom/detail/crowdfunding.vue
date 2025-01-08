<template>
  <div class="crowdfunding-detail">
    <div class="page-container q-pa-md">
      <!-- 基本信息卡片 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h5 q-mb-md">{{ detail.name }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <!-- 进度条 -->
              <div class="progress-section q-mb-md">
                <div class="row items-center justify-between q-mb-sm">
                  <div class="text-h6">￥{{ detail.currentAmount }}</div>
                  <div class="text-subtitle1">目标: ￥{{ detail.targetAmount }}</div>
                </div>
                <q-linear-progress
                  :value="detail.currentAmount / detail.targetAmount"
                  color="primary"
                  class="q-mb-sm"
                />
                <div class="row items-center justify-between text-caption">
                  <span>{{ detail.supportCount }} 支持者</span>
                  <span>剩余 {{ getRemainingDays(detail.endTime) }} 天</span>
                </div>
              </div>

              <!-- 项目详情 -->
              <div class="detail-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">项目详情</div>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>联系方式</q-item-label>
                      <q-item-label>{{ detail.contact }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>类型</q-item-label>
                      <q-item-label>{{ detail.type }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>需求描述</q-item-label>
                      <q-item-label>{{ detail.requirements }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>预算范围</q-item-label>
                      <q-item-label>￥{{ detail.budgetMin }} - ￥{{ detail.budgetMax }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label caption>预计交付日期</q-item-label>
                      <q-item-label>{{ formatDate(detail.expectedDeliveryDate) }}</q-item-label>
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
                      class="rounded-borders"
                      @click="openImagePreview(img)"
                    />
                  </div>
                </div>
              </div>

              <!-- 附件 -->
              <div v-if="detail.attachments?.length" class="attachments-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">附件</div>
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

            <!-- 回报档位 -->
            <div class="col-12 col-md-4">
              <div class="text-subtitle1 q-mb-sm">支持档位</div>
              <div
                v-for="reward in detail.rewards"
                :key="reward.id"
                class="q-mb-md"
              >
                <q-card bordered>
                  <q-card-section>
                    <div class="text-h6">￥{{ reward.amount }}</div>
                    <div class="text-subtitle2">{{ reward.title }}</div>
                    <p class="text-body2">{{ reward.description }}</p>
                    <div class="row justify-between items-center">
                      <span class="text-caption">
                        已支持 {{ reward.supportCount }}/{{ reward.limitCount }}
                      </span>
                      <q-btn
                        color="primary"
                        :disable="reward.supportCount >= reward.limitCount"
                        @click="supportProject(reward)"
                      >
                        立即支持
                      </q-btn>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 项目进度 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">项目进度</div>
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

interface Reward {
  id: number
  title: string
  amount: number
  description: string
  supportCount: number
  limitCount: number
}

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
  currentAmount: number
  supportCount: number
  startTime: string
  endTime: string
  rewards: Reward[]
}

const detail = ref<DetailData>({} as DetailData)

onMounted(async () => {
  try {
    const response = await api.get('/custom/crowdfunding/detail/1')
    if (response.data.succ) {
      detail.value = response.data.data
    }
  } catch (error) {
    console.error('获取众筹详情失败:', error)
  }
})

const formatDate = (dateStr: string) => {
  return date.formatDate(dateStr, 'YYYY-MM-DD HH:mm')
}

const getRemainingDays = (endTime: string) => {
  const end = new Date(endTime)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const openImagePreview = (img: string) => {
  // 实现图片预览逻辑
}

const downloadFile = (file: Attachment) => {
  window.open(file.url, '_blank')
}

const supportProject = (reward: Reward) => {
  // 实现支持项目逻辑
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.progress-section {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}

.detail-section, .images-section, .attachments-section {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
}
</style>
