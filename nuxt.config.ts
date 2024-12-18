// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
  devtools: { enabled: true },

  dir: {
    static: 'static', // 新的静态文件夹名称
  },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/i18n', '@vite-pwa/nuxt', 'nuxt-quasar-ui', '@nuxtjs/seo', '@pinia/nuxt'],

  pwa: {
    manifest: {
      name: '次元集市',
      description: 'asts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world\'s most beloved anime series, video games, classic and best-selling novels',
      lang: 'zh-CN',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      categories: ['photography', 'art', 'social'],
      screenshots: [
        {
          src: '/favicon.ico',
          sizes: '1280x720',
          type: 'image/jpeg',
          label: '首页展示'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://image.51x.uk/.*\\.(?:png|jpg|jpeg|svg|gif)', // 替换为你的图片路径
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 1000, // 你希望缓存的图片数量
              maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存时间，例如 30 天
            }
          }
        }
      ]
    }
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      // 定义地区对象，包括 code, file 和 name
      { code: 'en', name: 'English' },
      { code: 'zh-CN',  name: '简体中文' },
      { code: 'zh-TW', name: '繁體中文' },
      { code: 'ja', name: '日本語' },
      { code: 'ko', name: '한국어' }
    ],
    defaultLocale: 'zh-CN',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'user-language',
      fallbackLocale: 'zh-CN',
      redirectOn: 'root'  // 只在根路径进行重定向
    },
    vueI18n: './i18n.config.ts'
  },

  site: {
    url: 'https://www.cmall.uk',
    name: '次元集市',
    description: '动漫迷、游戏玩家、影视爱好者以及小说粉丝的终极购物目的地',
    defaultLocale: 'zh-CN'
  },

  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      // baseUrl:  process.env.BASE_URL || 'https://admin.aiavr.uk'
      baseUrl:"https://admin.aiavr.uk"
      // baseUrl:"http://127.0.0.1:8098"
    }
  },

  quasar: {
    plugins: ['Notify', 'Dialog','Cookies','Loading'], // 确保插件列表是一个字符串数组
    config: {
      brand: {
        primary: '#FF69B4',
        secondary: '#9370DB',
        accent: '#87CEEB',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    },
    extras: {
      animations: 'all'
    }
  },

  meta: {
    title: '次元集市-动漫迷、游戏玩家、影视爱好者以及小说粉丝的终极购物目的地',
    meta: [
          { name: 'content-language', content: 'zh-CH' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { hid: 'keywords', name: 'keywords', content: "这里是所有动漫迷、游戏玩家、影视爱好者以及小说粉丝的终极购物目的地！我们提供来自世界各地最受欢迎的动漫系列、电子游戏、经典电影和畅销小说的官方授权手办和周边产品。The Ultimate Shopping Destination for All Anime Fans, Gamers, Movie Enthusiasts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world's most beloved anime series, video games, classic and best-selling novels." },
      { hid: 'description', name: 'keywords', content: "这里是所有动漫迷、游戏玩家、影视爱好者以及小说粉丝的终极购物目的地！我们提供来自世界各地最受欢迎的动漫系列、电子游戏、经典电影和畅销小说的官方授权手办和周边产品。The Ultimate Shopping Destination for All Anime Fans, Gamers, Movie Enthusiasts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world's most beloved anime series, video games, classic and best-selling novels."},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' } // 指向你的 favicon
    ],
  },

  sitemap: {
    sitemaps: {
      // 主站点地图
      main: {
        // 静态路由
        urls: [
          { loc: '/', priority: 1.0 },
          { loc: '/product/sort?category=1', priority: 0.8 },
          { loc: '/product/list?parentId=1', priority: 0.8 },
          { loc: '/product/list?parentId=2', priority: 0.8 },
          { loc: '/product/list?parentId=3', priority: 0.8 },
          { loc: '/product/list?parentId=4', priority: 0.8 },
          { loc: '/product/list?parentId=5', priority: 0.8 },
          { loc: '/about', priority: 0.5 },
          { loc: '/contact', priority: 0.5 },
          { loc: '/help', priority: 0.5 }
        ]
      },
      // 动态页面站点地图
      posts: {
        // 从 API 端点获取动态 URL
        sources: [
          '/api/__sitemap__/urls'
        ]
      }
    },
    // 全局配置
    defaultSitemapsChunkSize: 1000,
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'daily',
      priority: 0.5,
      lastmod: new Date().toISOString()
    }
  },

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate', // 自动更新 PWA
        manifest: {
          name: 'Dimension Bazaar',
          theme_color: '#ffffff',
        },
        workbox: {
          runtimeCaching: [
            {
              // 正则表达式匹配所有图片格式
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: 'CacheFirst', // 优先从缓存加载，如果没有再从网络加载
              options: {
                cacheName: 'image-cache', // 缓存名称
                expiration: {
                  maxEntries: 2000, // 最大缓存条目数
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存 30 天
                },
                cacheableResponse: {
                  statuses: [0, 200], // 仅缓存成功请求
                },
              },
            },
          ],
        },
      }),
    ],
  },
  app: {
    head: {
      title: 'Dimension Bazaar',
      titleTemplate: '%s - 次元集市',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'content-language', content: 'zh-CH' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: '次元集市' },
        {
          hid: 'description',
          name: 'description',
          content: 'Dimension Bazaar - Your Gateway to Digital Art and Collections'
        },
        {
          name: 'keywords',
          content: "asts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world\'s most beloved anime series, video games, classic and best-selling novels"
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:siteName', content: '次元集市' },
        { property: 'og:title', content: '次元集市-The Ultimate Shopping Destination for All Anime Fans, Gamers, Movie Enthusiasts, and Novel Readers!' },
        { property: 'og:description', content: 'asts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world\'s most beloved anime series, video games, classic and best-selling novels。' },
        { property: 'og:image', content: '/og-image.jpg' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '次元集市-The Ultimate Shopping Destination for All Anime Fans, Gamers, Movie Enthusiasts, and Novel Readers!' },
        { name: 'twitter:description', content: 'asts, and Novel Readers!\nWe offer officially licensed figurines and merchandise from the world\'s most beloved anime series, video games, classic and best-selling novels。' },
        { name: 'twitter:image', content: '/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.cmall.uk' },
        { rel: 'alternate', hreflang: 'zh-CN', href: 'https://www.cmall.uk/zh-CN' },
        { rel: 'alternate', hreflang: 'zh-TW', href: 'https://www.cmall.uk/zh-TW' },
        { rel: 'alternate', hreflang: 'ja', href: 'https://www.cmall.uk/ja' },
        { rel: 'alternate', hreflang: 'ko', href: 'https://www.cmall.uk/ko' },
        { rel: 'alternate', hreflang: 'en', href: 'https://www.cmall.uk/en' }
      ]
    }
  },
  nitro: {
    hooks: {
      'render:html': (html: { head: string[] }) => {
        html.head.push(`
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "次元集市",
              "url": "https://www.cmall.uk",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.aiavr.uk/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          </script>
        `)
      }
    }
  },
  compatibilityDate: '2024-11-07'
})
