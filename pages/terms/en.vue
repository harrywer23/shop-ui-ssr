<template>
  <div class="terms-page q-pa-md">
    <div class="content-wrapper">
      <h1 class="text-h4 q-mb-lg">Terms of Service</h1>

      <!-- 快速导航 -->
      <div class="quick-nav q-mb-xl">
        <q-list bordered padding>
          <q-item
            v-for="(section, index) in sections"
            :key="index"
            clickable
            v-ripple
            @click="scrollToSection(section.id)"
          >
            <q-item-section avatar>
              <q-icon :name="section.icon" color="primary" />
            </q-item-section>
            <q-item-section>{{ section.title }}</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- 主要内容 -->
      <div class="terms-content">
        <div v-for="(section, index) in sections" :key="index" :id="section.id" class="section q-mb-xl">
          <div class="section-header">
            <q-icon :name="section.icon" color="primary" size="md" />
            <h2 class="text-h5 q-mb-md">{{ section.title }}</h2>
          </div>
          
          <div class="section-content">
            <div v-if="section.type === 'text'" v-html="section.content"></div>
            
            <div v-else-if="section.type === 'list'">
              <ul>
                <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="section.note" class="section-note q-mt-md">
              <q-icon name="info" size="sm" color="info" />
              <span>{{ section.note }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部确认区域 -->
      <div class="terms-footer q-mt-xl">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">Last Updated: {{ lastUpdated }}</div>
            <p class="text-body2">
              By using our services, you agree to these terms. Please read them carefully.
            </p>
            <div class="row justify-end q-mt-md">
              <q-btn
                color="primary"
                label="Print Terms"
                icon="print"
                @click="printTerms"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn
        v-show="showBackToTop"
        fab
        icon="keyboard_arrow_up"
        color="primary"
        @click="scrollToTop"
      />
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)
const lastUpdated = '2024-03-20'

const sections = [
  {
    id: 'general',
    icon: 'gavel',
    title: '1. General Terms',
    type: 'text',
    content: 'Welcome to Dimension Market. These Terms of Service constitute a legally binding agreement between you and Dimension Market. By using our services, you agree to these terms.'
  },
  {
    id: 'account',
    icon: 'person',
    title: '2. Account Management',
    type: 'list',
    items: [
      'You need an account to use certain services',
      'You must provide accurate and complete registration information',
      'You are responsible for maintaining account security',
      'Accounts cannot be transferred to others'
    ],
    note: 'Please keep your account information secure and up to date.'
  },
  {
    id: 'products',
    icon: 'shopping_bag',
    title: '3. Products and Services',
    type: 'list',
    items: [
      'All product information is for reference only',
      'We reserve the right to change product prices',
      'Images are for reference and may differ from actual products'
    ]
  },
  {
    id: 'privacy',
    icon: 'security',
    title: '4. Privacy Protection',
    type: 'text',
    content: 'We take your privacy seriously. Please refer to our Privacy Policy for details.',
    note: 'Your personal information is protected under our privacy policy.'
  },
  {
    id: 'other',
    icon: 'more_horiz',
    title: '5. Other Terms',
    type: 'text',
    content: 'We reserve the right to modify these terms at any time. Modified terms will be posted on the website.'
  }
]

// 滚动处理
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const printTerms = () => {
  window.print()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.terms-page {
  max-width: 800px;
  margin: 0 auto;
  
  .content-wrapper {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .section {
    scroll-margin-top: 20px;

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      h2 {
        margin: 0;
      }
    }

    .section-content {
      padding-left: 36px;
      line-height: 1.6;
    }

    .section-note {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 0.9em;
      background: #f0f7ff;
      padding: 8px;
      border-radius: 4px;
    }

    ul {
      padding-left: 20px;
      
      li {
        margin-bottom: 8px;
      }
    }
  }
}

/* 打印样式 */
@media print {
  .quick-nav,
  .terms-footer,
  .q-page-sticky {
    display: none !important;
  }

  .content-wrapper {
    box-shadow: none !important;
    padding: 0 !important;
  }
}

/* 响应式调整 */
@media (max-width: 599px) {
  .terms-page {
    .content-wrapper {
      padding: 20px;
    }

    .section {
      .section-content {
        padding-left: 16px;
      }
    }
  }
}
</style> 