<template>
  <footer class="app-footer">
    <div class="footer-content">
      <!-- 主要链接 -->
      <div class="footer-section">
        <h3>{{ $t('footer.about') }}</h3>
        <ul>
          <li><NuxtLink to="/about">{{ $t('footer.about') }}</NuxtLink></li>
          <li><NuxtLink to="/contact">{{ $t('footer.contact') }}</NuxtLink></li>
          <li><NuxtLink to="/terms">{{ $t('footer.terms') }}</NuxtLink></li>
          <li><NuxtLink to="/privacy">{{ $t('footer.privacy') }}</NuxtLink></li>
        </ul>
      </div>

      <!-- 帮助中心 -->
      <div class="footer-section">
        <h3>{{ $t('footer.help') }}</h3>
        <ul>
          <li><NuxtLink to="/help">{{ $t('footer.help') }}</NuxtLink></li>
          <li><NuxtLink to="/suggestions">{{ $t('footer.suggestions') }}</NuxtLink></li>
          <li><NuxtLink to="/report">{{ $t('footer.report') }}</NuxtLink></li>
          <li><NuxtLink to="/bug-report">{{ $t('footer.bugReport') }}</NuxtLink></li>
        </ul>
      </div>

      <!-- 友情链接 -->
      <div class="footer-section">
        <h3>{{ $t('footer.friendLinks.title') }}</h3>
        <ul>
          <li><a href="#" target="_blank">{{ $t('footer.friendLinks.novel') }}</a></li>
          <li><a href="#" target="_blank">{{ $t('footer.friendLinks.navigation') }}</a></li>
          <li><a href="#" target="_blank">{{ $t('footer.friendLinks.world') }}</a></li>
        </ul>
      </div>

      <!-- 联系方式 -->
      <div class="footer-section">
        <h3>{{ $t('footer.contact') }}</h3>
        <div class="contact-info">
          <p>BLACK WHITE UMBRELLA LTD</p>
          <p>{{ $t('footer.keywords') }}</p>
        </div>
      </div>
    </div>

    <!-- 添加安全标识区域 -->
    <div class="security-badges">
      <div class="badge-container">
        <img src="/security/visa.png" alt="Visa" class="security-badge">
        <img src="/security/mastercard.png" alt="Mastercard" class="security-badge">
        <img src="/payment/paypal.jpeg" alt="PayPal" class="security-badge">
        <img src="/security/ssl.png" alt="SSL Secure" class="security-badge">
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="footer-bottom">
      <p>Copyright © 2002-{{  new Date().getFullYear() }} www.cmall.uk www.51x.uk All Rights Reserved {{  new Date().getFullYear() }}</p>
      <p>{{ $t('footer.description') }}</p>
      <p>{{ $t('footer.disclaimer') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.app-footer {
  background: #f8f9fa;
  padding: 40px 0 20px;
  margin-top: 60px;
  border-top: 1px solid #eee;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 14px;
}

.footer-section ul li a:hover {
  color: var(--q-primary);
}

.contact-info p {
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #eee;
}

.footer-bottom p {
  margin: 8px 0;
  color: #999;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}

/* 更新安全标识相关样式 */
.security-badges {
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 15px 20px;
  text-align: center;
  border-top: 1px solid #eee;
  background: #fff;
}

.badge-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  padding: 5px 0;
}

.security-badge {
  height: 35px;
  width: auto;
  opacity: 0.85;
  transition: all 0.3s ease;
  filter: grayscale(20%);
}

.security-badge:hover {
  opacity: 1;
  filter: grayscale(0%);
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .security-badges {
    margin-top: 20px;
    padding: 10px;
  }

  .badge-container {
    gap: 20px;
  }

  .security-badge {
    height: 25px;
  }
}
</style>
