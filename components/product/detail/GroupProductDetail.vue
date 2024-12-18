<template>
  <BaseProductDetail
    :product="product"
    @buy="handleBuy"
    @add-to-cart="handleAddToCart"
  >
    <template #action-buttons>
      <!-- 团购特有的信息和按钮 -->
      <div class="group-info">
        <!-- 团购状态 -->
        <div class="group-status">
          <q-chip
            :color="groupStatusColor"
            text-color="white"
          >
            {{ groupStatusText }}
          </q-chip>
        </div>

        <!-- 团购价格信息 -->
        <div class="group-price">
          <div class="current">
            <span class="label">{{ t('product.group.price') }}</span>
            <span class="price">¥{{ product.groupPrice }}</span>
          </div>
          <div class="original">
            <span class="label">{{ t('product.group.originalPrice') }}</span>
            <span class="price">¥{{ product.oriPrice }}</span>
          </div>
        </div>

        <!-- 团购进度 -->
        <div class="group-progress">
          <div class="progress-header">
            <span>{{ t('product.group.joined', { count: product.joinedCount }) }}</span>
            <span>{{ t('product.group.minMembers', { count: product.minMembers }) }}</span>
          </div>
          <q-linear-progress
            :value="progress"
            color="positive"
            class="q-mt-sm"
          />
        </div>

        <!-- 倒计时 -->
        <div class="countdown" v-if="showCountdown">
          <div class="label">{{ t('product.group.timeLeft') }}</div>
          <div class="timer">
            <span class="time-block">{{ timeLeft.hours }}</span> :
            <span class="time-block">{{ timeLeft.minutes }}</span> :
            <span class="time-block">{{ timeLeft.seconds }}</span>
          </div>
        </div>

        <!-- 团购规则 -->
        <div class="group-rules">
          <div class="rule-title">{{ t('product.group.rules.title') }}</div>
          <div class="rule-item">
            <q-icon name="group" size="sm" />
            <span>{{ t('product.group.rules.minMember', { count: product.minMembers }) }}</span>
          </div>
          <div class="rule-item">
            <q-icon name="payments" size="sm" />
            <span>{{ t('product.group.rules.groupPrice', { price: product.groupPrice }) }}</span>
          </div>
          <div class="rule-item">
            <q-icon name="info" size="sm" />
            <span>{{ t('product.group.rules.autoCancel') }}</span>
          </div>
        </div>
      </div>

      <!-- 团购按钮 -->
      <q-btn
        class="full-width"
        color="positive"
        :label="groupButtonText"
        :disable="!canJoin"
        @click="handleGroupBuy"
      />
    </template>
  </BaseProductDetail>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import BaseProductDetail from './BaseProductDetail.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['buy', 'add-to-cart'])
const $q = useQuasar()
const { t } = useI18n()

// 团购状态
const GROUP_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  SUCCESS: 2,
  FAILED: 3
}

// 计算团购状态
const groupStatus = computed(() => {
  const now = Date.now()
  const endTime = new Date(props.product.groupEndTime).getTime()
  
  if (props.product.joinedCount >= props.product.minMembers) {
    return GROUP_STATUS.SUCCESS
  }
  if (now > endTime) {
    return GROUP_STATUS.FAILED
  }
  return GROUP_STATUS.IN_PROGRESS
})

// 状态文本和颜色
const groupStatusText = computed(() => {
  switch (groupStatus.value) {
    case GROUP_STATUS.IN_PROGRESS:
      return t('product.group.inProgress')
    case GROUP_STATUS.SUCCESS:
      return t('product.group.success')
    case GROUP_STATUS.FAILED:
      return t('product.group.failed')
    default:
      return ''
  }
})

const groupStatusColor = computed(() => {
  switch (groupStatus.value) {
    case GROUP_STATUS.IN_PROGRESS:
      return 'positive'
    case GROUP_STATUS.SUCCESS:
      return 'positive'
    case GROUP_STATUS.FAILED:
      return 'grey'
    default:
      return 'grey'
  }
})

// 倒计时相关
const timeLeft = ref({ hours: '00', minutes: '00', seconds: '00' })
const countdownTimer = ref<number | null>(null)

const showCountdown = computed(() => 
  groupStatus.value === GROUP_STATUS.IN_PROGRESS
)

const updateCountdown = () => {
  const now = Date.now()
  const endTime = new Date(props.product.groupEndTime).getTime()
  const diff = endTime - now
  
  if (diff <= 0) {
    clearInterval(countdownTimer.value!)
    location.reload()
    return
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  timeLeft.value = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
}

// 进度相关
const progress = computed(() => {
  return props.product.joinedCount / props.product.minMembers
})

// 购买相关
const canJoin = computed(() => 
  groupStatus.value === GROUP_STATUS.IN_PROGRESS &&
  props.product.stock > 0
)

const groupButtonText = computed(() => {
  if (groupStatus.value === GROUP_STATUS.SUCCESS) {
    return t('product.group.joined')
  }
  if (groupStatus.value === GROUP_STATUS.FAILED) {
    return t('product.group.failed')
  }
  if (props.product.stock <= 0) {
    return t('product.outOfStock')
  }
  return t('product.group.startGroup', { price: props.product.groupPrice })
})

const handleGroupBuy = () => {
  if (!canJoin.value) return
  
  emit('buy', {
    product: props.product,
    quantity: 1,
    isGroup: true
  })
}

// 生命周期
onMounted(() => {
  if (showCountdown.value) {
    updateCountdown()
    countdownTimer.value = setInterval(updateCountdown, 1000)
  }
})

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.group-info {
  background: #f6ffed;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.group-price {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin: 16px 0;
  
  .current {
    .label {
      color: #52c41a;
      font-size: 14px;
    }
    .price {
      color: #52c41a;
      font-size: 28px;
      font-weight: bold;
    }
  }
  
  .original {
    .label {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 14px;
      text-decoration: line-through;
    }
  }
}

.group-progress {
  margin: 16px 0;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }
}

.countdown {
  text-align: center;
  margin: 16px 0;
  
  .label {
    color: #666;
    margin-bottom: 8px;
  }
  
  .timer {
    font-size: 24px;
    font-weight: bold;
    
    .time-block {
      background: #52c41a;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}

.group-rules {
  background: #fff;
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;
  
  .rule-title {
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .rule-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 14px;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .q-icon {
      color: #52c41a;
    }
  }
}

/* 响应式调整 */
@media (max-width: 599px) {
  .countdown .timer {
    font-size: 20px;
  }
  
  .group-price .current .price {
    font-size: 24px;
  }
  
  .group-rules {
    font-size: 13px;
  }
}
</style> 