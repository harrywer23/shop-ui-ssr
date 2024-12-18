<template>
  <div class="help-page q-pa-md">
    <div class="content-wrapper">
      <h1 class="text-h4 q-mb-lg">幫助中心</h1>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">常見問題</h2>
        <q-list bordered separator>
          <q-expansion-item
            v-for="(faq, index) in faqs"
            :key="index"
            :label="faq.question"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                {{ faq.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">聯繫客服</h2>
        <div class="contact-info">
          <p><q-icon name="email" /> 郵箱：support@51x.uk</p>
          <p><q-icon name="schedule" /> 工作時間：週一至週五 9:00-18:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: '如何修改訂單信息？',
    answer: '訂單提交後，如需修改收貨地址等信息，請盡快聯繫客服處理。'
  },
  {
    question: '發貨需要多長時間？',
    answer: '正常情況下，訂單確認後1-3個工作日內發貨。'
  },
  {
    question: '如何申請退換貨？',
    answer: '請在收到商品後7天內聯繫客服申請退換貨，並說明具體原因。'
  }
]
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

  .contact-info {
    p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
  }
}
</style> 