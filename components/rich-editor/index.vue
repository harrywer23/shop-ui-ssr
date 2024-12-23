<template>
  <div class="rich-editor">
    <q-editor
      v-model="content"
      :toolbar="toolbar"
      :fonts="fonts"
      :min-height="props.minHeight"
      content-class="editor-content"
      class="bg-white"
      :placeholder="placeholder"
      :rules="rules"
      @update:model-value="handleChange"
    >
      <!-- 自定义图片上传按钮 -->
      <template v-slot:upload>
        <q-btn
          dense
          color="primary"
          icon="image"
          class="q-mx-xs"
          @click="triggerImageUpload"
        >
          <q-tooltip>{{ $q.lang.editor.uploadImage }}</q-tooltip>
        </q-btn>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleFileChange"
        />
      </template>
    </q-editor>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from '@/utils/axios'
import {API_CONSTANTS} from "~/utils/constants";
import { QVueGlobals } from 'quasar'

const $q = useQuasar() as QVueGlobals
const fileInput = ref<HTMLInputElement | null>(null)

interface Props {
  modelValue: string
  placeholder?: string
  minHeight?: string
  rules?: Array<(val: any) => boolean | string>
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  minHeight: '300px',
  rules: () => [],
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const content = ref(props.modelValue)

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== content.value) {
    content.value = newVal
  }
})

// 监听内部值变化
watch(() => content.value, (newVal) => {
  emit('update:modelValue', newVal)
  emit('change', newVal)
})

// 触发文件选择
const triggerImageUpload = () => {
  fileInput.value?.click()
}

// 处理文件上传
const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  // 文件验证
  if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
    $q.notify({
      type: 'negative',
      message: '只支持 JPG、PNG、GIF、WEBP 格式的图片'
    })
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    $q.notify({
      type: 'negative',
      message: '图片大小不能超过2MB'
    })
    return
  }

  try {
    $q.loading.show({ message: '正在上传图片...' })

    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/common/uploadImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (response.data.code === 200) {
      const fullImageUrl = `${API_CONSTANTS.IMAGE_BASE_URL}${response.data.data.sourceUrl}`

      // 在光标位置插入图片
      insertImage(fullImageUrl)

      $q.notify({
        type: 'positive',
        message: '图片上传成功'
      })
    } else {
      throw new Error(response.data.msg || '上传失败')
    }
  } catch (error) {
    console.error('图片上传失败:', error)
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : '图片上传失败'
    })
  } finally {
    $q.loading.hide()
    // 清空文件输入框，允许重复上传相同文件
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

// 在编辑器内容中插入图片
const insertImage = (imageUrl: string) => {
  const imgHtml = `<img src="${imageUrl}" alt="" style="max-width:100%;" />`

  // 取当前内容
  let newContent = content.value || ''

  // 在末尾插入图片
  newContent += imgHtml

  // 更新内容
  content.value = newContent

  // 触发change事件
  emit('change', newContent)
}

// 修改工具栏配置
const toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline'],
  ['upload'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ]
    }
  ],
  ['quote', 'unordered', 'ordered'],
  ['undo', 'redo'],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    }
  ],
  [
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    }
  ],
  ['removeFormat']
]

// 修改字体配置
const fonts = {
  default_font: {
    label: $q.lang.editor.defaultFont,
    value: ''
  },
  arial: {
    label: 'Arial',
    value: 'Arial, sans-serif'
  },
  arial_black: {
    label: 'Arial Black',
    value: '"Arial Black", sans-serif'
  },
  comic_sans: {
    label: 'Comic Sans MS',
    value: '"Comic Sans MS", cursive'
  },
  courier_new: {
    label: 'Courier New',
    value: '"Courier New", monospace'
  },
  impact: {
    label: 'Impact',
    value: 'Impact, fantasy'
  },
  lucida_grande: {
    label: 'Lucida Grande',
    value: '"Lucida Grande", sans-serif'
  },
  times_new_roman: {
    label: 'Times New Roman',
    value: '"Times New Roman", serif'
  },
  verdana: {
    label: 'Verdana',
    value: 'Verdana, sans-serif'
  }
}

// 处理内容变化
const handleChange = (value: string) => {
  emit('change', value)
}
</script>

<style lang="scss">
.rich-editor {
  .q-editor {
    border-radius: 4px;

    .q-editor__toolbar {
      background-color: #f5f5f5;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      .q-btn {
        margin: 2px;
      }

      .q-btn-group {
        background: #fff;
        border-radius: 4px;
        margin: 2px;
      }
    }

    .q-editor__content {
      min-height: v-bind('props.minHeight');
      padding: 12px;
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
  }
}

// 响应式调整
@media (max-width: 599px) {
  .rich-editor {
    .q-editor__toolbar {
      flex-wrap: wrap;

      .q-btn-group {
        margin-bottom: 4px;
      }
    }
  }
}

// 添加图片相关样式
.rich-editor {
  .q-editor {
    img {
      max-width: 100%;
      height: auto;
      margin: 8px 0;
    }
  }

  // 自定义图片上传按钮样式
  .q-btn.upload-image-btn {
    margin: 2px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
