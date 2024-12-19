import { useNuxtApp } from '#app'

export function tansParams(params: { [x: string]: any; }) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        const params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

export function getImageUrl(imgUrl: string | null | undefined): string {
    if (imgUrl && typeof imgUrl === 'string' && (imgUrl.startsWith('/image') ||imgUrl.startsWith('/user') ||imgUrl.startsWith('/video')  )) {
        return `${API_CONSTANTS.IMAGE_BASE_URL}${imgUrl}`;
    }
    return '/empty.webp';
}

// 获取当前语言的分类名称
export const getCurrentLanguageName = (translations: any, defaultName: string) => {
  if (!translations) return defaultName

  try {
    const translationsObj = typeof translations === 'string'
      ? JSON.parse(translations)
      : translations

    if (!translationsObj) return defaultName

    // 从 nuxt app 中获取当前语言
    const nuxtApp = useNuxtApp()
    const locale = nuxtApp.$i18n.locale.value

    // 根据当前语言返回对应的翻译
    switch (locale) {
      case 'en':
        return translationsObj.en || defaultName
      case 'zh-TW':
        return translationsObj.zhTw || defaultName
      case 'ja':
        return translationsObj.ja || defaultName
      case 'ko':
        return translationsObj.ko || defaultName
      default:
        return defaultName
    }
  } catch (e) {
    console.error('Parse translations failed:', e)
    return defaultName
  }
}

export const getLanguageName = (translations: Translations, name: string, lang: string) => {
    // 如果没有translations，返回原始名称
    if (!translations) return name;

    // 确保 translations 是一个对象
    let parsedTranslations = translations;
    if (typeof translations === 'string') {
        try {
            parsedTranslations = JSON.parse(translations);
        } catch (error) {
            console.error("Failed to parse translations:", error);
            return name;  // 如果 JSON 解析失败，返回原始名称
        }
    }

    // 根据当前语言返回对应的翻译
    switch (lang) {
        case 'en':
            return parsedTranslations.en || name;
        case 'zh-TW':
            return parsedTranslations.zhTw || name;
        case 'ja':
            return parsedTranslations.ja || name;
        case 'ko':
            return parsedTranslations.ko || name;
        default:
            return name;
    }
}
// 格式化日期时间
export function formatDateTime(datetime: string) {
    if (!datetime) return ''
    return new Date(datetime).toLocaleString()
}
