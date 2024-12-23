<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
import { api } from '~/utils/axios'
import CachedImage from "~/components/common/CachedImage.vue"

const { t } = useI18n()
const router = useRouter()
const inviteCode = useCookie('invite')

// 表单数据
const formData = ref({
  name: '',
  email: '',
  password: '',
  uuid: '',
})
const accept = ref(false)
const showPassword = ref(false)
const submitting = ref(false)

// 验证规则
const usernameRules = [
  (val: string) => !!val || t('validation.nameRequired'),
  (val: string) => /^[a-zA-Z0-9]+$/.test(val) || t('validation.nameFormat'),
  (val: string) => val.length >= 5 && val.length <= 20 || t('validation.nameLength')
]

const passwordRules = [
  (val: string) => !!val || t('validation.passwordRequired'),
  (val: string) => val.length >= 5 && val.length <= 20 || t('validation.passwordLength')
]

const emailRules = [
  (val: string) => !!val || t('validation.emailRequired'),
  (val: string) => val.length >= 5 && val.length <= 30 || t('validation.emailLength'),
  (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || t('validation.emailFormat')
]

// 重置表单
function onReset() {
  formData.value = {
    name: '',
    email: '',
    password: '',
    uuid: ''
  }
  accept.value = false
}

// 提交注册
async function onSubmit() {
  if (!accept.value) {
    Notify.create({
      color: 'negative',
      textColor: 'white',
      icon: 'warning',
      message: t('validation.acceptTerms')
    })
    return
  }

  try {
    submitting.value = true
    const registerData = {
      ...formData.value,
      inviteCode: inviteCode.value
    }

    const { data } = await api.post('/register', registerData)

    if (data.code === 200) {
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: t('login.registerSuccess')
      })

      // 延迟跳转
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      throw new Error(data.msg || t('login.registerFailed'))
    }
  } catch (error: any) {
    console.error('注册失败:', error)
    Notify.create({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: error.message || t('common.error')
    })
  } finally {
    submitting.value = false
  }
}

// 切换密码显示
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="register-container">
    <div class="register-content">
      <!-- Logo区域 -->
      <div class="logo-section text-center q-mb-xl">
        <q-img
          src="/favicon.ico"
          alt="Logo"
          class="logo-image"
          :ratio="1"
        />
        <h1 class="text-h4 q-mt-md text-weight-bold text-primary">{{ t('login.regis') }}</h1>
        <p class="text-subtitle1 text-grey-7">{{ t('login.welcome') }}</p>
      </div>

      <!-- 注册表单卡片 -->
      <q-card class="register-card q-pa-lg">
        <q-form
          class="q-gutter-md"
          @reset="onReset"
          @submit.prevent="onSubmit"
        >
          <!-- 用户名输入 -->
          <q-input
            v-model="formData.name"
            :label="t('login.name')"
            :rules="usernameRules"
            outlined
            class="input-field"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <!-- 邮箱输入 -->
          <q-input
            v-model="formData.email"
            :label="t('login.email')"
            :rules="emailRules"
            outlined
            class="input-field"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <!-- 密码输入 -->
          <q-input
            v-model="formData.password"
            :label="t('login.password')"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            outlined
            class="input-field"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>

          <!-- 条款同意 -->
          <div class="terms-section q-mt-md">
            <q-checkbox
              v-model="accept"
              :label="t('introTerms')"
              color="primary"
            />
            <div class="terms-links q-mt-sm">
              <a href="/privacy" class="text-primary">{{ t('useTerms') }}</a>
              <span class="text-grey-6">|</span>
              <a href="/terms" class="text-primary">{{ t('privateTerms') }}</a>
            </div>
          </div>

          <!-- 按钮区域 -->
          <div class="actions-section q-mt-lg">
            <q-btn
              :label="t('login.regis')"
              color="primary"
              class="full-width"
              size="large"
              type="submit"
              :loading="submitting"
            />

            <div class="text-center q-mt-md">
              <span class="text-grey-7">{{ t('login.hasAccount') }}</span>
              <router-link to="/login" class="login-link q-ml-sm">
                {{ t('login.login') }}
              </router-link>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.register-content {
  width: 100%;
  max-width: 480px;
}

.logo-section {
  margin-bottom: 2rem;
}

.logo-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.input-field {
  margin-bottom: 1rem;
}

.terms-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terms-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.terms-links a {
  text-decoration: none;
  transition: color 0.3s;
}

.terms-links a:hover {
  color: var(--q-primary);
  text-decoration: underline;
}

.actions-section {
  margin-top: 2rem;
}

.login-link {
  color: var(--q-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.login-link:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 599px) {
  .register-container {
    padding: 16px;
    background: white;
  }

  .register-card {
    box-shadow: none;
    background: white;
    backdrop-filter: none;
  }

  .logo-section {
    margin-bottom: 1.5rem;
  }
}
</style>
