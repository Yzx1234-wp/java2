<script setup>
// 左侧英雄介绍面板（纯展示，文案通过 props 配置，注册/登录页复用）
const props = defineProps({
  headingMain: { type: String, default: '觉醒你的' },
  headingAccent: { type: String, default: '英雄身份' },
  desc: {
    type: String,
    default: '加入蛛网联盟，跨越维度守护城市。创建身份即可同步装备、领取新手徽章。'
  },
  tags: {
    type: Array,
    default: () => [
      { icon: '🕸️', text: '三步觉醒 · 即刻出发' },
      { icon: '⚡', text: '蛛丝加密 · 隐私守护' },
      { icon: '🦸', text: '限定徽章 · 专属特权' }
    ]
  }
})
</script>

<template>
  <aside class="hero">
    <div class="web-lines"></div>

    <div class="brand">
      <svg class="emblem" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" fill="#0d2b54" stroke="#e23636" stroke-width="5" />
        <path d="M50 18c10 8 10 22 0 32-10-10-10-24 0-32z" fill="#e23636" />
        <path d="M18 50c8 10 22 10 32 0-10-10-24-10-32 0z" fill="#e23636" />
        <path d="M50 82c-10-8-10-22 0-32 10 10 10 24 0 32z" fill="#e23636" />
        <path d="M82 50c-8-10-22-10-32 0 10 10 24 10 32 0z" fill="#e23636" />
      </svg>
      蛛网账号
    </div>

    <div>
      <h1>{{ headingMain }}<br /><span>{{ headingAccent }}</span></h1>
      <p>{{ desc }}</p>
    </div>

    <div class="tags">
      <div class="tag" v-for="t in tags" :key="t.text">
        <span class="dot">{{ t.icon }}</span> {{ t.text }}
      </div>
    </div>
  </aside>
</template>

<style scoped>
.hero {
  flex: 1;
  position: relative;
  padding: 46px 38px;
  background:
    radial-gradient(circle at 30% 30%, rgba(226, 54, 54, 0.35), transparent 50%),
    linear-gradient(155deg, #1b3a6b 0%, #0d2b54 60%, #07101f 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.hero .web-lines {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image: repeating-conic-gradient(
    from 0deg at 50% 120%,
    transparent 0 11deg,
    rgba(255, 255, 255, 0.18) 11deg 12deg
  );
  -webkit-mask: radial-gradient(circle at 50% 120%, #000 55%, transparent 70%);
  mask: radial-gradient(circle at 50% 120%, #000 55%, transparent 70%);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 21px;
  z-index: 1;
}

.brand .emblem {
  width: 40px;
  height: 40px;
}

.hero h1 {
  font-size: 30px;
  line-height: 1.35;
  margin-top: 30px;
  z-index: 1;
  font-weight: 800;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.5);
}

.hero h1 span {
  color: var(--red);
}

.hero p {
  margin-top: 14px;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  z-index: 1;
}

.tags {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
  z-index: 1;
}

.tag {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 14px;
  color: #d8deea;
}

.tag .dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(226, 54, 54, 0.25);
  border: 1px solid rgba(226, 54, 54, 0.5);
  display: grid;
  place-items: center;
  font-size: 13px;
}

/* 小屏隐藏英雄面板 */
@media (max-width: 760px) {
  .hero {
    display: none;
  }
}
</style>
