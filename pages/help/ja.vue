<template>
  <div class="help-page q-pa-md">
    <div class="content-wrapper">
      <h1 class="text-h4 q-mb-lg">ヘルプセンター</h1>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">よくある質問</h2>
        <q-list bordered separator>
          <q-expansion-item
            v-for="(faq, index) in faqs"
            :key="index"
            :label="faq.question"
            header-class="text-primary"
            :default-opened="index === 0"
          >
            <q-card>
              <q-card-section>
                {{ faq.answer }}
                <div v-if="faq.tips" class="tips q-mt-sm">
                  <q-icon name="info" size="sm" color="info" />
                  <span>{{ faq.tips }}</span>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">お問い合わせ</h2>
        <div class="contact-info">
          <q-card flat bordered>
            <q-card-section>
              <div class="contact-item">
                <q-icon name="email" color="primary" />
                <div class="contact-details">
                  <div class="label">メールアドレス</div>
                  <div class="value">support@51x.uk</div>
                </div>
              </div>
              <q-separator class="q-my-md" />
              <div class="contact-item">
                <q-icon name="schedule" color="primary" />
                <div class="contact-details">
                  <div class="label">営業時間</div>
                  <div class="value">月曜日〜金曜日 9:00-18:00</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="section">
        <h2 class="text-h5 q-mb-md">サポートカテゴリー</h2>
        <div class="support-categories">
          <q-card
            v-for="category in categories"
            :key="category.id"
            flat
            bordered
            class="category-card"
            @click="navigateToCategory(category.id)"
          >
            <q-card-section>
              <div class="category-icon">
                <q-icon :name="category.icon" color="primary" size="md" />
              </div>
              <div class="category-title">{{ category.title }}</div>
              <div class="category-desc">{{ category.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const faqs = [
  {
    question: '注文情報の変更方法は？',
    answer: '注文確定後、配送先住所などの情報を変更する場合は、お早めにカスタマーサービスまでご連絡ください。',
    tips: '注文番号をご用意の上、ご連絡いただくとスムーズです。'
  },
  {
    question: '配送にかかる時間は？',
    answer: '通常、注文確認後1-3営業日以内に発送いたします。',
    tips: '年末年始やゴールデンウィークなどは配送に遅れが生じる場合があります。'
  },
  {
    question: '返品・交換の申請方法は？',
    answer: '商品到着後7日以内にカスタマーサービスまでご連絡ください。',
    tips: '未使用・未開封の商品のみ返品・交換が可能です。'
  }
]

const categories = [
  {
    id: 'order',
    icon: 'shopping_bag',
    title: '注文・支払い',
    description: '注文方法、支払い方法、注文のキャンセルについ���'
  },
  {
    id: 'shipping',
    icon: 'local_shipping',
    title: '配送',
    description: '配送方法、配送状況の確認、配送先の変更について'
  },
  {
    id: 'returns',
    icon: 'assignment_return',
    title: '返品・交換',
    description: '返品・交換の手続き、条件、送料について'
  }
]

const navigateToCategory = (categoryId: string) => {
  router.push(`/help/category/${categoryId}`)
}
</script>

<style lang="scss" scoped>
.help-page {
  max-width: 800px;
  margin: 0 auto;
  
  .content-wrapper {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .tips {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9em;
    background: #f0f7ff;
    padding: 8px;
    border-radius: 4px;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;

    .contact-details {
      .label {
        color: #666;
        font-size: 0.9em;
        margin-bottom: 4px;
      }
      .value {
        font-weight: 500;
      }
    }
  }

  .support-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;

    .category-card {
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .category-icon {
        margin-bottom: 12px;
      }

      .category-title {
        font-weight: 500;
        margin-bottom: 8px;
      }

      .category-desc {
        color: #666;
        font-size: 0.9em;
      }
    }
  }
}

/* 响应式调整 */
@media (max-width: 599px) {
  .help-page {
    .content-wrapper {
      padding: 20px;
    }

    .support-categories {
      grid-template-columns: 1fr;
    }
  }
}
</style> 