<template>
  <BaseProductDetail
    :product="product"
    @buy="handlePreOrder"
  >
    <template #action-buttons>
      <!-- 预售特有的信息和按钮 -->
      <div class="presell-info">
        <!-- 预售状态 -->
        <div class="presell-status">
          <q-chip
            :color="presellStatusColor"
            text-color="white"
          >
            {{ presellStatusText }}
          </q-chip>
        </div>

        <!-- 预售价格信息 -->
        <div class="presell-price">
          <div class="current">
            <span class="label">{{ t('product.presell.price') }}</span>
            <span class="price">¥{{ product.presellPrice }}</span>
          </div>
          <div class="deposit">
            <span class="label">{{ t('product.presell.deposit') }}</span>
            <span class="price">¥{{ product.deposit }}</span>
          </div>
          <div class="final">
            <span class="label">{{ t('product.presell.finalPayment') }}</span>
            <span class="price">¥{{ finalPayment }}</span>
          </div>
        </div>

        <!-- 预售时间信息 -->
        <div class="presell-time">
          <div class="time-item">
            <q-icon name="event" size="sm" />
            <span class="label">{{ t('product.presell.presellTime') }}</span>
            <span class="value">
              {{ formatDateTime(product.presellStartTime) }} -
              {{ formatDateTime(product.presellEndTime) }}
            </span>
          </div>
          <div class="time-item">
            <q-icon name="local_shipping" size="sm" />
            <span class="label">{{ t('product.presell.deliveryTime') }}</span>
            <span class="value">{{ formatDateTime(product.deliveryTime) }}</span>
          </div>
        </div>

        <!-- 预售说明 -->
        <div class="presell-notice">
          <div class="notice-title">
            <q-icon name="info" size="sm" />
            {{ t('product.presell.notice.title') }}
          </div>
          <div class="notice-item">
            <span class="label">{{ t('product.presell.notice.depositPeriod') }}</span>
            <span class="value">{{ formatDateTime(product.presellStartTime) }} - {{ formatDateTime(product.presellEndTime) }}</span>
          </div>
          <div class="notice-item">
            <span class="label">{{ t('product.presell.notice.finalPeriod') }}</span>
            <span class="value">{{ formatDateTime(product.finalStartTime) }} - {{ formatDateTime(product.finalEndTime) }}</span>
          </div>
          <div class="notice-item">
            <span class="label">{{ t('product.presell.notice.delivery') }}</span>
            <span class="value">{{ formatDateTime(product.deliveryTime) }}</span>
          </div>
        </div>
      </div>

      <!-- 预售按钮 -->
      <q-btn
        class="full-width"
        color="warning"
        :label="presellButtonText"
        :disable="!canPreOrder"
        @click="handlePreOrder"
      />
    </template>
  </BaseProductDetail>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import BaseProductDetail from './BaseProductDetail.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['buy'])
const $q = useQuasar()
const { t } = useI18n({
  useScope: 'local'
})

// 预售状态
const PRESELL_STATUS = {
  NOT_STARTED: 0,
  DEPOSIT: 1,
  FINAL_PAYMENT: 2,
  ENDED: 3
}

// 计算预售状态
const presellStatus = computed(() => {
  const now = Date.now()
  const presellStart = new Date(props.product.presellStartTime).getTime()
  const presellEnd = new Date(props.product.presellEndTime).getTime()
  const finalStart = new Date(props.product.finalStartTime).getTime()
  const finalEnd = new Date(props.product.finalEndTime).getTime()

  if (now < presellStart) return PRESELL_STATUS.NOT_STARTED
  if (now <= presellEnd) return PRESELL_STATUS.DEPOSIT
  if (now >= finalStart && now <= finalEnd) return PRESELL_STATUS.FINAL_PAYMENT
  return PRESELL_STATUS.ENDED
})

// 状态文本和颜色
const presellStatusText = computed(() => {
  switch (presellStatus.value) {
    case PRESELL_STATUS.NOT_STARTED:
      return t('product.presell.notStarted')
    case PRESELL_STATUS.DEPOSIT:
      return t('product.presell.depositPhase')
    case PRESELL_STATUS.FINAL_PAYMENT:
      return t('product.presell.finalPhase')
    case PRESELL_STATUS.ENDED:
      return t('product.presell.ended')
    default:
      return ''
  }
})

const presellStatusColor = computed(() => {
  switch (presellStatus.value) {
    case PRESELL_STATUS.NOT_STARTED:
      return 'grey'
    case PRESELL_STATUS.DEPOSIT:
      return 'warning'
    case PRESELL_STATUS.FINAL_PAYMENT:
      return 'primary'
    case PRESELL_STATUS.ENDED:
      return 'grey'
    default:
      return 'grey'
  }
})

// 计算最终支付金额
const finalPayment = computed(() => {
  return props.product.presellPrice - props.product.deposit
})

// 购买相关
const canPreOrder = computed(() => {
  return presellStatus.value === PRESELL_STATUS.DEPOSIT &&
         props.product.stock > 0
})

const presellButtonText = computed(() => {
  switch (presellStatus.value) {
    case PRESELL_STATUS.NOT_STARTED:
      return t('product.presell.notStarted')
    case PRESELL_STATUS.DEPOSIT:
      return props.product.stock > 0
        ? t('product.presell.preOrder')
        : t('product.outOfStock')
    case PRESELL_STATUS.FINAL_PAYMENT:
      return t('product.presell.payFinal')
    case PRESELL_STATUS.ENDED:
      return t('product.presell.ended')
    default:
      return ''
  }
})

const handlePreOrder = () => {
  if (!canPreOrder.value) return

  emit('buy', {
    product: props.product,
    quantity: 1,
    isPresell: true,
    phase: presellStatus.value === PRESELL_STATUS.DEPOSIT ? 'deposit' : 'final'
  })
}
</script>

<style lang="scss" scoped>
.presell-info {
  background: #fff7e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.presell-price {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 16px 0;

  .current, .deposit, .final {
    text-align: center;

    .label {
      display: block;
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .price {
      color: #fa8c16;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.presell-time {
  margin: 16px 0;

  .time-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .q-icon {
      color: #fa8c16;
    }

    .label {
      color: #666;
      min-width: 80px;
    }

    .value {
      color: #333;
    }
  }
}

.presell-notice {
  background: #fff;
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;

  .notice-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    margin-bottom: 8px;

    .q-icon {
      color: #fa8c16;
    }
  }

  .notice-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      color: #666;
      min-width: 100px;
    }

    .value {
      color: #333;
    }
  }
}

/* ���应式调整 */
@media (max-width: 599px) {
  .presell-price {
    grid-template-columns: 1fr;
    gap: 12px;

    .price {
      font-size: 18px;
    }
  }

  .presell-time .time-item,
  .presell-notice .notice-item {
    font-size: 13px;
  }
}
</style>
