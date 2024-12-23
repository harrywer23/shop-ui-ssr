<template>
  <div class="return-apply-page">
    <h1 class="text-h4 q-mb-lg">{{ t('return.apply.title') }}</h1>

    <!-- 订单信息 -->
    <div class="order-info q-mb-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1">{{ t('order.detail.orderNumber') }}：{{ orderNumber }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- 退货申请表单 -->
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- 退货原因 -->
      <q-input
        v-model="form.reason"
        :label="t('return.apply.reason')"
        :rules="[val => !!val || t('return.apply.reasonRequired')]"
        filled
      />

      <!-- 退货说明 -->
      <q-input
        v-model="form.description"
        type="textarea"
        :label="t('return.apply.description')"
        :placeholder="t('return.apply.descriptionPlaceholder')"
        filled
      />

      <!-- 上传凭证图片 -->
      <div class="upload-section">
        <div class="text-subtitle2 q-mb-sm">{{ t('return.apply.proofPics') }}</div>
        <q-file
          v-model="form.proofPics"
          multiple
          accept=".jpg,.jpeg,.png"
          @update:model-value="handleFileUpload"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>

      <!-- 提交按钮 -->
      <div class="row justify-end q-mt-md">
        <q-btn
          type="submit"
          color="primary"
          :label="t('return.apply.submit')"
          :loading="submitting"
        />
      </div>
    </q-form>

    <!-- 退货申请记录 -->
    <div class="return-records q-mt-lg">
      <h2 class="text-h6 q-mb-md">{{ t('return.apply.records') }}</h2>
      <q-list bordered separator>
        <q-item v-for="record in returnRecords" :key="record.id">
          <q-item-section>
            <q-item-label>{{ t(`return.status.${record.status}`) }}</q-item-label>
            <q-item-label caption>{{ record.createTime }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const $q = useQuasar()

const orderId = ref(route.query.orderId)
const orderNumber = ref('')
const submitting = ref(false)
const returnRecords = ref([])

const form = ref({
  reason: '',
  description: '',
  proofPics: []
})

// 获取订单信息和退货记录
const loadData = async () => {
  try {
    // 获取订单信息
    const orderRes = await fetch(`/api/orders/${orderId.value}`)
    const orderData = await orderRes.json()
    orderNumber.value = orderData.orderNumber

    // 获取退货记录
    const recordsRes = await fetch(`/api/returns?orderId=${orderId.value}`)
    const recordsData = await recordsRes.json()
    returnRecords.value = recordsData
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: t('return.apply.loadFailed')
    })
  }
}

// 处理文件上传
const handleFileUpload = (files) => {
  // 处理文件上传逻辑
}

// 提交表单
const onSubmit = async () => {
  try {
    submitting.value = true
    const response = await fetch('/api/returns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: orderId.value,
        ...form.value
      })
    })

    if (response.ok) {
      $q.notify({
        type: 'positive',
        message: t('return.apply.submitSuccess')
      })
      await loadData() // 重新加载数据
    } else {
      throw new Error('Submit failed')
    }
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: t('return.apply.submitFailed')
    })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
.return-apply-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .upload-section {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
  }
}
</style> 