<script setup>
import HeroPanel from '../components/HeroPanel.vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="webs"></div>
  <div class="card">
    <HeroPanel
      heading-main="欢迎回到"
      heading-accent="蛛网联盟"
      desc="登录以继续守护城市。同步你的装备进度，领取专属英雄徽章。"
      :tags="[
        { icon: '🕸️', text: '一键登录 · 即刻归队' },
        { icon: '⚡', text: '蛛丝加密 · 隐私守护' },
        { icon: '🦸', text: '跨端同步 · 无缝衔接' }
      ]"
    />
    <LoginForm />
  </div>
</template>

<style scoped>
.card {
  width: 860px;
  max-width: 94vw;
  min-height: 560px;
  background: rgba(13, 20, 38, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(226, 54, 54, 0.45);
  border-radius: 20px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55);
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

@media (max-width: 760px) {
  .card {
    flex-direction: column;
  }
}
</style>
