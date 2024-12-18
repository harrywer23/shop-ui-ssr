<template>
  <div class="help-page q-pa-md">
    <div class="content-wrapper">
      <h1 class="text-h4 q-mb-lg">고객 지원 센터</h1>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">자주 묻는 질문</h2>
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
        <h2 class="text-h5 q-mb-md">고객 서비스 문의</h2>
        <div class="contact-info">
          <p><q-icon name="email" /> 이메일：support@51x.uk</p>
          <p><q-icon name="schedule" /> 운영시간：월요일-금요일 9:00-18:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: '주문 정보를 어떻게 수정하나���?',
    answer: '주문 제출 후 배송 주소 등의 정보를 수정하려면 최대한 빨리 고객 서비스에 문의해 주세요.'
  },
  {
    question: '배송에 얼마나 걸리나요?',
    answer: '일반적으로 주문 확인 후 1-3 영업일 이내에 발송됩니다.'
  },
  {
    question: '반품/교환은 어떻게 신청하나요?',
    answer: '상품 수령 후 7일 이내에 고객 서비스에 문의하여 반품/교환을 신청해 주세요.'
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