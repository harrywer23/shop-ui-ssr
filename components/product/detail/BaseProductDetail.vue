// 基础商品详情组件，包含共同的属性和方法
<template>
  <div class="product-detail">
    <!-- 基础商品信息展示 -->
    <div class="product-info">
      <!-- 商品图片 -->
      <div class="product-gallery">
        <q-img :src="getImageUrl(product.pic)" />
      </div>

      <!-- 商品基本信息 -->
      <div class="product-summary">
        <h1 class="product-name">{{ product.prodName }}</h1>
        <div class="product-tags">
          <q-chip
            v-if="product.quality"
            :color="getQualityColor(product.quality)"
            text-color="white"
            size="sm"
          >
            {{ t(`product.quality.${product.quality.toLowerCase()}`) }}
          </q-chip>
        </div>
        <div class="product-price">
          <span class="current-price">¥{{ product.price }}</span>
          <span class="original-price">¥{{ product.oriPrice }}</span>
        </div>

        <!-- 商品规格选择 -->
        <div class="sku-selector">
          <!-- SKU 选择组件 -->
        </div>

        <!-- 数量选择 -->
        <div class="quantity-selector">
          <q-input
            v-model.number="quantity"
            type="number"
            :min="1"
            :max="product.stock"
            outlined
            dense
          />
        </div>

        <!-- 基础按钮组 -->
        <div class="action-buttons">
          <slot name="action-buttons">
            <q-btn
              color="primary"
              :label="t('product.buyNow')"
              @click="buyNow"
            />
            <q-btn
              outline
              color="primary"
              :label="t('product.addToCart')"
              @click="addToCart"
            />
          </slot>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="product-content">
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="details" :label="t('product.details')" />
        <q-tab name="params" :label="t('product.params')" />
        <q-tab name="comments" :label="t('product.comments')" />
      </q-tabs>

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="details">
          <div v-html="product.detail" />
        </q-tab-panel>
        <q-tab-panel name="params">
          <!-- 商品参数 -->
        </q-tab-panel>
        <q-tab-panel name="comments">
          <!-- 商品评价 -->
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import {getImageUrl} from "~/utils/tools";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['buy', 'add-to-cart'])

const { t } = useI18n({
  useScope: 'local',
  messages: {
    'zh-CN': {
      product: {
        buyNow: '立即购买',
        addToCart: '加入购物车',
        // ...其他翻译
      }
    },
    'en': {
      product: {
        buyNow: 'Buy Now',
        addToCart: 'Add to Cart',
        // ...其他翻译
      }
    }
    // ...其他语言
  }
})
const $q = useQuasar()

const quantity = ref(1)
const activeTab = ref('details')

// 品质颜色映射
const getQualityColor = (quality: string) => {
  const colorMap: Record<string, string> = {
    'S': 'purple-10',
    'A': 'purple',
    'B': 'teal',
    'C': 'blue-grey',
    'D': 'grey-7'
  }
  return colorMap[quality.toUpperCase()] || 'grey'
}

// 基础方法
const buyNow = () => {
  emit('buy', {
    product: props.product,
    quantity: quantity.value
  })
}

const addToCart = () => {
  emit('add-to-cart', {
    product: props.product,
    quantity: quantity.value
  })
}
</script>

<style lang="scss" scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

// ... 其他样式
</style>
