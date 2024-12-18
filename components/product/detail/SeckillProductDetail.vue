<template>
  <BaseProductDetail
    :product="product"
    @buy="handleBuy"
    @add-to-cart="handleAddToCart"
  >
    <template #action-buttons>
      <!-- 秒杀特有的信息和按钮 -->
      <div class="seckill-info">
        <!-- 秒杀状态 -->
        <div class="seckill-status">
          <q-chip
            :color="seckillStatusColor"
            text-color="white"
          >
            {{ seckillStatusText }}
          </q-chip>
        </div>

        <!-- 倒计时 -->
        <div class="countdown" v-if="showCountdown">
          <div class="label">{{ countdownLabel }}</div>
          <div class="timer">
            <span class="time-block">{{ timeLeft.hours }}</span> :
            <span class="time-block">{{ timeLeft.minutes }}</span> :
            <span class="time-block">{{ timeLeft.seconds }}</span>
          </div>
        </div>

        <!-- 秒杀进度 -->
        <div class="progress-info">
          <div class="progress-header">
            <span>已抢{{ product.soldNum }}件</span>
            <span>剩余{{ remainingStock }}件</span>
          </div>
          <q-linear-progress
            :value="progress"
            color="negative"
            class="q-mt-sm"
          />
        </div>

        <!-- 秒杀价格 -->
        <div class="seckill-price">
          <div class="current">
            <span class="label">秒杀价</span>
            <span class="price">¥{{ product.seckillPrice }}</span>
          </div>
          <div class="original">
            <span class="label">原价</span>
            <span class="price">¥{{ product.oriPrice }}</span>
          </div>
        </div>
      </div>

      <!-- 秒杀按钮 -->
      <q-btn
        class="full-width"
        color="negative"
        :label="seckillButtonText"
        :disable="!canBuy"
        @click="handleSeckillBuy"
      />

      <!-- 秒杀规则说明 -->
      <div class="seckill-rules q-mt-md">
        <div class="rule-item">
          <q-icon name="schedule" size="sm" />
          <span>限时秒杀 {{ formatTime(product.seckillStartTime) }} - {{ formatTime(product.seckillEndTime) }}</span>
        </div>
        <div class="rule-item">
          <q-icon name="person" size="sm" />
          <span>每人限购{{ product.seckillLimit }}件</span>
        </div>
      </div>
    </template>
  </BaseProductDetail>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import BaseProductDetail from './BaseProductDetail.vue'
import { formatTime } from '~/utils/format'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const $q = useQuasar()
const { t } = useI18n({
  useScope: 'local'
})

// 秒杀状态
const SECKILL_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  ENDED: 2
}

// 计算秒杀状态
const seckillStatus = computed(() => {
  const now = Date.now()
  const startTime = new Date(props.product.seckillStartTime).getTime()
  const endTime = new Date(props.product.seckillEndTime).getTime()

  if (now < startTime) return SECKILL_STATUS.NOT_STARTED
  if (now > endTime) return SECKILL_STATUS.ENDED
  return SECKILL_STATUS.IN_PROGRESS
})

// 状态文本和颜色
const seckillStatusText = computed(() => {
  switch (seckillStatus.value) {
    case SECKILL_STATUS.NOT_STARTED:
      return '即将开始'
    case SECKILL_STATUS.IN_PROGRESS:
      return '抢购中'
    case SECKILL_STATUS.ENDED:
      return '已结束'
    default:
      return ''
  }
})

const seckillStatusColor = computed(() => {
  switch (seckillStatus.value) {
    case SECKILL_STATUS.NOT_STARTED:
      return 'orange'
    case SECKILL_STATUS.IN_PROGRESS:
      return 'negative'
    case SECKILL_STATUS.ENDED:
      return 'grey'
    default:
      return 'grey'
  }
})

// 倒计时相关
const timeLeft = ref({ hours: '00', minutes: '00', seconds: '00' })
const countdownTimer = ref<number | null>(null)

const showCountdown = computed(() =>
  seckillStatus.value === SECKILL_STATUS.NOT_STARTED ||
  seckillStatus.value === SECKILL_STATUS.IN_PROGRESS
)

const countdownLabel = computed(() =>
  seckillStatus.value === SECKILL_STATUS.NOT_STARTED ? '距开始' : '距结束'
)

const updateCountdown = () => {
  const now = Date.now()
  const targetTime = seckillStatus.value === SECKILL_STATUS.NOT_STARTED
    ? new Date(props.product.seckillStartTime).getTime()
    : new Date(props.product.seckillEndTime).getTime()

  const diff = targetTime - now

  if (diff <= 0) {
    clearInterval(countdownTimer.value!)
    location.reload() // 刷新页面以更新状态
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
  const total = props.product.seckillStock
  const sold = props.product.soldNum
  return sold / total
})

const remainingStock = computed(() =>
  props.product.seckillStock - props.product.soldNum
)

// 购买相关
const canBuy = computed(() =>
  seckillStatus.value === SECKILL_STATUS.IN_PROGRESS &&
  remainingStock.value > 0
)

const seckillButtonText = computed(() => {
  if (seckillStatus.value === SECKILL_STATUS.NOT_STARTED) return '即将开始'
  if (seckillStatus.value === SECKILL_STATUS.ENDED) return '已结束'
  if (remainingStock.value <= 0) return '已抢光'
  return '立即抢购'
})

const handleSeckillBuy = () => {
  if (!canBuy.value) return

  // 这里添加秒杀购买逻辑
}

// 生命周期
onMounted(() => {
  updateCountdown()
  countdownTimer.value = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.seckill-info {
  background: #fff8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
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
      background: #ff4d4f;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }
}

.progress-info {
  margin: 16px 0;

  .progress-header {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }
}

.seckill-price {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin: 16px 0;

  .current {
    .label {
      color: #ff4d4f;
      font-size: 14px;
    }
    .price {
      color: #ff4d4f;
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

.seckill-rules {
  color: #666;
  font-size: 14px;

  .rule-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
}

/* 响应式调整 */
@media (max-width: 599px) {
  .countdown .timer {
    font-size: 20px;
  }

  .seckill-price .current .price {
    font-size: 24px;
  }
}
</style>
