<template>
  <div class="custom-apply-page">
    <div class="page-container">
      <h1 class="text-h5 q-mb-lg">{{ t('custom.apply.title') }}</h1>

      <!-- 申请表单 -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.apply.formTitle') }}</div>
          <q-form @submit="submitApplication" class="q-gutter-md">
            <!-- 申请标题 -->
            <q-input
              v-model="formData.title"
              :label="t('custom.apply.form.title')"
              filled
              :rules="[val => !!val || t('custom.apply.form.titleRequired')]"
            />

            <!-- 基本信息 -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData.name"
                  :label="t('custom.apply.name')"
                  filled
                  :rules="[val => !!val || t('custom.apply.error.nameRequired')]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData.contact"
                  :label="t('custom.apply.contact')"
                  filled
                  :rules="[val => !!val || t('custom.apply.error.contactRequired')]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model="formData.email"
                  :label="t('custom.apply.email')"
                  filled
                  type="email"
                  :rules="[
                    val => !!val || t('custom.apply.error.emailRequired'),
                    val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || t('custom.apply.error.invalidEmail')
                  ]"
                />
              </div>
            </div>

            <!-- 定制类型 -->
            <q-select
              v-model="formData.itemType"
              :options="customTypes"
              :label="t('custom.apply.form.type')"
              filled
              :rules="[val => !!val || t('custom.apply.error.typeRequired')]"
              emit-value
              map-options
            />

            <!-- 需求描述 -->
            <div class="q-mb-md">
              <div class="text-subtitle1 q-mb-sm">详细需求描述</div>
              <rich-editor
                v-model="formData.requirements"
                placeholder="请详细描述您的定制需求..."
                :rules="[val => !!val || '请填写详细需求描述']"
              />
              <div class="text-caption text-grey-7 q-mt-sm">
                请尽可能详细地描述您的定制需求，包括具体的尺寸、材质、颜色等要求。
              </div>
            </div>

            <!-- 预算范围 -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  v-model.number="formData.budgetMin"
                  type="number"
                  :label="t('custom.apply.budgetMin')"
                  filled
                  :rules="[
                    val => val > 0 || t('custom.apply.error.invalidBudget'),
                    val => !formData.budgetMax || val <= formData.budgetMax || t('custom.apply.error.budgetRange')
                  ]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  v-model.number="formData.budgetMax"
                  type="number"
                  :label="t('custom.apply.budgetMax')"
                  filled
                  :rules="[
                    val => val > 0 || t('custom.apply.error.invalidBudget'),
                    val => !formData.budgetMin || val >= formData.budgetMin || t('custom.apply.error.budgetRange')
                  ]"
                />
              </div>
            </div>

            <!-- 参考图片上传部分 -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ t('custom.apply.referenceImages') }}</div>
              <ImageUploader
                v-model="formData.referenceImages"
                :max-files="6"
                :max-size="51200"
                accept="image/*"
                :label="t('custom.apply.uploadImages')"
                :rules="[
                  files => files.length <= 6 || t('custom.apply.error.tooManyFiles'),
                  files => !files.some(file => file.size > 51200 * 1024) || t('custom.apply.error.fileTooLarge')
                ]"
                @upload-success="handleImageUploadSuccess"
                @upload-error="handleImageUploadError"
              />
              <div class="text-caption text-grey q-mt-sm">
                {{ t('custom.apply.imageNote') }} {{ t('custom.apply.fileLimitNote', { maxFiles: 6, maxSize: '50MB' }) }}
              </div>
            </div>

            <!-- 附件上传区域 -->
            <div class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ t('custom.apply.attachments') }}</div>
              <FileUploader
                v-model="formData.attachments"
                :max-files="6"
                :max-size="51200"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.7z"
                :label="t('custom.apply.uploadAttachment')"
                @upload-success="handleAttachmentUploadSuccess"
                @upload-error="handleAttachmentUploadError"
              />
              <div class="text-caption text-grey q-mt-sm">
                {{ t('custom.apply.attachmentNote') }} {{ t('custom.apply.fileLimitNote', { maxFiles: 6, maxSize: '50MB' }) }}
              </div>
            </div>

            <!-- 其他要求 -->
            <q-input
              v-model="formData.additionalRequirements"
              type="textarea"
              :label="t('custom.apply.additionalRequirements')"
              filled
              rows="3"
            />

            <!-- 申请类型选择 -->
            <div class="q-mb-md">
              <div class="text-subtitle1 q-mb-sm">{{ t('custom.apply.form.applicationType') }}</div>
              <q-option-group
                v-model="formData.type"
                :options="[
                  { label: t('custom.type.personal'), value: 1 },
                  { label: t('custom.type.crowdfunding'), value: 2 }
                ]"
                color="primary"
                inline
              />
            </div>


            <!-- 提交按钮 -->
            <div class="row justify-end q-mt-lg">
              <q-btn
                type="submit"
                color="primary"
                :label="t('custom.apply.submit')"
                :loading="submitting"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <!-- 申请进度 -->
      <q-card flat bordered v-if="applicationId">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('custom.apply.progress') }}</div>
          <q-timeline color="primary">
            <q-timeline-entry
              v-for="(progress, index) in progressList"
              :key="index"
              :title="progress.title"
              :subtitle="formatDate(progress.time)"
              :color="progress.color"
            >
              <div>{{ progress.description }}</div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </div>

    <!-- 文件上传错误提示 -->
    <q-dialog v-model="showFileError">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ t('custom.apply.error.uploadFailed') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ fileErrorMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="t('common.ok')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/utils/axios'
import { useQuasar } from 'quasar'
import ImageUploader from '~/components/common/ImageUploader.vue'
import FileUploader from '~/components/common/FileUploader.vue'
import RichEditor from '~/components/rich-editor/index.vue'
import {getImageUrl} from "~/utils/tools";

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const $q = useQuasar()

interface FormData {
  title: string
  name: string
  contact: string
  email: string
  type: number
  itemType: string
  requirements: string
  budgetMin: number
  budgetMax: number
  referenceImages: string[]
  attachments: string[]
  additionalRequirements: string
  targetAmount: number | null
  minSupportAmount: number | null
  startTime: string
  endTime: string
  rewards: Array<{
    title: string
    amount: number
    description: string
  }>
}

interface Progress {
  title: string
  time: string
  description: string
  color: string
}

const formData = ref<FormData>({
  title: '',
  name: '',
  contact: '',
  email: '',
  type: 1,
  itemType: '',
  requirements: '',
  budgetMin: 0,
  budgetMax: 0,
  referenceImages: [],
  attachments: [],
  additionalRequirements: '',
  targetAmount: null,
  minSupportAmount: null,
  startTime: '',
  endTime: '',
  rewards: []
})

const submitting = ref(false)
const showFileError = ref(false)
const fileErrorMessage = ref('')
const applicationId = ref('')
const progressList = ref<Progress[]>([])

// 定制类型选项
const customTypes = [
  { label: t('custom.type.clothing'), value: 'clothing' },
  { label: t('custom.type.jewelry'), value: 'jewelry' },
  { label: t('custom.type.furniture'), value: 'furniture' },
  { label: t('custom.type.artwork'), value: 'artwork' },
  { label: t('custom.type.figure'), value: 'figure' },
  { label: t('custom.type.other'), value: 'other' }
]

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return date.formatDate(dateStr, 'YYYY-MM-DD HH:mm:ss')
}

// 文件上传错误处理
const onFileRejected = (rejectedEntries: any[]) => {
  showFileError.value = true
  fileErrorMessage.value = rejectedEntries
    .map(entry => {
      if (entry.failedPropValidation === 'max-files') {
        return t('custom.apply.error.tooManyFiles')
      }
      if (entry.failedPropValidation === 'accept') {
        return t('custom.apply.error.invalidAttachmentType')
      }
      return entry.file.name + ': ' + entry.failedPropValidation
    })
    .join('\n')
}

// 处理图片上传成功
const handleImageUploadSuccess = (urls: string[]) => {
  formData.value.referenceImages = [...formData.value.referenceImages, ...urls]
}

// 处理图片上传失败
const handleImageUploadError = (error: any) => {
  console.error('图片上传失败:', error)
  let errorMessage = t('custom.apply.error.imageUploadFailed')

  // 处理特定错误类型
  if (error.code === 'FILE_SIZE_LIMIT_EXCEEDED') {
    errorMessage = t('custom.apply.error.fileTooLarge')
  } else if (error.code === 'MAX_FILES_EXCEEDED') {
    errorMessage = t('custom.apply.error.tooManyFiles')
  }

  $q.notify({
    type: 'negative',
    message: errorMessage
  })
}

// 处理附件上传成功
const handleAttachmentUploadSuccess = (urls: string[]) => {
  $q.notify({
    type: 'positive',
    message: t('custom.apply.uploadSuccess')
  })
}

// 处理附件上传失败
const handleAttachmentUploadError = (error: any) => {
  console.error('附件上传失败:', error)
  $q.notify({
    type: 'negative',
    message: t('custom.apply.error.attachmentUploadFailed')
  })
}

// 移除附件
const removeAttachment = (index: number) => {
  const files = [...formData.value.attachments]
  files.splice(index, 1)
  formData.value.attachments = files
}

// 清除所有附件
const clearAttachments = () => {
  formData.value.attachments = []
}

// 获取文件图标
const getFileIcon = (fileType: string) => {
  const iconMap: Record<string, string> = {
    'application/pdf': 'picture_as_pdf',
    'application/msword': 'description',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'description',
    'application/vnd.ms-excel': 'table_chart',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'table_chart',
    'application/zip': 'folder_zip',
    'application/x-rar-compressed': 'folder_zip',
    'application/x-7z-compressed': 'folder_zip'
  }
  return iconMap[fileType] || 'insert_drive_file'
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 添加回报选项
const addReward = () => {
  formData.value.rewards.push({
    title: '',
    amount: 0,
    description: ''
  })
  // 同时添加对应的错误状态对象
  rewardErrors.value.push({
    description: false
  })
}

// 移除回报选项
const removeReward = (index: number) => {
  formData.value.rewards.splice(index, 1)
  rewardErrors.value.splice(index, 1)
}

// 表单错误
const formErrors = ref({
  requirements: false,
  // ... 其他错误字段
})

// 处理编辑内容变化
const handleEditorChange = (content: string) => {
  formData.value.requirements = content
  // 清除错误提示
  if (content) {
    formErrors.value.requirements = false
  }
}

// 表单验证
const validateForm = () => {
  let isValid = true

  // 验证标题
  if (!formData.value.title.trim()) {
    isValid = false
    $q.notify({
      type: 'negative',
      message: t('custom.apply.form.titleRequired')
    })
  }

  // 验证富文本内容
  if (!formData.value.requirements.trim()) {
    formErrors.value.requirements = true
    isValid = false
  }

  // 验证众筹回报描述
  if (formData.value.type === 'crowdfunding') {
    formData.value.rewards.forEach((reward, index) => {
      if (!reward.description.trim()) {
        if (!rewardErrors.value[index]) {
          rewardErrors.value[index] = {}
        }
        rewardErrors.value[index].description = true
        isValid = false
      }
    })
  }

  // 验证文件数量和大小
  if (formData.value.referenceImages.length > 6) {
    $q.notify({
      type: 'negative',
      message: t('custom.apply.error.tooManyFiles')
    })
    isValid = false
  }

  if (formData.value.attachments.length > 6) {
    $q.notify({
      type: 'negative',
      message: t('custom.apply.error.tooManyFiles')
    })
    isValid = false
  }

  // ... 其���验证逻辑 ...

  return isValid
}

// 提交申请
const submitApplication = async () => {
  if (!validateForm()) {
    $q.notify({
      type: 'warning',
      message: t('custom.apply.error.formInvalid')
    })
    return
  }

  try {
    submitting.value = true

    // 准备提交数据
    const submitData = {
      ...formData.value,
      attachments: formData.value.attachments.map((url: string) => url),
      referenceImages: formData.value.referenceImages.map((url: string) => url)
    }

    // 如果是众筹申请，添加众筹相关字段
    if (formData.value.type === 'crowdfunding') {
      Object.assign(submitData, {
        targetAmount: parseFloat(crowdfundingData.value.targetAmount),
        minSupportAmount: parseFloat(crowdfundingData.value.minSupportAmount),
        startTime: crowdfundingData.value.startTime,
        endTime: crowdfundingData.value.endTime,
        rewards: rewards.value
      })
    }

    // 提交申请
    const response = await api.post('/admin/custom/apply', submitData)

    if (response.data.code === 200) {
      $q.notify({
        type: 'positive',
        message: t('custom.apply.success')
      })
      router.push('/user/custom')
    } else {
      throw new Error(response.data.msg || t('custom.apply.error.submitFailed'))
    }
  } catch (error) {
    console.error('提交申请失败:', error)
    $q.notify({
      type: 'negative',
      message: error.message || t('custom.apply.error.submitFailed')
    })
  } finally {
    submitting.value = false
  }
}

// 加载申请进度
const loadProgress = async () => {
  try {
    const response = await api.get(`/custom/progress/${applicationId.value}`)
    if (response.data.code === 200) {
      progressList.value = response.data.data
    }
  } catch (error) {
    console.error('获取进度失败:', error)
  }
}

// 如果有applicationId参数,加载进度
onMounted(() => {
  const id = route.query.id
  if (id) {
    applicationId.value = id as string
    loadProgress()
  }
})

// 组件卸载清理预览URL
onUnmounted(() => {
  formData.value.referenceImages.forEach(url => URL.revokeObjectURL(url))
})

// 清理编辑器实例
onBeforeUnmount(() => {
  // TinyMCE 会自动清理实例
})

// 回报误状态
const rewardErrors = ref<Array<{description?: boolean}>>([])

// 处理回报描述变化
const handleRewardDescriptionChange = (index: number, content: string) => {
  formData.value.rewards[index].description = content
  // 清除错误提示
  if (content && rewardErrors.value[index]) {
    rewardErrors.value[index].description = false
  }
}

// 处理附件上传成功
const handleAttachmentUpload = (files: any[]) => {
  console.log('上传的附件:', files)
}

// 处理附件上传失败
const handleAttachmentError = (error: any) => {
  console.error('附件上传失败:', error)
}

// 初始化响应式数据
const attachments = ref<Array<{
  url: string
  md5: string
  size: number
  title: string
}>>([])
</script>

<style lang="scss" scoped>
.custom-apply-page {
  padding: 20px;

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .image-preview-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .attachment-list {
    max-width: 600px;
  }

  .reward-item {
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: #e0e0e0;
    }
  }
}

// 富文本编辑器样式调整
:deep(.tox-tinymce) {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

:deep(.tox-toolbar__primary) {
  background: none !important;
}

:deep(.tox .tox-edit-area__iframe) {
  background: #fff;
}

// 回报编辑器样式调整
.reward-item {
  :deep(.tox-tinymce) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    margin-bottom: 8px;
  }

  :deep(.tox-toolbar__primary) {
    background: none !important;
  }

  :deep(.tox .tox-edit-area__iframe) {
    background: #fff;
  }
}

.editor-content {
  font-family: Arial, sans-serif;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1em;
  }

  ul, ol {
    padding-left: 2em;
    margin-bottom: 1em;
  }

  blockquote {
    border-left: 4px solid #ccc;
    margin-left: 0;
    padding-left: 1em;
    color: #666;
  }
}

// 自定义编辑器工具栏样式
.q-editor {
  border-radius: 4px;

  .q-editor__toolbar {
    background-color: #f5f5f5;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .q-editor__content {
    min-height: 300px;
    padding: 12px;
  }
}

// 响应式调整
@media (max-width: 599px) {
  .q-editor__toolbar {
    flex-wrap: wrap;

    .q-btn-group {
      margin-bottom: 4px;
    }
  }
}
</style>
