<template>
  <div class="product-list-card" @click="navigateToProduct(product.prodId)">
    <div class="product-image-wrapper">
      <q-img
        :src="getImageUrl(product.pic)"
        :ratio="1"
        loading="lazy"
        class="product-image"
      >
        <template v-slot:loading>
          <q-spinner-dots color="yellow" />
        </template>
      </q-img>

      <!-- 标签展示 -->
      <div class="product-tags">
        <!-- 品质标签 -->
        <q-chip
          v-if="product.quality"
          dense
          :color="getQualityColor(product.quality)"
          text-color="white"
          size="sm"
          class="quality-tag"
        >
          {{ t(`product.quality.${product.quality.toLowerCase()}`) }}
        </q-chip>

        <!-- 商品类型标签 -->
        <q-chip
          v-if="product.prodType && product.prodType !== 1"
          dense
          :color="getTypeColor(product.prodType)"
          text-color="white"
          size="sm"
          class="type-tag"
        >
          {{ t(`product.type.${getTypeKey(product.prodType)}`) }}
        </q-chip>
      </div>
    </div>

    <div class="product-info">
      <div class="product-name">{{getCurrentLanguageName(product.translations, product.prodName) }}</div>
      <div class="product-price">
        <span class="current-price">¥{{ product.price }}</span>
        <span class="original-price" v-if="product.oriPrice">¥{{ product.oriPrice }}</span>
      </div>
      <div class="product-footer">
        <span class="product-sales">{{ t('product.soldCount', { count: product.soldNum }) }}</span>
        <q-btn
          flat
          round
          dense
          color="grey"
          icon="shopping_cart"
          @click.stop="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import {getCurrentLanguageName, getImageUrl} from "~/utils/tools";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const $q = useQuasar()
const { t } = useI18n()

// 品质颜色映射
const getQualityColor = (quality: string) => {
  const colorMap: Record<string, string> = {
    'S': 'purple-10', // 臻品
    'A': 'purple',    // 精品
    'B': 'teal',     // 良品
    'C': 'blue-grey', // 普品
    'D': 'grey-7'    // 基础款
  }
  return colorMap[quality.toUpperCase()] || 'grey'
}

// 商品类型映射
const getTypeKey = (type: number) => {
  const typeMap: Record<number, string> = {
    1: 'NORMAL',      // 普通商品
    2: 'PRESELL',     // 预售商品
    3: 'GROUP',       // 团购商品
    4: 'SECKILL'      // 秒杀商品
  }
  return typeMap[type] || 'NORMAL'
}

// 商品类型颜色映射
const getTypeColor = (type: number) => {
  const colorMap: Record<number, string> = {
    2: 'orange',      // 预售商品
    3: 'green',       // 团购商品
    4: 'red'          // 秒杀商品
  }
  return colorMap[type] || 'grey'
}

// 跳转到商品详情
const navigateToProduct = (productId: number) => {
  router.push(`/product/detail?prodId=${productId}`)
}

// 添加到购物车
const addToCart = () => {
  $q.notify({
    type: 'positive',
    message: t('product.addCartSuccess')
  })
}
</script>

<style lang="scss" scoped>
.product-list-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
}

.product-image-wrapper {
  position: relative;
  width: 100%;
}

.product-image {
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
}

.product-tags {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.quality-tag,
.type-tag {
  opacity: 0.95;
  backdrop-filter: blur(4px);
  font-size: 0.8rem;
  padding: 2px 6px;
}

.quality-tag {
  &.quality-s {
    background: linear-gradient(45deg, #7b1fa2, #9c27b0);
  }

  &.quality-a {
    background: linear-gradient(45deg, #512da8, #673ab7);
  }
}

.product-info {
  padding: 12px;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  min-height: 2.8em;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;

  .current-price {
    color: #ff4081;
    font-size: 18px;
    font-weight: bold;
  }

  .original-price {
    color: #999;
    font-size: 14px;
    text-decoration: line-through;
  }
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .product-sales {
    font-size: 12px;
    color: #666;
  }
}

/* 响应式调整 */
@media (max-width: 599px) {
  .quality-tag,
  .type-tag {
    font-size: 0.75rem;
    padding: 1px 4px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-price {
    .current-price {
      font-size: 16px;
    }
    .original-price {
      font-size: 12px;
    }
  }
}
</style>
