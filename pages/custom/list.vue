<template>
  <div class="custom-list-page">
    <div class="page-header bg-primary text-white q-pa-md">
      <h2 class="text-h4 q-my-none">{{ t('custom.list.title') }}</h2>
    </div>

    <!-- 筛选和排序工具栏 -->
    <div class="filter-toolbar q-pa-md bg-grey-2">
      <div class="row items-center justify-between">
        <div class="col-12 col-sm-auto q-mb-sm-xs">
          <q-btn-group flat>
            <q-btn
              v-for="filter in filters"
              :key="filter.value"
              :label="t(filter.label)"
              :color="currentFilter === filter.value ? 'primary' : 'grey'"
              @click="currentFilter = filter.value"
              flat
            />
          </q-btn-group>
        </div>

        <div class="col-12 col-sm-auto">
          <q-select
            v-model="sortBy"
            :options="sortOptions"
            outlined
            dense
            emit-value
            map-options
            class="sort-select"
          />
        </div>
      </div>
    </div>

    <!-- 申请列表 -->
    <div class="custom-list q-pa-md">
      <div v-if="loading" class="text-center q-pa-lg">
        <q-spinner color="primary" size="3em" />
        <div class="text-grey q-mt-sm">{{ t('common.loading') }}</div>
      </div>

      <div v-else-if="customList.length === 0" class="text-center q-pa-xl">
        <q-icon name="inbox" size="4em" color="grey-5" />
        <div class="text-grey q-mt-sm">{{ t('custom.list.empty') }}</div>
      </div>

      <div v-else class="row q-col-gutter-md">
        <div v-for="item in customList" :key="item.id" class="col-12 col-sm-6 col-md-4">
          <q-card class="custom-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">{{ item.title }}</div>
                  <div class="text-caption text-grey">
                    {{ t('custom.list.orderNumber') }}: {{ item.id }}
                  </div>
                </div>
                <q-chip
                  :color="getStatusColor(getStatusText(item.status))"
                  text-color="white"
                  size="sm"
                >
                  {{ t(`custom.status.${getStatusText(item.status)}`) }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-body2">
                <div class="row q-gutter-sm">
                  <div class="col-12">
                    <q-icon name="event" size="xs" class="q-mr-xs" />
                    {{ formatDate(item.createdAt) }}
                  </div>
                  <div class="col-12">
                    <q-icon name="category" size="xs" class="q-mr-xs" />
                    {{ getCustomTypeText(item.type) }}
                  </div>
                  <div class="col-12 ellipsis-2-lines">
                    <q-icon name="description" size="xs" class="q-mr-xs" />
                    {{ item.description }}
                  </div>
                  <div class="col-12">
                    <q-icon name="payments" size="xs" class="q-mr-xs" />
                    预算: ￥{{ item.budgetMin }} - ￥{{ item.budgetMax }}
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                color="primary"
                :label="t('common.viewDetails')"
                :to="getDetailPath(item)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- 分页 -->
      <div class="row justify-center q-mt-lg">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="6"
          boundary-numbers
          direction-links
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { api } from '~/utils/axios'

const { t } = useI18n()
const loading = ref(false)
const currentFilter = ref('all')
const currentPage = ref(1)
const totalPages = ref(1)
const sortBy = ref('latest')

// 筛选选项
const filters = [
  { label: 'custom.list.filter.all', value: 'all' },
  { label: 'custom.list.filter.pending', value: 'pending' },
  { label: 'custom.list.filter.inProgress', value: 'inProgress' },
  { label: 'custom.list.filter.completed', value: 'completed' }
]

// 排序选项
const sortOptions = [
  { label: 'custom.list.sort.latest', value: 'latest' },
  { label: 'custom.list.sort.earliest', value: 'earliest' },
  { label: 'custom.list.sort.deadline', value: 'deadline' }
]

// 模拟数据
const customList = ref([
  {
    id: 1,
    title: '原神-刻晴手办定制',
    orderNumber: 'CD202401010001',
    status: 'pending',
    createTime: '2024-01-01',
    type: 'figure',
    description: '希望能够完美还原游戏中刻晴的造型，包括细节姿势。'
  },
  // 添加更多模拟数据...
])

// 获取状态对应的颜色
const getStatusColor = (status: string) => {
  const colors = {
    pending: 'orange',
    approved: 'positive',
    rejected: 'negative',
    inProgress: 'info',
    completed: 'positive',
    cancelled: 'grey'
  }
  return colors[status] || 'grey'
}

// 格式化日期
const formatDate = (dateString: string) => {
  return date.formatDate(dateString, 'YYYY-MM-DD')
}

// 获取定制申请列表
const fetchCustomList = async () => {
  loading.value = true
  try {
    const response = await api.get('/custom/list', {
      params: {
        page: currentPage.value,
        filter: currentFilter.value,
        sort: sortBy.value
      }
    })

    if (response.data.succ) {
      customList.value = response.data.data
      totalPages.value = Math.ceil(response.data.total / 10) // 假设每页10条数据
    }
  } catch (error) {
    console.error('获取定制列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听筛选和排序变化
watch([currentFilter, sortBy, currentPage], () => {
  fetchCustomList()
})

onMounted(() => {
  fetchCustomList()
})

// 添加类型定义
interface CustomItem {
  id: number
  type: number // 1=个人定制,2=众筹定制
  title: string
  description: string
  budgetMin: number
  budgetMax: number
  createdAt: string
  status: number
  // ... 其他字段
}

// 添加类型转换函数
const getCustomTypeText = (type: number) => {
  switch (type) {
    case 1:
      return t('custom.type.personal')
    case 2:
      return t('custom.type.crowdfunding')
    default:
      return t('custom.type.other')
  }
}

// 修改路由跳转方法
const getDetailPath = (item: CustomItem) => {
  const typeMap = {
    1: 'personal',
    2: 'crowdfunding'
  }
  return `/custom/${typeMap[item.type] || 'personal'}/detail/${item.id}`
}
</script>

<style lang="scss" scoped>
.custom-list-page {
  .filter-toolbar {
    position: sticky;
    top: 50px;
    z-index: 2;
  }

  .sort-select {
    width: 200px;
  }

  .custom-card {
    height: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  .ellipsis-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
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
</style>
