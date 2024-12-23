<template>
  <div class="bug-report-page">
    <div class="page-container">
      <h1 class="text-h4 q-mb-lg">{{ $t('bugReport.title') }}</h1>
      
      <q-card flat bordered>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <!-- 问题类型 -->
            <q-select
              v-model="formData.type"
              :options="bugTypes"
              :label="$t('bugReport.type')"
              outlined
              :rules="[val => !!val || $t('bugReport.typeRequired')]"
            />

            <!-- 问题标题 -->
            <q-input
              v-model="formData.title"
              :label="$t('bugReport.title')"
              outlined
              :rules="[val => !!val || $t('bugReport.titleRequired')]"
            />

            <!-- 问题描述 -->
            <q-input
              v-model="formData.description"
              type="textarea"
              :label="$t('bugReport.description')"
              outlined
              autogrow
              :rules="[val => !!val || $t('bugReport.descriptionRequired')]"
            />

            <!-- 重现步骤 -->
            <q-input
              v-model="formData.steps"
              type="textarea"
              :label="$t('bugReport.steps')"
              outlined
              autogrow
            />

            <!-- 截图上传 -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('bugReport.screenshots') }}</div>
              <ImageUploader
                v-model="formData.files"
                :max-files="5"
                @upload-success="onUploadSuccess"
                @upload-error="onUploadError"
              />
            </div>

            <!-- 联系方式 -->
            <q-input
              v-model="formData.contact"
              :label="$t('bugReport.contact')"
              outlined
              :hint="$t('bugReport.contactHint')"
            />

            <!-- 提交按钮 -->
            <div class="row justify-end q-mt-md">
              <q-btn
                type="submit"
                color="primary"
                :label="$t('bugReport.submit')"
                :loading="submitting"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import ImageUploader from '~/components/ImageUploader.vue'

const $q = useQuasar()
const { t } = useI18n()

const formData = ref({
  type: '',
  title: '',
  description: '',
  steps: '',
  files: [],
  contact: ''
})

const submitting = ref(false)

const bugTypes = [
  { label: t('bugReport.types.functional'), value: 'functional' },
  { label: t('bugReport.types.display'), value: 'display' },
  { label: t('bugReport.types.performance'), value: 'performance' },
  { label: t('bugReport.types.other'), value: 'other' }
]

const uploadedUrls = ref<string[]>([])

const onUploadSuccess = (urls: string[]) => {
  uploadedUrls.value = urls
}

const onUploadError = (error: any) => {
  $q.notify({
    type: 'negative',
    message: t('bugReport.uploadError')
  })
}

const onSubmit = async () => {
  submitting.value = true
  try {
    const workOrderData = {
      title: formData.value.title,
      explanation: formData.value.description + '\n重现步骤：\n' + formData.value.steps,
      imgUrls: uploadedUrls.value.join(','),
      email: formData.value.contact,
      workType: 1,   // 1表示bug报告大类
      subType: formData.value.type.value, // 获取选择项的value值
      status: 0,
    }

    const response = await api.post('/workOrder/add', workOrderData)

    if (response.code === 200) {
      $q.notify({
        type: 'positive',
        message: t('bugReport.submitSuccess')
      })
      resetForm()
      uploadedUrls.value = []
    } else {
      throw new Error(response.msg || t('bugReport.submitError'))
    }
  } catch (error) {
    console.error('提交错误报告失败:', error)
    $q.notify({
      type: 'negative',
      message: t('bugReport.submitError')
    })
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    type: '',
    title: '',
    description: '',
    steps: '',
    files: [],
    contact: ''
  }
}
</script>

<style lang="scss" scoped>
.bug-report-page {
  padding: 20px;
  
  .page-container {
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
