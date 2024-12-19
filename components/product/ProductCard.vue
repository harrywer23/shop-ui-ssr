<template>
  <div class="product-card" @click="navigateToProduct(product.prodId)">
    <q-img
      :src="getImageUrl(product.pic)"
      :ratio="1"
      loading="lazy"
      class="product-image"
    >
      <template v-slot:loading>
        <q-spinner-dots color="yellow" />
      </template>

      <!-- 标签展示 -->
      <div class="product-tags absolute-top-right q-pa-sm">
        <!-- 品质标签 -->
        <q-chip
          v-if="product.quality"
          dense
          :color="getQualityColor(product.quality)"
          text-color="white"
          size="sm"
          class="q-mb-xs"
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
        >
          {{ t(`product.type.${getTypeKey(product.prodType)}`) }}
        </q-chip>
      </div>
    </q-img>

    <div class="product-info">
      <div class="product-name">{{  getCurrentLanguageName(product.translations, product.prodName)  }}</div>
      <div class="product-price">
        <span class="current-price">¥{{ product.price }}</span>
        <span class="original-price">¥{{ product.oriPrice }}</span>
      </div>
      <div class="product-footer">
        <span class="product-sales">
          {{ t('product.soldCount', { count: product.soldNum }) }}
        </span>
        <div class="action-buttons">
          <q-btn
            flat
            round
            dense
            color="grey"
            icon="shopping_cart"
            @click.stop="addToCart"
          >
            <q-tooltip>{{ t('product.addToCart') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="flash_on"
            @click.stop="buyNow"
          >
            <q-tooltip>{{ t('product.buyNow') }}</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { getCurrentLanguageName, getImageUrl } from "~/utils/tools"
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const $q = useQuasar()
const { t, locale } = useI18n() // 获取当前语言
const cartStore = useCartStore()

// 判断是否为新品（7天内）
const isNew = computed(() => {
  const createTime = new Date(props.product.create_time).getTime()
  const now = new Date().getTime()
  const sevenDays = 7 * 24 * 60 * 60 * 1000
  return (now - createTime) < sevenDays
})

// 跳转到商品详情
const navigateToProduct = (productId: number) => {
  router.push(`/product/detail?prodId=${productId}`)
}

// 修改添加到购物车方法
const addToCart = async () => {
  try {
    const response = await api.post('/admin/basket/add', {
      prodId: props.product.prodId,
      count: 1
    })
    
    if (response.data.code === 200) {
      $q.notify({
        type: 'positive',
        message: t('product.addCartSuccess'),
        position: 'top',
        timeout: 2000,
        actions: [
          {
            label: t('product.viewCart'),
            color: 'white',
            handler: () => {
              navigateTo('/cart')
            }
          },
          {
            label: t('common.continue'),
            color: 'white',
            handler: () => {
              /* 继续购物 */
            }
          }
        ],
        html: true,
        multiLine: true,
        classes: 'shopping-notification'
      })
    } else {
      throw new Error(response.data.msg)
    }
  } catch (error) {
    console.error('添加购物车失败:', error)
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : t('product.addCartFail'),
      position: 'top',
      timeout: 2000
    })
  }
}

// 修改立即购买方法
const buyNow = async () => {
  try {
    // 清空直接购买项
    cartStore.clearCart()
    
    // 添加直接购买项
    const orderData = {
      prodId: props.product.prodId,
      prodName: getCurrentLanguageName(props.product.translations, props.product.prodName), // 不需要传递 locale
      price: props.product.price,
      oriPrice: props.product.oriPrice,
      pic: props.product.pic,
      quantity: 1,
      basketCount: 1,
      prodType: props.product.prodType,
      deliveryTemplateId: props.product.deliveryTemplateId,
      presellStatus: props.product.presellStatus,
      presellPrice: props.product.presellPrice,
      presellDeposit: props.product.presellDeposit,
      groupPrice: props.product.groupPrice,
      groupMinNum: props.product.groupMinNum,
      seckillPrice: props.product.seckillPrice,
      isVirtual: props.product.isVirtual,
      isSkuItem: 0,
      weight: props.product.weight,
      volume: props.product.volume,
      translations: props.product.translations,
      from: "direct"
    }
    
    cartStore.addDirectBuyItem(orderData)
    navigateTo(`/checkout?prodId=${props.product.prodId}`)
  } catch (error) {
    console.error('立即购买失败:', error)
    $q.notify({
      type: 'negative',
      message: t('product.buyNowFail')
    })
  }
}

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
</script>

<style lang="scss" scoped>
.product-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
  background: white;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-image {
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
}

.product-tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
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

.product-brief {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

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

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-sales {
  font-size: 12px;
  color: #666;
}

.q-chip {
  font-size: 0.8rem;
  padding: 2px 6px;
  opacity: 0.95;
  backdrop-filter: blur(4px);
}

/* 品质标签特殊样式 */
.q-chip.quality-s {
  background: linear-gradient(45deg, #7b1fa2, #9c27b0);
}

.q-chip.quality-a {
  background: linear-gradient(45deg, #512da8, #673ab7);
}

/* 响应式调整 */
@media (max-width: 599px) {
  .q-chip {
    font-size: 0.75rem;
    padding: 1px 4px;
  }
}

:deep(.shopping-notification) {
  min-width: 200px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  
  .q-notification__message {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .q-notification__actions {
    justify-content: flex-end;
    gap: 8px;
    
    .q-btn {
      font-size: 12px;
      padding: 4px 8px;
      min-height: 24px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}

.action-buttons {
  .q-btn {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      border-radius: 50%;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.3s;
    }
    
    &:active::after {
      opacity: 0.2;
      transform: scale(1.2);
    }
  }
}
</style>
