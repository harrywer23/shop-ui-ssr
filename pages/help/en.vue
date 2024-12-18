<template>
  <div class="help-page q-pa-md">
    <div class="content-wrapper">
      <h1 class="text-h4 q-mb-lg">Help Center</h1>

      <div class="section q-mb-xl">
        <h2 class="text-h5 q-mb-md">FAQ</h2>
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
        <h2 class="text-h5 q-mb-md">Contact Customer Service</h2>
        <div class="contact-info">
          <p><q-icon name="email" /> Email: support@51x.uk</p>
          <p><q-icon name="schedule" /> Business Hours: Monday-Friday 9:00-18:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: 'How do I modify my order information?',
    answer: 'After submitting your order, please contact customer service as soon as possible if you need to modify shipping address or other information.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Normally, orders are shipped within 1-3 business days after confirmation.'
  },
  {
    question: 'How do I request a return or exchange?',
    answer: 'Please contact customer service within 7 days of receiving your items to request a return or exchange.'
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