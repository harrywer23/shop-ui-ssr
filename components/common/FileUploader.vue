<template>
  <div class="file-uploader">
    <q-file
      v-model="files"
      :label="label"
      :accept="accept"
      :max-files="maxFiles"
      :max-file-size="maxSize * 1024"
      multiple
      filled
      bottom-slots
      counter
      @rejected="onRejected"
      @update:model-value="handleFileChange"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
      <template v-slot:append v-if="files && files.length > 0">
        <q-icon name="close" class="cursor-pointer" @click.stop="clearFiles" />
      </template>
    </q-file>

    <!-- 文件列表 -->
    <div v-if="uploadedFiles.length > 0" class="file-list q-mt-sm">
      <q-list bordered separator>
        <q-item v-for="(file, index) in uploadedFiles" :key="file.id">
          <q-item-section avatar>
            <q-icon :name="getFileIcon(getFileType(file.name))" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ file.name }}</q-item-label>
            <q-item-label caption>
              <span>{{ formatFileSize(file.size) }}</span>
              <a :href="file.url" target="_blank" class="text-primary q-ml-sm">查看文件</a>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="removeFile(index)"
              color="grey-6"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { api } from '@/utils/axios'

const $q = useQuasar()
const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: '*/*'
  },
  maxFiles: {
    type: Number,
    default: 6
  },
  maxSize: {
    type: Number,
    default: 51200 // 50MB in KB
  }
})

const emit = defineEmits(['update:modelValue', 'upload-success', 'upload-error'])

const files = ref([])
const uploadedFiles = ref([])

// 处理文件选择
const handleFileChange = async (newFiles: File[]) => {
  if (!newFiles) return
  try {
    const formData = new FormData()
    for (const file of newFiles) {
      formData.append('file', file)
    }
    
    const response = await api.post('/common/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.code === 200) {
      const fileData = response.data.data
      uploadedFiles.value = [...uploadedFiles.value, {
        url: fileData.sourceUrl,
        name: fileData.title,
        size: parseInt(fileData.size),
        id: fileData.id
      }]
      emit('update:modelValue', uploadedFiles.value.map(file => file.url))
      emit('upload-success', uploadedFiles.value)
      
      // 清空文件选择
      files.value = []
    } else {
      throw new Error(response.data.msg || '上传失败')
    }
  } catch (error) {
    console.error('文件上传失败:', error)
    emit('upload-error', error)
    $q.notify({
      type: 'negative',
      message: t('custom.apply.error.uploadFailed')
    })
    // 清空文件选择
    files.value = []
  }
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
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// 处理文件拒绝
const onRejected = (rejectedEntries: any[]) => {
  rejectedEntries.forEach((entry) => {
    let message = ''
    if (entry.failedPropValidation === 'max-files') {
      message = t('custom.apply.error.tooManyFiles')
    } else if (entry.failedPropValidation === 'max-file-size') {
      message = t('custom.apply.error.fileTooLarge')
    } else if (entry.failedPropValidation === 'accept') {
      message = t('custom.apply.error.invalidAttachmentType')
    }
    
    $q.notify({
      type: 'negative',
      message
    })
  })
}

// 修改移除文件方法
const removeFile = (index: number) => {
  files.value = files.value.filter((_, i) => i !== index)
  uploadedFiles.value = uploadedFiles.value.filter((_, i) => i !== index)
  emit('update:modelValue', uploadedFiles.value.map(file => file.url))
}

// 修改清空文件方法
const clearFiles = () => {
  files.value = []
  uploadedFiles.value = []
  emit('update:modelValue', [])
}

// 获取文件类型
const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase() || ''
  const mimeTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed'
  }
  return mimeTypes[extension] || 'application/octet-stream'
}
</script>

<style lang="scss" scoped>
.file-uploader {
  .file-list {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style> 