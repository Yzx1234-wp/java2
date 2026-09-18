<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { show: toast } = useToast()

const form = reactive({
  account: '',
  pwd: '',
  remember: false
})

const errors = reactive({
  account: false,
  pwd: false
})

const showPwd = ref(false)
const submitting = ref(false)

const pwdType = computed(() => (showPwd.value ? 'text' : 'password'))
const eyeText = computed(() => (showPwd.value ? '隐藏' : '显示'))

function validAccount(v) {
  return /^1[3-9]\d{9}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function onSubmit() {
  errors.account = !validAccount(form.account.trim())
  errors.pwd = form.pwd.length < 6

  if (errors.account || errors.pwd) return

  submitting.value = true
  setTimeout(() => {
    toast('登录成功！欢迎回到蛛网联盟 🕸️\n（演示页面，未连接后端）', 'success')
    submitting.value = false
  }, 700)
}

function goRegister() {
  router.push('/register')
}
</script>

<template>
  <section class="form">
    <h2>英雄登录</h2>
    <div class="sub">还没有英雄身份？<a href="javascript:void(0)" @click="goRegister">立即觉醒</a></div>

    <form id="loginForm" novalidate @submit.prevent="onSubmit">
      <div class="field">
        <label for="account">英雄代号 / 邮箱</label>
        <div class="input" :class="{ err: errors.account }">
          <input
            type="text"
            id="account"
            v-model="form.account"
            placeholder="用于登录的代号或邮箱"
            autocomplete="username"
          />
        </div>
        <Transition name="hint">
          <div class="hint" v-if="errors.account">请输入有效的代号或邮箱</div>
        </Transition>
      </div>

      <div class="field">
        <label for="pwd">口令</label>
        <div class="input" :class="{ err: errors.pwd }">
          <input
            :type="pwdType"
            id="pwd"
            v-model="form.pwd"
            placeholder="至少 6 位"
            autocomplete="current-password"
          />
          <span class="eye" @click="showPwd = !showPwd">{{ eyeText }}</span>
        </div>
        <Transition name="hint">
          <div class="hint" v-if="errors.pwd">口令至少 6 位</div>
        </Transition>
      </div>

      <div class="row">
        <input type="checkbox" id="remember" v-model="form.remember" />
        <label for="remember">记住此身份</label>
        <a class="forgot" href="javascript:void(0)">忘记口令？</a>
      </div>

      <button class="btn" type="submit" :disabled="submitting">
        {{ submitting ? '登录中…' : '登 录' }}
      </button>

      <div class="divider">其他方式登录</div>
      <div class="social">
        <button type="button">📱 短信登录</button>
        <button type="button">🕷️ 蛛网令牌</button>
      </div>

      <div class="login-link">还不是英雄？<a href="javascript:void(0)" @click="goRegister">前往觉醒</a></div>
    </form>
  </section>
</template>

<style scoped>
.form {
  flex: 1;
  padding: 40px 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.form h2 {
  font-size: 23px;
}

.form .sub {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 22px;
}

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 7px;
}

.input {
  width: 100%;
  height: 44px;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  border-radius: 11px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  transition: 0.2s;
}

.input input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
  color: var(--ink);
}

.input input::placeholder {
  color: #6f7c93;
}

.input:focus-within {
  border-color: var(--red);
  box-shadow: 0 0 0 4px rgba(226, 54, 54, 0.18);
}

.input.err {
  border-color: #ff5252 !important;
}

.input .eye {
  cursor: pointer;
  color: var(--muted);
  font-size: 13px;
  user-select: none;
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 20px;
  font-size: 13px;
  color: var(--muted);
}

.row a {
  color: var(--red);
  text-decoration: none;
}

.row a:hover {
  text-decoration: underline;
}

.row .forgot {
  margin-left: auto;
}

.row a:hover {
  text-decoration: underline;
}

.btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 11px;
  cursor: pointer;
  background: linear-gradient(135deg, #ff4b4b, #e23636);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  transition: 0.2s;
  box-shadow: 0 10px 24px rgba(226, 54, 54, 0.35);
}

.btn:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.75;
  cursor: progress;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-size: 12px;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.14);
}

.social {
  display: flex;
  gap: 12px;
}

.social button {
  flex: 1;
  height: 44px;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  font-size: 14px;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.social button:hover {
  border-color: var(--red);
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: var(--muted);
}

.login-link a {
  color: var(--red);
  text-decoration: none;
  font-weight: 600;
}

.hint {
  color: #ff8a80;
  font-size: 12px;
  margin-top: 6px;
}

.hint-enter-active,
.hint-leave-active {
  transition: all 0.2s ease;
}
.hint-enter-from,
.hint-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
