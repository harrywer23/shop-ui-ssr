<template>
  <div class="comment-item">
    <div class="comment-header">
      <q-avatar>
        <q-img :src="getImageUrl(comment.userAvatar) || defaultAvatar"/>
      </q-avatar>
      <div class="user-info">
        <div class="username">
          {{ comment.userName }}
          <q-badge v-if="comment.isAnonymous" color="grey" label="匿名" />
        </div>
        <div class="rating">
          <q-rating
            v-model="comment.score"
            max="5"
            size="1em"
            color="amber"
            readonly
          />
          <span class="time">{{ formatDate(comment.createTime) }}</span>
        </div>
      </div>
    </div>

    <div class="comment-content">
      {{ comment.content }}
    </div>

    <div v-if="comment.images?.length" class="comment-images">
      <q-img
        v-for="(img, index) in comment.images"
        :key="index"
        :src="getImageUrl(img)"
        class="cursor-pointer"
        @click="openImageViewer(comment.images, index)"
      />
    </div>

    <div class="comment-footer">
      <q-btn flat round size="sm" icon="thumb_up" @click="handleLike">
        <q-tooltip>{{ comment.likes }}人觉得有用</q-tooltip>
      </q-btn>
      <q-btn flat round size="sm" icon="chat_bubble" @click="handleReply">
        <q-tooltip>{{ comment.replyCount }}条回复</q-tooltip>
      </q-btn>
    </div>

    <!-- 回复列表 -->
    <div v-if="comment.replies?.length" class="replies-list">
      <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
        <span class="reply-user">{{ reply.userName }}</span>
        <span class="reply-content">{{ reply.content }}</span>
        <span class="reply-time">{{ formatDate(reply.createTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {getImageUrl} from "~/utils/tools";


interface Reply {
  id: number
  userName: string
  content: string
  createTime: string
}

interface Comment {
  commentId: number
  userId: string
  userName: string
  userAvatar?: string
  content: string
  score: number
  images?: string[]
  likes: number
  replyCount: number
  createTime: string
  isAnonymous: boolean
  replies?: Reply[]
}

const props = defineProps<{
  comment: Comment
}>()

const emit = defineEmits<{
  like: [commentId: number]
  reply: [commentId: number]
  'view-image': [images: string[], index: number]
}>()

const defaultAvatar = '/images/favicon.ico'

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLike = () => {
  emit('like', props.comment.commentId)
}

const handleReply = () => {
  emit('reply', props.comment.commentId)
}

const openImageViewer = (images: string[], index: number) => {
  emit('view-image', images, index)
}
</script>

<style scoped lang="scss">
.comment-item {
  padding: 20px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}

.comment-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.user-info {
  flex: 1;
}

.username {
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time {
  color: #999;
  font-size: 12px;
}

.comment-content {
  margin: 12px 0;
  line-height: 1.6;
  color: #333;
}

.comment-images {
  display: flex;
  gap: 8px;
  margin: 12px 0;
  flex-wrap: wrap;

  .q-img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.comment-footer {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.replies-list {
  margin-top: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.reply-item {
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.reply-user {
  color: #1976d2;
  font-weight: 500;
}

.reply-content {
  flex: 1;
  color: #333;
}

.reply-time {
  color: #999;
  font-size: 12px;
}
</style>
