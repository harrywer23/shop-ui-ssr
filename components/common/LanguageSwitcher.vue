<template>
  <q-btn-dropdown
    flat
    :label="currentLocale.name"
  >
    <q-list>
      <q-item
        v-for="locale in availableLocales"
        :key="locale.code"
        clickable
        v-close-popup
        @click="switchLanguage(locale.code)"
      >
        <q-item-section>
          <q-item-label>{{ locale.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale, locales } = useI18n()

const availableLocales = computed(() => {
  return locales.value.map((l: any) => ({
    code: l.code,
    name: l.name
  }))
})

const currentLocale = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
})

const switchLanguage = (code: string) => {
  locale.value = code
  // 可选：保存用户语言偏好
  localStorage.setItem('user-language', code)
}
</script> 