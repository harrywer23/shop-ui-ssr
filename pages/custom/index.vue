<template>
    <div class="custom-page">
      <!-- 顶部横幅 -->
      <div class="banner-section">
        <div class="banner-content">
          <div class="banner-icon">
            <q-img src="/icons/产品海报.svg" width="64px" />
          </div>
          <h1 class="text-h2">{{ t('custom.title') }}</h1>
          <p class="text-h6 q-mt-md">
            {{ t('custom.subtitle') }}
          </p>
        </div>
      </div>

      <!-- 定制方式对比 -->
      <div class="section comparison-section">
        <div class="row q-col-gutter-xl">
          <!-- 个人定制 -->
          <div class="col-12 col-md-6">
            <q-card flat bordered class="comparison-card">
              <q-card-section>
                <div class="text-h5 text-primary">
                  <q-img src="/icons/会员用户.svg" width="32px" class="q-mr-sm" />
                  {{ t('custom.personal.title') }}
                </div>
                <div class="text-subtitle1 q-mt-sm">
                  {{ t('custom.personal.subtitle') }}
                </div>

                <!-- 价格指示 -->
                <div class="price-indicator q-mt-md">
                  <div class="text-h6">{{ t('custom.personal.startingPrice') }}</div>
                  <div class="text-caption">{{ t('custom.personal.deposit') }}</div>
                </div>

                <!-- 适用场景 -->
                <div class="section-block q-mt-lg">
                  <div class="block-title">
                    <q-icon name="target" color="primary" />
                    {{ t('custom.personal.scenarios.title') }}
                  </div>
                  <div class="block-content">
                    <ul>
                      <li>{{ t('custom.personal.scenarios.scenario1') }}</li>
                      <li>{{ t('custom.personal.scenarios.scenario2') }}</li>
                      <li>{{ t('custom.personal.scenarios.scenario3') }}</li>
                      <li>{{ t('custom.personal.scenarios.scenario4') }}</li>
                    </ul>
                  </div>
                </div>

                <!-- 服务流程 -->
                <div class="section-block">
                  <div class="block-title">
                    <q-icon name="timeline" color="primary" />
                    服务流程
                  </div>
                  <q-timeline color="primary">
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step1.title')"
                      :subtitle="t('custom.personal.steps.step1.time')"
                    >
                      {{ t('custom.personal.steps.step1.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step2.title')"
                      :subtitle="t('custom.personal.steps.step2.time')"
                    >
                      {{ t('custom.personal.steps.step2.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step3.title')"
                      :subtitle="t('custom.personal.steps.step3.time')"
                    >
                      {{ t('custom.personal.steps.step3.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step4.title')"
                      :subtitle="t('custom.personal.steps.step4.time')"
                    >
                      {{ t('custom.personal.steps.step4.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step5.title')"
                      :subtitle="t('custom.personal.steps.step5.time')"
                    >
                      {{ t('custom.personal.steps.step5.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.personal.steps.step6.title')"
                      :subtitle="t('custom.personal.steps.step6.time')"
                    >
                      {{ t('custom.personal.steps.step6.content') }}
                    </q-timeline-entry>
                  </q-timeline>
                </div>

                <!-- 服务特权 -->
                <div class="section-block">
                  <div class="block-title">
                    <q-icon name="stars" color="primary" />
                    专属特权
                  </div>
                  <div class="block-content">
                    <div class="privilege-item">
                      <q-icon name="design_services" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.personal.privileges.privilege1.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.personal.privileges.privilege1.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon name="verified" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.personal.privileges.privilege2.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.personal.privileges.privilege2.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon name="speed" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.personal.privileges.privilege3.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.personal.privileges.privilege3.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon name="support_agent" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.personal.privileges.privilege4.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.personal.privileges.privilege4.description') }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <q-btn
                  color="primary"
                  class="full-width q-mt-lg"
                  label="申请个人定制"
                  icon="edit"
                  @click="router.push('/custom/apply?type=1')"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- 众筹定制 -->
          <div class="col-12 col-md-6">
            <q-card flat bordered class="comparison-card">
              <q-card-section>
                <div class="text-h5 text-primary">
                  <q-img src="/icons/分类or广场or其他.svg" width="32px" class="q-mr-sm" />
                  {{ t('custom.crowdfunding.title') }}
                </div>
                <div class="text-subtitle1 q-mt-sm">
                  {{ t('custom.crowdfunding.subtitle') }}
                </div>

                <!-- 价格指示 -->
                <div class="price-indicator q-mt-md">
                  <div class="text-h6">{{ t('custom.crowdfunding.estimatedPrice') }}</div>
                  <div class="text-caption">{{ t('custom.crowdfunding.minQuantity') }}</div>
                </div>

                <!-- 适用场景 -->
                <div class="section-block q-mt-lg">
                  <div class="block-title">
                    <q-icon name="target" color="primary" />
                    {{ t('custom.crowdfunding.scenarios.title') }}
                  </div>
                  <div class="block-content">
                    <ul>
                      <li>{{ t('custom.crowdfunding.scenarios.scenario1') }}</li>
                      <li>{{ t('custom.crowdfunding.scenarios.scenario2') }}</li>
                      <li>{{ t('custom.crowdfunding.scenarios.scenario3') }}</li>
                      <li>{{ t('custom.crowdfunding.scenarios.scenario4') }}</li>
                    </ul>
                  </div>
                </div>

                <!-- 众筹流程 -->
                <div class="section-block">
                  <div class="block-title">
                    <q-icon name="timeline" color="primary" />
                    {{ t('custom.crowdfunding.steps.title') }}
                  </div>
                  <q-timeline color="primary">
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step1.title')"
                      :subtitle="t('custom.crowdfunding.steps.step1.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step1.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step2.title')"
                      :subtitle="t('custom.crowdfunding.steps.step2.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step2.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step3.title')"
                      :subtitle="t('custom.crowdfunding.steps.step3.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step3.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step4.title')"
                      :subtitle="t('custom.crowdfunding.steps.step4.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step4.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step5.title')"
                      :subtitle="t('custom.crowdfunding.steps.step5.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step5.content') }}
                    </q-timeline-entry>
                    <q-timeline-entry
                      :title="t('custom.crowdfunding.steps.step6.title')"
                      :subtitle="t('custom.crowdfunding.steps.step6.time')"
                    >
                      {{ t('custom.crowdfunding.steps.step6.content') }}
                    </q-timeline-entry>
                  </q-timeline>
                </div>

                <!-- 支持者权益 -->
                <div class="section-block">
                  <div class="block-title">
                    <q-icon name="card_membership" color="primary" />
                    {{ t('custom.crowdfunding.privileges.title') }}
                  </div>
                  <div class="block-content">
                    <div class="privilege-item">
                      <q-icon :name="getCrowdfundingPrivilegeIcon(0)" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.crowdfunding.privileges.item1.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.crowdfunding.privileges.item1.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon :name="getCrowdfundingPrivilegeIcon(1)" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.crowdfunding.privileges.item2.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.crowdfunding.privileges.item2.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon :name="getCrowdfundingPrivilegeIcon(2)" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.crowdfunding.privileges.item3.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.crowdfunding.privileges.item3.description') }}</div>
                      </div>
                    </div>
                    <div class="privilege-item">
                      <q-icon :name="getCrowdfundingPrivilegeIcon(3)" color="positive" />
                      <div class="privilege-content">
                        <div class="privilege-title">{{ t('custom.crowdfunding.privileges.item4.title') }}</div>
                        <div class="privilege-desc">{{ t('custom.crowdfunding.privileges.item4.description') }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <q-btn
                  color="primary"
                  class="full-width q-mt-lg"
                  :label="t('custom.crowdfunding.applyButton')"
                  icon="groups"
                  @click="router.push('/custom/apply?type=2')"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 成功案例 -->
      <div class="section cases-section bg-grey-1">
        <h2 class="text-h4 text-center">成功案例</h2>
        <div class="row q-col-gutter-lg q-mt-lg">
          <div v-for="(item, index) in successCases" :key="index" class="col-12 col-sm-6 col-md-4">
            <q-card class="case-card">
              <q-img :src="getImageUrl(item.image)" :ratio="1">
                <div class="absolute-bottom text-subtitle2 text-center bg-transparent">
                  {{ item.title }}
                </div>
              </q-img>
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-subtitle1">{{ item.name }}</div>
                    <div class="text-caption text-grey">{{ item.type }}</div>
                  </div>
                  <q-chip
                    :color="item.customType === 'personal' ? 'primary' : 'purple'"
                    text-color="white"
                    size="sm"
                  >
                    {{ item.customType === 'personal' ? '个人定制' : '众筹定制' }}
                  </q-chip>
                </div>
                <div class="text-caption q-mt-sm">{{ item.description }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 常见问题 -->
      <div class="section faq-section">
        <h2 class="text-h4 text-center">常见问题</h2>
        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-list class="q-mt-lg">
              <q-expansion-item
                v-for="(faq, index) in faqs"
                :key="index"
                :label="faq.question"
                header-class="text-primary"
                expand-separator
              >
                <q-card>
                  <q-card-section>
                    {{ faq.answer }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>

      <!-- 我的定制申请 -->
      <div class="section my-customs-section">
        <div class="row items-center justify-between q-mb-md">
          <h2 class="text-h4 q-my-none">{{ t('custom.list.title') }}</h2>
          <q-btn
            color="primary"
            :label="t('common.viewMore')"
            icon-right="arrow_forward"
            to="/custom/list"
            flat
          />
        </div>

        <div v-if="loading" class="text-center q-pa-lg">
          <q-spinner color="primary" size="3em" />
          <div class="text-grey q-mt-sm">{{ t('common.loading') }}</div>
        </div>

        <div v-else-if="recentCustoms.length === 0" class="text-center q-pa-xl">
          <q-icon name="inbox" size="4em" color="grey-5" />
          <div class="text-grey q-mt-sm">{{ t('custom.list.empty') }}</div>
        </div>

        <div v-else class="row q-col-gutter-md">
          <div v-for="item in recentCustoms" :key="item.id" class="col-12 col-sm-6 col-md-4">
            <q-card class="custom-preview-card">
              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h6">{{ item.title }}</div>
                    <div class="text-caption text-grey">
                      {{ t('custom.list.orderNumber') }}: {{ item.orderNumber }}
                    </div>
                  </div>
                  <q-chip
                    :color="getStatusColor(item.status)"
                    text-color="white"
                    size="sm"
                  >
                    {{ t(`custom.status.${item.status}`) }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="text-body2">
                  <div class="row q-gutter-sm">
                    <div class="col-12">
                      <q-icon name="event" size="xs" class="q-mr-xs" />
                      {{ formatDate(item.createTime) }}
                    </div>
                    <div class="col-12">
                      <q-icon name="category" size="xs" class="q-mr-xs" />
                      {{ t(`custom.type.${item.type}`) }}
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  color="primary"
                  :label="t('common.viewDetails')"
                  :to="`/custom/detail/${item.id}`"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { date } from 'quasar'
  import { api } from '~/utils/axios'
  import { API_CONSTANTS } from "~/utils/constants"

  const router = useRouter()
  const { t } = useI18n()
  const loading = ref(false)
  const recentCustoms = ref([])

  // 成功案例
  const successCases = [
    {
      image: '/custom/case1.jpg',
      title: '原神-刻晴手办',
      name: '个人定制版',
      type: '手办模型',
      customType: 'personal',
      description: '完美还原游戏中的细节，独特pose设计'
    },
    {
      image: '/custom/case2.jpg',
      title: '鬼灭之刃系列',
      name: '众筹限定版',
      type: '手办套装',
      customType: 'crowdfunding',
      description: '限量500套编号版本，众筹价格优惠'
    },
    {
      image: '/custom/case3.jpg',
      title: '海贼王-路飞',
      name: '个人定制版',
      type: '场景手办',
      customType: 'personal',
      description: '特殊场景还原，独家收藏版'
    }
  ]

  // 常见问题
  const faqs = [
    {
      question: '个人定制和众筹定制的主要区别是什么？',
      answer: '个人定制提供一对一专属服务，完全按照个人需求定制，价格较高但独特性强；众筹定制通过集体购买降低成本，价格更亲民，但需要达到最低众筹数量。'
    },
    {
      question: '制作周期大概要多久？',
      answer: '个人定制一般需要30-40天，众筹定制因为涉及众筹周期和批量生产通常需要90-100天。具体时间会在预方案中说明。'
    },
    {
      question: '定金比例是多少？',
      answer: '个人定制一需要支付30%-50%的定金，具体比例根据定制难度和材质决定；众筹定制需要支付全款，但众筹失败会全额退款。'
    },
    {
      question: '是否可以修改定制方案？',
      answer: '个人定制在确认方案前可多次沟通修改；众筹定制涉及多人，一旦方案确定后较难大幅修改，但可以在众筹前提出建议。'
    }
  ]

  // 获取特权图标
  const getPrivilegeIcon = (index: number) => {
    const icons = ['design_services', 'verified', 'speed', 'support_agent']
    return icons[index]
  }

  // 获取众筹特权图标
  const getCrowdfundingPrivilegeIcon = (index: number) => {
    const icons = ['savings', 'numbers', 'card_giftcard', 'forum']
    return icons[index]
  }

  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'orange',
      approved: 'positive',
      rejected: 'negative',
      inProgress: 'info',
      completed: 'positive',
      cancelled: 'grey'
    }
    return colors[status] || 'grey'
  }

  // 格式日期
  const formatDate = (dateString: string) => {
    return date.formatDate(dateString, 'YYYY-MM-DD')
  }

  // 获取最近的定制申请
  const fetchRecentCustoms = async () => {
    loading.value = true
    try {
      // TODO: 实现实际的API调用
      // const response = await api.getRecentCustoms()
      // recentCustoms.value = response.data

      // 临时使用模拟数据
      recentCustoms.value = [
        {
          id: 1,
          title: '神-刻晴手办定制',
          orderNumber: 'CD202401010001',
          status: 'pending',
          createTime: '2024-01-01',
          type: 'figure'
        },
        {
          id: 2,
          title: '鬼灭之刃-炭治郎装定制',
          orderNumber: 'CD202401010002',
          status: 'inProgress',
          createTime: '2024-01-02',
          type: 'clothing'
        },
        {
          id: 3,
          title: '海贼王-路飞草帽定制',
          orderNumber: 'CD202401010003',
          status: 'completed',
          createTime: '2024-01-03',
          type: 'accessory'
        }
      ]
    } catch (error) {
      console.error('Failed to fetch recent customs:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRecentCustoms()
  })

  // 获取图片URL
  const getImageUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${API_CONSTANTS.BASE_URL}${url}`
  }

  // 个人定制特权
  const personalPrivileges = [
    {
      title: '专属设计',
      description: '一对一沟通，完全按照您的想法设计'
    },
    {
      title: '版权保护',
      description: '独家版权，确保作品独一无二'
    },
    {
      title: '优先制作',
      description: '优先排期，更快的制作周期'
    },
    {
      title: '专人服务',
      description: '专属客服全程跟进服务'
    }
  ]

  // 众筹特权
  const crowdfundingPrivileges = [
    {
      title: '优惠价格',
      description: '批量生产，享受更优惠的价格'
    },
    {
      title: '编号版本',
      description: '限量编号，专属收藏价值'
    },
    {
      title: '支持者福利',
      description: '专属周边、抽选特典等福利'
    },
    {
      title: '粉丝社群',
      description: '加入支持者社群，分享快乐'
    }
  ]
  </script>

  <style lang="scss" scoped>
  .custom-page {
    .banner-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 20px;
      text-align: center;

      .banner-content {
        max-width: 800px;
        margin: 0 auto;
      }
    }

    .section {
      padding: 80px 20px;
      max-width: 1200px;
      margin: 0 auto;

      &.bg-grey-1 {
        background: #f5f7fa;
      }
    }

    .comparison-card {
      height: 100%;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .section-block {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #eee;

        .block-title {
          font-size: 1.1em;
          font-weight: 500;
          color: var(--q-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .block-content {
          ul {
            margin: 0;
            padding-left: 20px;

            li {
              margin-bottom: 8px;
              color: #666;
            }
          }
        }
      }

      .privilege-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 16px;

        .privilege-content {
          flex: 1;

          .privilege-title {
            font-weight: 500;
            margin-bottom: 4px;
          }

          .privilege-desc {
            font-size: 0.9em;
            color: #666;
          }
        }
      }
    }

    .case-card {
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .faq-section {
      .q-expansion-item {
        margin-bottom: 8px;
      }
    }

    .my-customs-section {
      background: #f5f7fa;

      .custom-preview-card {
        height: 100%;
        transition: transform 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  // 响应式调
  @media (max-width: 599px) {
    .custom-page {
      .banner-section {
        padding: 40px 20px;

        .text-h2 {
          font-size: 2em;
        }
      }

      .section {
        padding: 40px 20px;
      }
    }
  }
  </style>
