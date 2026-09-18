<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="webs"></div>
  <div class="nf">
    <div class="code">404</div>
    <h1>这片维度尚未被蛛网覆盖</h1>
    <p>你寻找的页面似乎被绿魔带走了。</p>
    <button class="btn" @click="router.push('/register')">返回觉醒</button>
  </div>
</template>

<style scoped>
.nf {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px;
}
.code {
  font-size: 96px;
  font-weight: 800;
  color: var(--red);
  text-shadow: 0 6px 30px rgba(226, 54, 54, 0.4);
  line-height: 1;
}
.nf h1 {
  margin-top: 10px;
  font-size: 24px;
}
.nf p {
  margin-top: 12px;
  color: var(--muted);
  font-size: 14px;
}
.btn {
  margin-top: 26px;
  width: 200px;
  height: 46px;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  background: linear-gradient(135deg, #ff4b4b, #e23636);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  box-shadow: 0 10px 24px rgba(226, 54, 54, 0.35);
  transition: 0.2s;
}
.btn:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
</style>
