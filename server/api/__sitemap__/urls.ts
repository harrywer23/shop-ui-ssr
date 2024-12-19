import { defineSitemapEventHandler, useRuntimeConfig } from '#imports'
import { createError, getRequestURL } from 'h3'
import type { SitemapUrl } from '#sitemap/types'
import { serverApi } from '~/utils/server-api'
import type { Product, Category } from '~/types/sitemap'

export default defineSitemapEventHandler(async (event) => {
  try {
    // 获取当前请求的URL信息
    const requestURL = getRequestURL(event)
    const baseURL = `${requestURL.protocol}//${requestURL.host}`
    
    const urls: SitemapUrl[] = []

    // 获取所有商品
    const prodResponse = await serverApi.get('/urls')

    if (prodResponse.data.code === 200) {
      const products: Product[] = prodResponse.data.data || []

      products.forEach(product => {
        urls.push({
          loc: `${product}`,
          lastmod: product.updateTime || new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.8,
          _sitemap: 'posts'
        })
      })
    }

    // 获取所有分类
    const categoryResponse = await serverApi.get('/category/list')
    if (categoryResponse.data.code === 200) {
      const categories: Category[] = categoryResponse.data.data || []

      categories.forEach(category => {
        if (category.status === 1) {
          urls.push({
            loc: `/product/sort?categoryId=${category.categoryId}`,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
            _sitemap: 'posts'
          })
        }
      })
    }

    // 添加静态页面
    const staticPages = [
      { path: '/', priority: 1.0 },
      { path: '/about', priority: 0.6 },
      { path: '/contact', priority: 0.6 },
      { path: '/help', priority: 0.6 },
      { path: '/terms', priority: 0.5 },
      { path: '/privacy', priority: 0.5 }
    ]

    staticPages.forEach(page => {
      urls.push({
        loc: page.path,
        changefreq: 'weekly',
        priority: page.priority,
        lastmod: new Date().toISOString(),
        _sitemap: 'general'
      })
    })

    // 为所有URL添加完整的域名
    const fullUrls = urls.map(url => ({
      ...url,
      loc: url.loc.startsWith('http') ? url.loc : `${baseURL}${url.loc}`
    }))

    console.log(`Generated ${fullUrls.length} URLs for sitemap`)
    return fullUrls

  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate sitemap',
      data: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
