<template>
  <div class="custom-applications-page">

    <div class="page-content">
      <div class="page-header">
        <h2 class="text-h5">{{ t('custom.list.title') }}</h2>
        <q-btn
          color="primary"
          :label="t('custom.apply.submit')"
          :to="{ name: 'custom-apply' }"
        />
      </div>

      <!-- 筛选工具栏 -->
      <div class="filter-toolbar q-mb-md">
        <div class="row items-center justify-between q-col-gutter-md">
          <div class="col-12 col-sm-auto">
            <q-btn-group flat>
              <q-btn
                v-for="status in filterStatus"
                :key="status.value"
                :label="t(`custom.status.${status.label}`)"
                :color="currentStatus === status.value ? 'primary' : 'grey'"
                @click="currentStatus = status.value"
                flat
              />
            </q-btn-group>
          </div>
          <div class="col-12 col-sm-auto">
            <q-select
              v-model="sortBy"
              :options="sortOptions"
              dense
              outlined
              emit-value
              map-options
            />
          </div>
        </div>
      </div>

      <!-- 申请列表 -->
      <q-list bordered separator>
        <q-item
          v-for="item in applications"
          :key="item.id"
          clickable
          v-ripple
          :to="`/user/custom/detail?cid=${item.id}`"
        >
          <q-item-section>
            <q-item-label class="text-h6">{{ item.title }}</q-item-label>
            <q-item-label caption>
              <div class="row q-gutter-x-md">
                <div>
                  <q-icon name="schedule" size="xs" class="q-mr-xs" />
                  {{ formatDate(item.createdAt) }}
                </div>
                <div>
                  <q-icon name="category" size="xs" class="q-mr-xs" />
                  {{ t(`custom.type.${item.itemType}`) }}
                </div>
                <div>
                  <q-icon name="attach_money" size="xs" class="q-mr-xs" />
                  {{ formatPrice(item.budgetMin) }} - {{ formatPrice(item.budgetMax) }}
                </div>
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-chip
              :color="getStatusColor(item.status)"
              text-color="white"
              size="sm"
            >
              {{ t(`custom.status.${getStatusText(item.status)}`) }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 分页 -->
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="currentPage"
          :max="Math.ceil(total / pageSize)"
          :max-pages="6"
          boundary-numbers
          direction-links
        />
      </div>

      <!-- 空状态 -->
      <div v-if="!applications.length" class="empty-state q-pa-lg text-center">
        <q-icon name="inbox" size="48px" color="grey-5" />
        <div class="text-h6 q-mt-md">{{ t('custom.list.empty') }}</div>
        <q-btn
          color="primary"
          :label="t('custom.apply.submit')"
          class="q-mt-md"
          :to="{ name: 'custom-apply' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'users',
  middleware: 'auth'
});
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { date } from 'quasar'
import { api } from '@/utils/axios'

const { t } = useI18n()

// 状态过滤选项
const filterStatus = [
  { label: 'all', value: '' },
  { label: 'pending', value: 0 },
  { label: 'inProgress', value: 1 },
  { label: 'completed', value: 2 }
]

// 排序选项
const sortOptions = [
  { label: t('custom.list.sort.latest'), value: 'latest' },
  { label: t('custom.list.sort.earliest'), value: 'earliest' },
  { label: t('custom.list.sort.deadline'), value: 'deadline' }
]

// 响应式数据
const applications = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const currentStatus = ref('')
const sortBy = ref('latest')

// 获取申请列表
const fetchApplications = async () => {
  try {
    const response = await api.get('/admin/custom/applications', {
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        status: currentStatus.value,
        sort: sortBy.value
      }
    })

    if (response.data.succ) {
      applications.value = response.data.data
      total.value = response.data.total
    }
  } catch (error) {
    console.error('获取申请列表失败:', error)
  }
}

// 格式化日期
const formatDate = (dateStr: string) => {
  return date.formatDate(dateStr, 'YYYY-MM-DD HH:mm')
}

// 格式化价格
const formatPrice = (price: number) => {
  return `¥${price.toLocaleString()}`
}

// 获取状态颜色
const getStatusColor = (status: number) => {
  const statusColors = {
    0: 'orange', // pending
    1: 'blue',   // inProgress
    2: 'green',  // completed
    3: 'red',    // rejected
    4: 'grey'    // cancelled
  }
  return statusColors[status] || 'grey'
}

// 获取状态文本
const getStatusText = (status: number) => {
  const statusMap = {
    0: 'pending',
    1: 'inProgress',
    2: 'completed',
    3: 'rejected',
    4: 'cancelled'
  }
  return statusMap[status] || 'unknown'
}

// 监听分页和筛选变化
watch([currentPage, currentStatus, sortBy], () => {
  fetchApplications()
})

onMounted(() => {
  fetchApplications()
})
</script>

<style lang="scss" scoped>
.custom-applications-page {
  .page-title {
    margin-bottom: 24px;

    .text-h4 {
      margin-bottom: 8px;
    }

    .q-breadcrumbs {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .page-content {
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .filter-toolbar {
    background: #f5f5f5;
    padding: 12px;
    border-radius: 4px;
  }

  .empty-state {
    color: #666;
  }

  @media (max-width: 599px) {
    .filter-toolbar {
      .q-btn-group {
        width: 100%;
        .q-btn {
          flex: 1;
        }
      }
    }
  }
}
</style>
