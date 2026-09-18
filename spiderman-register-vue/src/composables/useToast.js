import { reactive } from 'vue'

// 全局单例 Toast 状态（所有组件共享）
const state = reactive({
  visible: false,
  message: '',
  type: 'success' // success | error
})

let timer = null

export function useToast() {
  function show(message, type = 'success', duration = 2400) {
    state.message = message
    state.type = type
    state.visible = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      state.visible = false
    }, duration)
  }

  return { state, show }
}
