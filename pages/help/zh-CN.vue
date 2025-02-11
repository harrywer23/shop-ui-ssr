<template>
  <div class="help-page">
    <div class="page-container">
      <h1 class="text-h4 q-mb-lg">帮助中心</h1>

      <!-- 搜索框 -->
      <div class="search-section q-mb-xl">
        <q-input
          v-model="searchQuery"
          placeholder="搜索常见问题..."
          outlined
          class="search-input"
          @update:model-value="filterQuestions"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- 左侧分类列表 -->
        <div class="col-12 col-md-3">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 q-mb-md">分类导航</div>
              <q-list padding>
                <q-item
                  v-for="(label, key) in categories"
                  :key="key"
                  clickable
                  :active="currentCategory === key"
                  @click="currentCategory = key"
                  active-class="text-primary"
                >
                  <q-item-section avatar>
                    <q-icon :name="getCategoryIcon(key)" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- 右侧问题列表 -->
        <div class="col-12 col-md-9">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 q-mb-md">{{ categories[currentCategory] }}</div>
              
              <q-list padding separator>
                <q-expansion-item
                  v-for="faq in filteredFaqs"
                  :key="faq.id"
                  :label="faq.question"
                  header-class="text-primary"
                  expand-separator
                >
                  <q-card>
                    <q-card-section>
                      <div class="text-body1" v-html="faq.answer"></div>
                      
                      <!-- 帮助评价 -->
                      <div v-if="!faq.feedbackGiven" class="helpful-section q-mt-md">
                        <div class="text-caption text-grey q-mb-sm">
                          这个回答对您有帮助吗？
                        </div>
                        <div class="row q-gutter-sm">
                          <q-btn
                            flat
                            dense
                            size="sm"
                            color="positive"
                            icon="thumb_up"
                            label="有帮助"
                            @click="markHelpful(faq, true)"
                          />
                          <q-btn
                            flat
                            dense
                            size="sm"
                            color="negative"
                            icon="thumb_down"
                            label="没帮助"
                            @click="markHelpful(faq, false)"
                          />
                        </div>
                      </div>
                      <div v-else class="feedback-thanks text-positive q-mt-md">
                        {{ faq.feedbackPositive ? '感谢您的反馈！' : '抱歉没能帮到您，请联系客服获取更多帮助。' }}
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>

              <!-- 无搜索结果 -->
              <div v-if="filteredFaqs.length === 0" class="text-center q-pa-lg">
                <q-icon name="search_off" size="48px" color="grey-5" />
                <div class="text-h6 q-mt-md">未找到相关问题</div>
                <div class="text-grey">请尝试其他关键词，或直接联系客服</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- 联系客服 -->
      <div class="contact-support q-mt-xl">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6">没找到答案？</div>
            <div class="text-body1 q-mt-md">请联系我们的客服团队，我们会尽快为您解答</div>
            <q-btn
              color="primary"
              label="联系客服"
              class="q-mt-md"
              to="/contact"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  feedbackGiven?: boolean
  feedbackPositive?: boolean
}

const $q = useQuasar()

// 分类数据
const categories: Record<string, string> = {
  order: '订单相关',
  customization: '定制服务',
  payment: '支付相关',
  shipping: '物流配送',
  refund: '退款售后',
  account: '账户相关'
}

// FAQ数据
const faqs = ref<FAQ[]>([
  // 订单相关
  {
    id: 'order-1',
    category: 'order',
    question: '如何下单购买商品？',
    answer: '1. 选择心仪的商品并点击"加入购物车"或"立即购买"<br>2. 在购物车中确认商品信息<br>3. 填写收货地址和联系方式<br>4. 选择支付方式并完成支付<br>5. 系统自动生成订单，您可以在"我的订单"中查看订单状态'
  },
  {
    id: 'order-2',
    category: 'order',
    question: '如何查看订单状态？',
    answer: '您可以通过以下方式查看订单状态：<br>1. 登录账户后进入"我的订单"页面<br>2. 点击具体订单可查看详细信息<br>3. 系统会通过短信或邮件通知您订单状态的变更'
  },
  {
    id: 'order-3',
    category: 'order',
    question: '如何取消订单？',
    answer: '您可以在单发货前取消订单：<br>1. 进入"我的订单"页面<br>2. 找到需要取消的订单<br>3. 点击"取消订单"按钮<br>4. 选择取消原因并确认<br>注：单发货后将无法取消，如有问题请申请退款'
  },
  // 定制相关
  {
    id: 'customization-1',
    category: 'customization',
    question: '如何定制商品？',
    answer: '1. 在商品页面选择"定制服务"选项<br>2. 上传您的设计图或填写具体需求<br>3. 选���定制参数（尺寸、材质等）<br>4. 提交定制申请<br>5. 等待客服确认并报价<br>6. 确认后付款即可开始制作'
  },
  {
    id: 'customization-2',
    category: 'customization',
    question: '定制商品需要多长时间？',
    answer: '定制商品的制作时间因商品类型和具体要求而异：<br>1. 简单定制：5-15个工作日<br>2. 中等复杂度：1-2个月<br>3. 复杂定制：1-3个月<br>具体时间将在确认订单时告知'
  },
  {
    id: 'customization-3',
    category: 'customization',
    question: '定制商品有什么要求？',
    answer: '1. 设计图片要求：清晰度300DPI以上<br>2. 文件格式：支持JPG、PNG、AI、PSD<br>3. 内容限制：不接受违法违规内容<br>4. 尺寸要求：根据具体品类型有所不同<br>5. 材质选择：可根据商品类型选择适合的材质'
  },
  // 支付相关
  {
    id: 'payment-1',
    category: 'payment',
    question: '支持哪些支付方式？',
    answer: '我们支持多种支付方式：<br>1. 在线支付：支付宝、微信支付、银联<br>2. 信用卡支付：Visa、Mastercard、JCB等<br>3. 余额支付：可使用账户余额<br>4. 分期付款：支持花呗、信用卡分期等'
  },
  {
    id: 'payment-2',
    category: 'payment',
    question: '支付安全有保障吗？',
    answer: '我们采用多重安全保障措施：<br>1. SSL加密传输<br>2. 实名认证<br>3. 支付验证码<br>4. 风控系统监控<br>5. 专业支付平台合作<br>所有支付信息都经过加密处理，请放心使用'
  },
  // 物流相关
  {
    id: 'shipping-1',
    category: 'shipping',
    question: '发货需要多长时间？',
    answer: '1. 现货商品：1-3个工作日发货<br>2. 预售商品：以商品详情页说明为准<br>3. 定制商品：根据定制复杂度决定<br>4. 海外直发：7-15个工作日<br>节假日可能会延长发货时间，请以实际通知为准'
  },
  {
    id: 'shipping-2',
    category: 'shipping',
    question: '如何查看物流信息？',
    answer: '1. 登录账户进入"我的订单"<br>2. 点击订单详情<br>3. 查看物流跟踪信息<br>4. 点击物流单号可跳转至快递公司官网查询<br>您也可以通过短信或邮件获取物流更新通知'
  },
  // 退款相关
  {
    id: 'refund-1',
    category: 'refund',
    question: '如何申请退款？',
    answer: '1. 进入"我的订单"页面<br>2. 选择需要退款的订单<br>3. 点击"申请退款"<br>4. 选择退款原因并上传相关凭证<br>5. 提交申请等待审核<br>6. 审核通过后退款将原路返回'
  },
  {
    id: 'refund-2',
    category: 'refund',
    question: '退款��要多长时间？',
    answer: '退款时间因支付方式不同而异：<br>1. 支付宝/微信：1-3个工作日<br>2. 信用卡：3-15个工作日<br>3. 银行卡：3-7个工作日<br>具体到账时间以银行实际处理为准'
  },
  {
    id: 'refund-3',
    category: 'refund',
    question: '什么情况可以申请退款？',
    answer: '以下情况可以申请退款：<br>1. 收到商品7天内，商品完好未使用<br>2. 商品存在质量问题<br>3. 商品与描述不符<br>4. 未按承诺时间发货<br>5. 收到商品与订单不符<br>注：部分定制商品可能不支持退款，请在购买前确认'
  },
  // 账户相关
  {
    id: 'account-1',
    category: 'account',
    question: '忘记密码怎么办？',
    answer: '您可以通过以下方式重置密码<br>1. 点击登录页面的"忘记密码"<br>2. 输入注册邮箱<br>3. 获取验证码<br>4. 设置新密码<br>5. 完成重置后使用新密码登录'
  },
  {
    id: 'account-2',
    category: 'account',
    question: '如何保护账户安全？',
    answer: '建议采取以下措施保护账户：<br>1. 设置强密码<br>2. 开启双重认证<br>3. 定期更换密码<br>4. 不使用公共设备保存登录信息<br>5. 及时关注账户异常通知'
  }
])

const currentCategory = ref('order')
const searchQuery = ref('')

// 获取分类图标
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    order: 'shopping_bag',
    customization: 'design_services',
    payment: 'payments',
    shipping: 'local_shipping',
    refund: 'assignment_return',
    account: 'person'
  }
  return icons[category] || 'help'
}

// 过滤FAQ列表
const filteredFaqs = computed(() => {
  let result = faqs.value

  // 按分类筛选
  if (currentCategory.value) {
    result = result.filter(faq => faq.category === currentCategory.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return result
})

// 标记帮助反馈
const markHelpful = (faq: FAQ, helpful: boolean) => {
  faq.feedbackGiven = true
  faq.feedbackPositive = helpful
  
  $q.notify({
    type: helpful ? 'positive' : 'negative',
    message: helpful ? '感谢您的反馈！' : '抱歉没能帮到您，请联系客服获取更多帮助。',
    position: 'top'
  })
}

// 搜索问题
const filterQuestions = () => {
  // 搜索逻辑已通过计算属性实现
}
</script>

<style lang="scss">
/* 使用新的 Sass 语法 */
:deep(.help-page) {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 20px;

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .search-section {
    max-width: 600px;
    margin: 0 auto;
  }

  .helpful-section {
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }

  .feedback-thanks {
    padding: 8px;
    border-radius: 4px;
    background: #f0f7ff;
    text-align: center;
  }

  @media (max-width: 600px) {
    padding: 20px 10px;
  }
}
</style> 