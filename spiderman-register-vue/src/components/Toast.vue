<script setup>
import { useToast } from '../composables/useToast'
const { state } = useToast()
</script>

<template>
  <Transition name="toast">
    <div v-if="state.visible" class="toast" :class="state.type">
      <span class="ico">{{ state.type === 'success' ? '🕸️' : '⚠️' }}</span>
      <span class="msg">{{ state.message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 90vw;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  white-space: pre-line;
  text-align: center;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
}
.toast.success {
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  border: 1px solid rgba(120, 255, 140, 0.4);
}
.toast.error {
  background: linear-gradient(135deg, #e23636, #b71c1c);
  border: 1px solid rgba(255, 120, 120, 0.4);
}
.toast .ico {
  font-size: 16px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -16px);
}
</style>
