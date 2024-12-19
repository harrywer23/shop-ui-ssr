import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // 只在客户端添加持久化插件
  if (process.client) {
    nuxtApp.$pinia.use(piniaPluginPersistedstate)
  }
}) 