<template>
  <div class="about-page">
    <div class="page-container">
      <h1 class="text-h4 q-mb-lg">{{ t('about.title') }}</h1>

      <!-- 公司简介 -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('about.introduction.title') }}</div>
          <p class="text-body1">{{ t('about.introduction.content') }}</p>

          <!-- 添加专长列表 -->
          <div class="specialties-section q-mt-md">
            <div class="text-subtitle1 q-mb-sm">{{ t('about.introduction.specialties.title') }}</div>
            <q-list>
              <q-item v-for="n in 4" :key="n">
                <q-item-section avatar>
                  <q-icon name="check_circle" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ t(`about.introduction.specialties.item${n}`) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>

      <!-- 使命愿景 -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('about.mission.title') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-card flat class="mission-card">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">{{ t('about.mission.vision.title') }}</div>
                  <p>{{ t('about.mission.vision.content') }}</p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-6">
              <q-card flat class="mission-card">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">{{ t('about.mission.values.title') }}</div>
                  <p>{{ t('about.mission.values.content') }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 发展历程 -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('about.history.title') }}</div>
          <q-timeline color="primary">
            <q-timeline-entry
              v-for="(milestone, index) in milestones"
              :key="index"
              :title="milestone.year"
              :subtitle="milestone.title"
            >
              <div>{{ milestone.description }}</div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <!-- 联系方式 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ t('about.contact.title') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <!-- UK Office -->
              <div class="office-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">UK Office</div>
                <div class="contact-info">
                  <q-icon name="business" size="sm" class="q-mr-sm" />
                  <span>BLACK WHITE UMBRELLA LTD</span>
                </div>
                <div class="contact-info">
                  <q-icon name="place" size="sm" class="q-mr-sm" />
                  <span>7 COPPERFIELD ROAD, COVENTRY<br>
                        WEST MIDLANDS, ENGLAND<br>
                        UNITED KINGDOM CV2 4AQ</span>
                </div>
              </div>

              <!-- China Office -->
              <div class="office-section q-mb-md">
                <div class="text-subtitle1 q-mb-sm">中国办公室</div>
                <div class="contact-info">
                  <q-icon name="business" size="sm" class="q-mr-sm" />
                  <span>中国海南海口美兰红盼易百货商行</span>
                </div>
                <div class="contact-info">
                  <q-icon name="place" size="sm" class="q-mr-sm" />
                  <span>海南省海口市美兰区海府街道南宝路与椰林路交叉路口东160米南宝路小区E12号楼1单元第二层91号</span>
                </div>
              </div>

              <div class="contact-info">
                <q-icon name="email" size="sm" class="q-mr-sm" />
                <span>super@aivrw.com</span>
              </div>
              <div class="contact-info">
                <q-icon name="phone" size="sm" class="q-mr-sm" />
                <span>Whats App: +65 91605705</span>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 q-mb-sm">{{ t('about.contact.hours.title') }}</div>
              <div class="business-hours">
                <div>{{ t('about.contact.hours.weekdays') }}</div>
                <div>{{ t('about.contact.hours.weekend') }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <div class="text-subtitle1 q-mb-sm">{{ t('about.contact.info') }}</div>
      <div class="info-item">
        <q-icon name="info" size="24px" />
        <div class="info-content">
          <div class="info-label">Instructions：</div>
          <div class="info-value">{{ t('about.contact.infoDetail') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n()
const milestones = [
  {
    year: '2024',
    title: t('about.history.milestones.2024.title'),
    description: t('about.history.milestones.2024.description')
  },
  {
    year: '2023',
    title: t('about.history.milestones.2023.title'),
    description: t('about.history.milestones.2023.description')
  },
  {
    year: '2022',
    title: t('about.history.milestones.2022.title'),
    description: t('about.history.milestones.2022.description')
  }
]
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.mission-card {
  height: 100%;
  background-color: #f5f5f5;
}

.contact-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.business-hours {
  color: #666;
}

.business-hours > div {
  margin-bottom: 0.5rem;
}

.office-section {
  border-left: 3px solid #1976d2;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.contact-info {
  display: flex;
  align-items: flex-start;  /* 改为flex-start以便于长地址的显示 */
  margin-bottom: 1rem;
}

.contact-info span {
  line-height: 1.4;
}

.specialties-section {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
}
</style>
