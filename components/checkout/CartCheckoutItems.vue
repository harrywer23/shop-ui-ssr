<template>
  <div class="cart-checkout-items">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">{{ t('checkout.items.title') }}</div>

        <q-list v-if="items && items.length > 0">
          <q-item v-for="item in items" :key="item.skuId || item.prodId">
            <q-item-section avatar>
              <q-img
                :src="getImageUrl(item.pic)"
                style="width: 80px; height: 80px"
                :ratio="1"
                fit="cover"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.prodName }}</q-item-label>
              <q-item-label caption v-if="item.skuName">
                {{ item.skuName }}
              </q-item-label>

              <!-- 价格显示部分 -->
              <div class="price-section q-mt-sm">
                <!-- 预售商品 -->
                <template v-if="item.prodType === ProductType.PRESELL">
                  <div class="text-primary text-weight-medium">
                    {{ t('product.presellPrice') }}：¥{{ item.presellPrice }}
                  </div>
                  <div class="text-grey-8">
                    {{ t('product.deposit') }}：¥{{ item.presellDeposit }}
                  </div>
                  <div class="text-grey-8">
                    {{ t('product.finalPayment') }}：¥{{ (item.presellPrice - item.presellDeposit).toFixed(2) }}
                  </div>
                </template>

                <!-- 普通商品 -->
                <template v-else>
                  <div class="text-primary text-weight-medium">
                    ¥{{ item.price }}
                  </div>
                  <div v-if="item.oriPrice && item.oriPrice > item.price" class="text-grey-8 text-strike">
                    ¥{{ item.oriPrice }}
                  </div>
                </template>
              </div>
            </q-item-section>

            <q-item-section side>
              <div class="text-subtitle1">
                × {{ item.basketCount || item.quantity || 1 }}
              </div>
              <div class="text-primary text-weight-medium q-mt-sm">
                ¥{{ calculateItemTotal(item) }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>

        <div v-else class="text-center q-pa-md text-grey">
          {{ t('cart.empty') }}
        </div>

        <q-separator class="q-my-md" />

        <div class="row justify-end items-center q-gutter-sm">
          <div class="text-subtitle1">
            {{ t('checkout.items.total') }}:
          </div>
          <div class="text-h6 text-primary">
            ¥{{ calculateTotal() }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ProductType } from '~/utils/constants'
import type { CheckoutItem } from '~/types/checkout'

const { t } = useI18n()

const props = defineProps<{
  items: CheckoutItem[]
}>()

// 监听 items 属性变化
watch(() => props.items, (newItems) => {
  console.log('CartCheckoutItems - 接收到的商品数据:', {
    itemsLength: newItems?.length,
    items: newItems,
    firstItem: newItems?.[0]
  })
}, { immediate: true, deep: true })

// 在组件挂载时打印初始数据
onMounted(() => {
  console.log('CartCheckoutItems - 组件挂载时的数据:', {
    itemsLength: props.items?.length,
    items: props.items,
    firstItem: props.items?.[0]
  })
})

// 添加计算属性来验证数据
const validItems = computed(() => {
  const valid = props.items?.filter(item => {
    const isValid = item && item.prodId && item.prodName && item.price
    if (!isValid) {
      console.warn('CartCheckoutItems - 发现无效商品数据:', item)
    }
    return isValid
  })
  console.log('CartCheckoutItems - 有效商品数量:', valid?.length)
  return valid
})

// 计算单个商品总价
const calculateItemTotal = (item: CheckoutItem) => {
  const quantity = item.basketCount || item.quantity || 1
  let price = item.price

  switch (item.prodType) {
    case ProductType.PRESELL:
      price = item.presellDeposit || item.presellPrice || price
      break
    case ProductType.GROUP:
      price = item.groupPrice || price
      break
    case ProductType.SECKILL:
      price = item.seckillPrice || price
      break
  }

  return (price * quantity).toFixed(2)
}

// 修改计算总价的函数，添加日志
const calculateTotal = () => {
  if (!props.items || props.items.length === 0) {
    console.log('CartCheckoutItems - 没有商品数据')
    return '0.00'
  }

  const total = props.items.reduce((sum, item) => {
    const quantity = item.basketCount || item.quantity || 1
    let price = item.price

    switch (item.prodType) {
      case ProductType.PRESELL:
        price = item.presellDeposit || item.presellPrice || price
        break
      case ProductType.GROUP:
        price = item.groupPrice || price
        break
      case ProductType.SECKILL:
        price = item.seckillPrice || price
        break
    }

    const itemTotal = price * quantity
    console.log('CartCheckoutItems - 商品计算:', {
      prodId: item.prodId,
      prodName: item.prodName,
      price,
      quantity,
      itemTotal
    })

    return sum + itemTotal
  }, 0)

  console.log('CartCheckoutItems - 总价计算结果:', total.toFixed(2))
  return total.toFixed(2)
}
</script>

<style lang="scss" scoped>
.cart-checkout-items {
  .price-section {
    line-height: 1.5;
  }

  .text-strike {
    text-decoration: line-through;
  }
}
</style>
