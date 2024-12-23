<template>
  <div class="custom-detail-page">
    <div class="page-content">
      <!-- 页面标题 -->
      <div class="page-header q-mb-lg">
        <div class="row items-center justify-between">
          <h2 class="text-h5 q-my-none">{{ t('custom.detail.title') }}</h2>
          <q-btn
            flat
            icon="arrow_back"
            :label="t('common.back')"
            color="primary"
            :to="{ name: 'user-custom' }"
          />
        </div>
      </div>

      <!-- 基本信息卡片 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.basicInfo') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <div class="info-item">
                <div class="label">{{ t('custom.apply.name') }}</div>
                <div class="value">{{ detail.name }}</div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="info-item">
                <div class="label">{{ t('custom.apply.contact') }}</div>
                <div class="value">{{ detail.contact }}</div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="info-item">
                <div class="label">{{ t('custom.detail.status') }}</div>
                <div class="value">
                  <q-chip
                    :color="getStatusColor(detail.status)"
                    text-color="white"
                    size="sm"
                  >
                    {{ t(`custom.status.${detail.status}`) }}
                  </q-chip>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="info-item">
                <div class="label">{{ t('custom.detail.expectedDeliveryDate') }}</div>
                <div class="value">{{ formatDate(detail.expectedDeliveryDate) }}</div>
              </div>
            </div>
            <div class="col-12">
              <div class="info-item">
                <div class="label">{{ t('custom.detail.budget') }}</div>
                <div class="value">¥{{ detail.budgetMin?.toLocaleString() }} - ¥{{ detail.budgetMax?.toLocaleString() }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 需求描述 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.requirements') }}</div>
          <div class="requirements-content" v-html="detail.requirements"></div>
        </q-card-section>
      </q-card>

      <!-- 参考图片 -->
      <q-card flat bordered class="q-mb-md" v-if="detail.referenceImages?.length">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.referenceImages') }}</div>
          <div class="row q-col-gutter-md">
            <div
              v-for="(image, index) in detail.referenceImages"
              :key="index"
              class="col-12 col-sm-4 col-md-3"
            >
              <q-img
                :src="image"
                spinner-color="primary"
                style="height: 200px"
                fit="cover"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 附件列表 -->
      <q-card flat bordered class="q-mb-md" v-if="detail.attachments?.length">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.attachments') }}</div>
          <q-list bordered separator>
            <q-item
              v-for="file in detail.attachments"
              :key="file.url"
              clickable
              tag="a"
              :href="file.url"
              target="_blank"
            >
              <q-item-section avatar>
                <q-icon name="attach_file" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ file.name }}</q-item-label>
                <q-item-label caption>{{ formatFileSize(file.size) }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat round icon="download" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 进度时间线 -->
      <q-card flat bordered class="q-mb-md" v-if="detail.progressList?.length">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.progress') }}</div>
          <q-timeline color="primary">
            <q-timeline-entry
              v-for="(progress, index) in detail.progressList"
              :key="index"
              :title="progress.title"
              :subtitle="formatDate(progress.time)"
              :color="progress.color"
            >
              <div v-html="progress.description"></div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <!-- 众筹信息 -->
      <q-card flat bordered class="q-mb-md" v-if="detail.targetAmount">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.crowdfundingInfo') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-linear-progress
                :value="detail.currentAmount / detail.targetAmount"
                color="primary"
                class="q-mb-sm"
              />
              <div class="row justify-between q-mb-md">
                <div>{{ t('custom.detail.currentAmount') }}: ¥{{ detail.currentAmount?.toLocaleString() }}</div>
                <div>{{ t('custom.detail.targetAmount') }}: ¥{{ detail.targetAmount?.toLocaleString() }}</div>
              </div>
              <div class="row justify-between text-grey">
                <div>{{ t('custom.detail.supportCount') }}: {{ detail.supportCount }}</div>
                <div>{{ t('custom.detail.remainingDays') }}: {{ getRemainingDays(detail.endTime) }}</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">{{ t('custom.detail.timeline') }}</div>
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <div class="text-grey">{{ t('custom.detail.startTime') }}</div>
                  <div>{{ formatDate(detail.startTime) }}</div>
                </div>
                <div class="col-6">
                  <div class="text-grey">{{ t('custom.detail.endTime') }}</div>
                  <div>{{ formatDate(detail.endTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 回报设置 -->
      <q-card flat bordered class="q-mb-md" v-if="detail.rewards?.length">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.detail.rewards') }}</div>
          <div class="row q-col-gutter-md">
            <div
              v-for="reward in detail.rewards"
              :key="reward.id"
              class="col-12 col-md-4"
            >
              <q-card class="reward-card">
                <q-card-section>
                  <div class="text-h6">{{ reward.title }}</div>
                  <div class="text-h5 text-primary q-my-md">¥{{ reward.amount }}</div>
                  <div class="text-grey-8" v-html="reward.description"></div>
                  <div class="text-caption text-grey q-mt-sm">
                    {{ t('custom.detail.supportCount') }}: {{ reward.supportCount }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 联系客服 -->
      <div class="text-center q-mt-lg">
        <q-btn
          color="primary"
          :label="t('custom.detail.contact')"
          icon="chat"
          @click="contactSupport"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { date } from 'quasar'
import { api } from '@/utils/axios'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const detail = ref({})

// 获取详情数据
const fetchDetail = async () => {
  try {
    const response = await api.get(`/admin/custom/detail/${route.query.cid}`)
    if (response.data.succ) {
      detail.value = response.data.data
    }
  } catch (error) {
    console.error('获取详情失败:', error)
  }
}

// 格式化日期
const formatDate = (dateStr: string) => {
  return date.formatDate(dateStr, 'YYYY-MM-DD HH:mm')
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// 获取剩余天数
const getRemainingDays = (endTime: string) => {
  const end = new Date(endTime)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// 获取状态颜色
const getStatusColor = (status: string) => {
  const statusColors = {
    pending: 'orange',
    inProgress: 'blue',
    completed: 'green',
    rejected: 'red',
    cancelled: 'grey'
  }
  return statusColors[status] || 'grey'
}

// 联系客服
const contactSupport = () => {
  // 实现联系客服的逻辑
}

onMounted(() => {
  fetchDetail()
})
</script>

<style lang="scss" scoped>
.custom-detail-page {
  .page-content {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .info-item {
    margin-bottom: 16px;

    .label {
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .value {
      font-size: 16px;
    }
  }

  .requirements-content {
    font-size: 14px;
    line-height: 1.6;

    :deep(p) {
      margin-bottom: 1em;
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
    }
  }

  .reward-card {
    height: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 599px) {
    .page-content {
      padding: 16px;
    }
  }
}
</style>
