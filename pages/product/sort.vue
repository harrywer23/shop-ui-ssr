<template>
  <div class="product-list-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-nav">
      <q-breadcrumbs>
        <q-breadcrumbs-el :label="$t('nav.home')" to="/" />
        <q-breadcrumbs-el :label="$t('nav.tissue')" />
        <q-breadcrumbs-el label="全部商品" />
      </q-breadcrumbs>
    </div>

    <div class="page-content">
      <!-- 左侧分类导航 -->
      <div class="sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('nav.tissue') }}</h3>
          <q-list padding>
            <q-item
              v-for="category in categories"
              :key="category.categoryId"
              clickable
              v-ripple
              :active="selectedCategory === category.categoryId"
              @click="handleCategoryClick(category.categoryId)"
            >
              <q-item-section>
                {{ category.categoryName }}
              </q-item-section>
              <q-item-section side v-if="category.children">
                <q-icon name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- 标签筛选 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('product.filter.tags') }}</h3>
          <div class="tags-filter">
            <q-chip
              v-for="tag in tags"
              :key="tag.id"
              :selected="selectedTags.includes(tag.id)"
              clickable
              @click="toggleTag(tag.id)"
            >
              {{ tag.title }}
            </q-chip>
          </div>
        </div>

        <!-- 品质筛选 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('product.filter.quality') }}</h3>
          <div class="quality-filter">
            <q-chip
              v-for="quality in qualities"
              :key="quality.value"
              :selected="selectedQuality === quality.value"
              :color="getQualityColor(quality.value)"
              text-color="white"
              clickable
              @click="toggleQuality(quality.value)"
            >
              {{ t(`product.quality.${quality.value.toLowerCase()}`) }}
            </q-chip>
          </div>
        </div>

        <!-- 商品类型筛选 -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ $t('product.filter.type') }}</h3>
          <div class="type-filter">
            <q-chip
              v-for="type in productTypes"
              :key="type.value"
              :selected="selectedType === type.value"
              :color="getTypeColor(type.value)"
              text-color="white"
              clickable
              @click="toggleType(type.value)"
            >
              {{ t(`product.type.${getTypeKey(type.value)}`) }}
            </q-chip>
          </div>
        </div>
      </div>

      <!-- 右侧商品列表 -->
      <div class="main-content">
        <ProductList
          :show-category-filter="false"
          :initial-category="selectedCategory"
          :initial-price-range="priceRange"
          :initial-tags="selectedTags?.length ? selectedTags.join(',') : ''"
          :initial-quality="selectedQuality"
          :initial-prod-type="selectedType"
          :products="products"
          :loading="loading"
          @update:filter="handleFilterUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {useQuasar} from "quasar";
import {getImageUrl} from "~/utils/tools";

const $q = useQuasar()
const { t } = useI18n()

const route = useRoute()
const prodId = ref(route.query.prodId)
const parentId = ref(0)

const router = useRouter()

// 状态管理
const selectedCategory = ref(Number(route.query.category) || 1)
const priceRange = ref({
  min: null as number | null,
  max: null as number | null
})
const selectedTags = ref<number[]>(route.query.tags ? String(route.query.tags).split(',').map(Number) : [])
const categories = ref([]);
const products = ref<any[]>([])
const loading = ref(false)

// 添加品质和类型的状态
const selectedQuality = ref<string | null>(null)
const selectedType = ref<number | null>(null)

// 品质颜色映射
const getQualityColor = (quality: string) => {
  const colorMap: Record<string, string> = {
    'S': 'purple-10',
    'A': 'purple',
    'B': 'teal',
    'C': 'blue-grey',
    'D': 'grey-7'
  }
  return colorMap[quality] || 'grey'
}

// 商品类型映射和颜色
const getTypeKey = (type: number) => {
  const typeMap: Record<number, string> = {
    1: 'NORMAL',
    2: 'PRESELL',
    3: 'GROUP',
    4: 'SECKILL'
  }
  return typeMap[type] || 'NORMAL'
}

const getTypeColor = (type: number) => {
  const colorMap: Record<number, string> = {
    2: 'orange',
    3: 'green',
    4: 'red'
  }
  return colorMap[type] || 'grey'
}

// 修改获取分类列表函数
const loadCategories = async () => {
  try {
    // if (!parentId.value) {
    //   categories.value = []
    //   return
    // }
    const response = await api.get(`/category/subTree?parentId=${parentId.value}`)
    const data = await response.data
    if(data.code === 200) {
      categories.value = data.data
    } else {
      categories.value = []
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
    $q.notify({
      type: 'negative',
      message: t('error.loadCategoriesFailed')
    })
  }
}
// 模拟标签数据
const tags = ref([
  { id: 1, title: '新品' },
  { id: 2, title: '热销' },
  { id: 3, title: '限定' },
  { id: 4, title: '预售' },
  { id: 5, title: '特价' }
])

// 品质选项
const qualities = [
  { value: 'S', label: 'product.quality.s' },
  { value: 'A', label: 'product.quality.a' },
  { value: 'B', label: 'product.quality.b' },
  { value: 'C', label: 'product.quality.c' },
  { value: 'D', label: 'product.quality.d' }
]

// 商品类型选项
const productTypes = [
  { value: 1, label: 'product.type.NORMAL' },
  { value: 2, label: 'product.type.PRESELL' },
  { value: 3, label: 'product.type.GROUP' },
  { value: 4, label: 'product.type.SECKILL' }
]

// 修改选更新处理函数
const handleFilterUpdate = (filters: any) => {
  // 更新本地状态
  if (filters.category !== undefined) {
    selectedCategory.value = filters.category
  }
  if (filters.tags !== undefined) {
    selectedTags.value = typeof filters.tags === 'string' 
      ? filters.tags.split(',').filter(Boolean).map(Number)
      : Array.isArray(filters.tags) ? filters.tags : []
  }
  if (filters.quality !== undefined) {
    selectedQuality.value = filters.quality
  }
  if (filters.prodType !== undefined) {
    selectedType.value = filters.prodType
  }
  if (filters.priceRange !== undefined) {
    priceRange.value = filters.priceRange
  }

  // 更新 URL 参数
  updateQueryParams()
  // 重新加载数据
  loadProducts()
}

// 修改 watch 逻辑
watch(
  [
    selectedQuality,
    selectedType,
    selectedCategory,
    selectedTags,
    () => priceRange.value
  ],
  () => {
    updateQueryParams()
    loadProducts()
  },
  { deep: true }
)

// 修改 updateQueryParams 函数
const updateQueryParams = () => {
  const query: Record<string, any> = {}

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  }
  if (selectedQuality.value) {
    query.quality = selectedQuality.value
  }
  if (selectedType.value) {
    query.prodType = selectedType.value
  }
  if (selectedTags.value.length) {
    query.tags = selectedTags.value.join(',')
  }
  if (priceRange.value.min) {
    query.minPrice = priceRange.value.min
  }
  if (priceRange.value.max) {
    query.maxPrice = priceRange.value.max
  }

  // 使用 replace 而不是 push 来避免创建新的历史记录
  router.replace({ query })
}

// 处理分���点击
const handleCategoryClick = (categoryId: number) => {
  selectedCategory.value = categoryId
  updateQueryParams()
}

// 处理价格筛选
const handlePriceFilter = () => {
  updateQueryParams()
}

// 切换标签
const toggleTag = (tagId: number) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index === -1) {
    selectedTags.value.push(tagId)
  } else {
    selectedTags.value.splice(index, 1)
  }
  updateQueryParams()
}

// 切换品质筛选（单选）
const toggleQuality = (quality: string) => {
  if (selectedQuality.value === quality) {
    selectedQuality.value = null
  } else {
    selectedQuality.value = quality
  }
  updateQueryParams()
}

// 切换类型筛选（单选）
const toggleType = (type: number) => {
  if (selectedType.value === type) {
    selectedType.value = null
  } else {
    selectedType.value = type
  }
  updateQueryParams()
}

// 从URL参数恢复状态
const restoreFromQuery = () => {
  const { category, minPrice, maxPrice, tags, quality, prodType } = route.query

  if (category) {
    selectedCategory.value = Number(category)
  }

  if (minPrice) {
    priceRange.value.min = Number(minPrice)
  }

  if (maxPrice) {
    priceRange.value.max = Number(maxPrice)
  }

  if (tags) {
    selectedTags.value = String(tags).split(',').filter(Boolean).map(Number)
  } else {
    selectedTags.value = []
  }

  if (quality) {
    selectedQuality.value = String(quality)
  }

  if (prodType) {
    selectedType.value = Number(prodType)
  }
}

// 添加加载商品的函数
const loadProducts = async () => {
  loading.value = true
  try {
    const queryParams = new URLSearchParams()

    if (selectedCategory.value) {
      queryParams.append('categoryId', String(selectedCategory.value))
    }

    if (selectedQuality.value) {
      queryParams.append('quality', selectedQuality.value)
    }

    if (selectedType.value) {
      queryParams.append('prodType', String(selectedType.value))
    }

    if (selectedTags.value.length) {
      queryParams.append('tags', selectedTags.value.join(','))
    }

    if (priceRange.value.min) {
      queryParams.append('minPrice', String(priceRange.value.min))
    }

    if (priceRange.value.max) {
      queryParams.append('maxPrice', String(priceRange.value.max))
    }

    // 调用 API
    const response = await api.get(`/prod/listByCategoryId?${queryParams.toString()}`)
    if (response.data.code === 200) {
      products.value = response.data.data
    } else {
      products.value = []
      throw new Error(response.data.msg || '加载商品失败')
    }
  } catch (error) {
    console.error('加载商品失败:', error)
    products.value = []
    $q.notify({
      type: 'negative',
      message: t('error.loadProductsFailed')
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategories()
  restoreFromQuery()
  loadProducts()
})
</script>

<style scoped>
.product-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb-nav {
  margin-bottom: 20px;
  padding: 12px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.page-content {
  display: flex;
  gap: 20px;
}

.sidebar {
  flex: none;
  width: 240px;
}

.sidebar-section {
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 16px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.price-range-filter {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-separator {
  text-align: center;
  color: #666;
  padding: 4px 0;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.main-content {
  flex: 1;
  min-width: 0; /* 止flex子项溢出 */
}

/* 响应式布局 */
@media (max-width: 768px) {
  .page-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .price-range-filter {
    flex-direction: row;
    align-items: center;
  }
}

.quality-filter,
.type-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
}

.q-chip {
  opacity: 0.9;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &.q-chip--selected {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    opacity: 1;
  }

  &:not(.q-chip--selected) {
    background: rgba(0, 0, 0, 0.05) !important;
    color: #666 !important;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .quality-filter,
  .type-filter {
    padding: 4px;
  }

  .q-chip {
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>
