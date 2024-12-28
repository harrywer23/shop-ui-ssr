<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {  Notify } from 'quasar'
import { useI18n } from 'vue-i18n'
import { api } from '~/utils/axios'
import { API_CONSTANTS } from '~/utils/constants'

const { t } = useI18n()
const router = useRouter()

// 表单数据
const formData = ref({
  username: '',
  password: '',
  uuid: '',
  captcha: ''
})
const accept = ref(false)
const showPassword = ref(false)
const submitting = ref(false)

// 验证规则
const usernameRules = [
  (val: string) => !!val || t('validation.nameRequired'),
  (val: string) => val.length >= 5 && val.length <= 20 || t('validation.nameLength')
]

const passwordRules = [
  (val: string) => !!val || t('validation.passwordRequired'),
  (val: string) => val.length >= 5 && val.length <= 20 || t('validation.passwordLength')
]

// 登录处理
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
    const response = await api.post('/login', {
      username: formData.value.username,
      password: formData.value.password,
      uuid: formData.value.uuid,
      code: formData.value.captcha,
      captcha: formData.value.captcha
    })

    const { code,data } =await response.data;

    if (code === 200) {
      // 设置 cookies
      const token = useCookie('token', {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      const accessToken = useCookie('accessToken', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const refreshToken = useCookie('refreshToken', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const userId = useCookie('id', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const verify = useCookie('verify', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const userName = useCookie('userName', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const avatar = useCookie('avatar', { maxAge: 60 * 60 * 24 * 7, path: '/' })
      const nickName = useCookie('nickName', { maxAge: 60 * 60 * 24 * 7, path: '/' })

      token.value = data.token;
      accessToken.value = data.accessToken;
      refreshToken.value = data.refreshToken;
      userId.value = data.userId;
      verify.value = data.verify;;
      userName.value = data.userName;
      avatar.value = data.avatar;
      nickName.value = data.nickName;
      Notify.create({
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: t('login.loginSuccess')
      })

      setTimeout(() => {
        router.push('/user')
      }, 500)
    } else {
      throw new Error(data.msg || t('login.loginFailed'))
    }
  } catch (error: any) {
    console.error('登录失败:', error)
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

// 验证码配置
function initCaptcha() {
  if (!accept.value) {
    Notify.create({
      color: 'negative',
      textColor: 'white',
      icon: 'warning',
      message: t('validation.acceptTerms')
    })
    return
  }

  const captchaConfig = {
    requestCaptchaDataUrl: `${API_CONSTANTS.BASE_URL}/gen`,
    validCaptchaUrl: `${API_CONSTANTS.BASE_URL}/check`,
    bindEl: '#captcha-box',
    validSuccess: (res: any, c: any, t: any) => {
      t.destroyWindow()
      formData.value.uuid = res.data.id
      onSubmit()
    }
  }

  const style = {
    btnUrl: 'btn3.png',
    bgUrl: 'btn3-bg.jpg',
    logoUrl: 'favicon.ico',
    moveTrackMaskBgColor: '#f7b645',
    moveTrackMaskBorderColor: '#ef9c0d'
  }

  if (process.client) {
    window.initTAC('tac', captchaConfig, style).then(tac => {
      tac.init()
    })
  }
}

// 切换密码显示
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  if (process.client) {
    import('~/utils/load.min')
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <!-- Logo区域 -->
      <div class="logo-section text-center q-mb-xl">
        <q-img
          src="/favicon.ico"
          alt="Logo"
          class="logo-image"
          :ratio="1"
        />
        <h1 class="text-h4 q-mt-md text-weight-bold text-primary">{{ t('login.login') }}</h1>
        <p class="text-subtitle1 text-grey-7">{{ t('login.welcome') }}</p>
      </div>

      <!-- 登录表单卡片 -->
      <q-card class="login-card q-pa-lg">
        <q-form class="q-gutter-md">
          <!-- 用户名输入 -->
          <q-input
            v-model="formData.username"
            :label="t('login.name')"
            :rules="usernameRules"
            outlined
            class="input-field"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
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

          <!-- 验证码区域 -->
          <div id="captcha-box" class="q-mt-md"></div>

          <!-- 按钮区域 -->
          <div class="actions-section q-mt-lg">
            <q-btn
              :label="t('login.login')"
              color="primary"
              class="full-width"
              size="large"
              :loading="submitting"
              @click="initCaptcha"
            />

            <div class="text-center q-mt-md">
              <span class="text-grey-7">{{ t('login.noAccount') }}</span>
              <router-link to="/register" class="register-link q-ml-sm">
                {{ t('login.regis') }}
              </router-link>
            </div>

            <div class="text-center q-mt-sm">
              <router-link to="/forgotPassword" class="forgot-password-link">
                {{ t('login.forgotPassword') }}
              </router-link>
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.login-content {
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

.login-card {
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

.register-link,
.forgot-password-link {
  color: var(--q-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link:hover,
.forgot-password-link:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 599px) {
  .login-container {
    padding: 16px;
    background: white;
  }

  .login-card {
    box-shadow: none;
    background: white;
    backdrop-filter: none;
  }

  .logo-section {
    margin-bottom: 1.5rem;
  }
}
</style>
