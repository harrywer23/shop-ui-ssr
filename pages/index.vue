<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import {getImageUrl} from "~/utils/tools";

const slide = ref(0)

const banners = ref([])
// 商品数据
const hotProdList = ref([])
const newProdList = ref([])
const moreProdList = ref([])

// 异步加载组件
const ClassComponent = defineAsyncComponent(() => import('~/components/ClassComponent.vue'))
const Section4Component = defineAsyncComponent(() => import('~/components/Section4Component.vue'))
const CategoryProducts = defineAsyncComponent(() => import('~/components/CategoryProducts.vue'))

// 使用 Promise.all 并行加载数据
const loadAllData = async () => {
  try {
    const [bannersRes, hotRes, newRes, moreRes] = await Promise.all([
      fetch(`/api/banner/list?position=home`),
      fetch('/api/prod/listByTagId?pageNum=1&pageSize=8&tagId=2'),
      fetch('/api/prod/listByTagId?page=1&pageSize=8&tagId=1'),
      fetch('/api/prod/listByTagId?page=1&pageSize=8&tagId=3')
    ])
    const bannersReponse = await bannersRes.json();
    if (bannersReponse.code === 200) {
      banners.value = bannersReponse.data
    }
    const hotReponse = await hotRes.json();
    hotProdList.value = hotReponse.data
    const newReponse = await newRes.json();
    newProdList.value = newReponse.data
    const moreReponse = await moreRes.json();
    moreProdList.value = moreReponse.data

  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

onMounted(() => {
  loadAllData()
})
</script>

<template>
  <div class="home-container">
    <div class="main-content">
      <!-- 左侧分类导航 -->
      <div class="category-nav">
        <Suspense>
          <ClassComponent />
          <template #fallback>
            <q-skeleton type="rect" height="400px" />
          </template>
        </Suspense>
      </div>

      <!-- 右侧轮播图区域 -->
      <div class="carousel-section">
        <q-carousel
          v-model="slide"
          animated
          arrows
          navigation
          infinite
          :autoplay="10000"
          class="carousel-custom"
        >
          <q-carousel-slide
            v-for="(banner, index) in banners"
            :key="index"
            :name="banner.title"
          >
            <q-img
              :src="getImageUrl(banner.imgUrl)"
              :ratio="16/9"
              loading="lazy"
              placeholder-src="/images/favicon.ico"
              class="full-height full-width"
            >
              <div class="banner-content absolute-bottom">
                <h2 class="text-h4 text-weight-bold q-mb-sm">{{ banner.title }}</h2>
                <p class="text-subtitle1 q-mb-none">{{ banner.description }}</p>
              </div>
            </q-img>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- 商品展示区域 -->
    <div class="products-section q-mt-lg">
      <Suspense>
        <template #default>
          <div>
            <section4-component
              :title="$t('home.sections.newProducts')"
              :products="newProdList"
              more-link="/product/sort"
            />
            <section4-component
              :title="$t('home.sections.hotSales')"
              :products="hotProdList"
              more-link="/product/sort?sort=newest"
            />
            <section4-component
              :title="$t('home.sections.moreItems')"
              :products="moreProdList"
              more-link="/product/sort?sort=newest"
            />
          </div>
        </template>
        <template #fallback>
          <q-skeleton type="rect" height="200px" class="q-mb-md" />
        </template>
      </Suspense>
    </div>

    <!-- 分类产品展示 -->
    <div class="category-sections">
      <Suspense>
        <template #default>
          <div>
            <CategoryProducts
              v-for="category in [
                { id: 1, title: $t('home.categories.anime') },
                { id: 2, title: $t('home.categories.game') },
                { id: 3, title: $t('home.categories.movie') },
                { id: 4, title: $t('home.categories.novel') },
                { id: 5, title: $t('home.categories.general') }
              ]"
              :key="category.id"
              :title="category.title"
              :category-id="category.id"
              :more-link="`/product/list?parentId=${category.id}`"
            />
          </div>
        </template>
        <template #fallback>
          <q-skeleton type="rect" height="200px" class="q-mb-md" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  display: flex;
  gap: 20px;
  position: relative;
  height: 400px;
  margin-bottom: 40px;
}

.category-nav {
  flex: none;
  width: 220px;
  position: relative;
  z-index: 20;
}

.carousel-section {
  flex: 1;
  position: relative;
  z-index: 10;
  margin-left: 20px;
}

:deep(.sub-categories-panel) {
  width: calc(100vw - 280px) !important;
  max-width: 900px !important;
  min-width: 600px !important;
}

.carousel-custom {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  contain: content;
  will-change: transform;
}

.banner-content {
  padding: 24px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.banner-content h2 {
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.banner-content p {
  color: rgba(255,255,255,0.9);
  margin: 8px 0 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.products-section {
  margin-top: 40px;
}

.category-sections {
  margin-top: 40px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }

  .category-nav {
    width: 100%;
  }

  .carousel-section {
    margin-left: 0;
    height: 300px;
  }

  :deep(.sub-categories-panel) {
    width: calc(100vw - 40px) !important;
    min-width: unset !important;
    left: 20px !important;
  }
}
</style>
