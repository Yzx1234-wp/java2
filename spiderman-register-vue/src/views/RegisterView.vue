<script setup>
import HeroPanel from '../components/HeroPanel.vue'
import RegisterForm from '../components/RegisterForm.vue'
</script>

<template>
  <div class="webs"></div>
  <div class="card">
    <HeroPanel />
    <RegisterForm />
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
