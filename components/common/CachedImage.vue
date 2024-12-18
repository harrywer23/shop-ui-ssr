<template>
  <q-img :src="getImageUrl(imageUrl)"
         :alt="props.title"
         @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
const props = withDefaults(defineProps<{
  src: string;
  title?: string;
}>(), {
  title: '次元集市 手办 周边 Dimensional market hand do around' // 设置默认值
});

const imageUrl = ref(""); // 初始化 imageUrl
function handleError() {
  imageUrl.value = "/empty.png"; // 图片加载失败时设置为默认图片
}

onMounted(async () => {
  const cachedUrl = localStorage.getItem(props.src); // 从 localStorage 获取缓存的 URL
  if (cachedUrl) {
    imageUrl.value = cachedUrl; // 如果缓存存在，直接使用缓存的 URL
  } else {
    const imgUrl = getImageUrl(props.src);
    imageUrl.value = imgUrl;
    localStorage.setItem(props.src, imgUrl); // 将新加载的 URL 存入 localStorage
  }
});
</script>

<style scoped>
/* 添加样式以适应您的设计 */
</style>
