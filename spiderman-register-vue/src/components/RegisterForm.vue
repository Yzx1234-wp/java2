<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { show: toast } = useToast()

// 表单数据
const form = reactive({
  account: '',
  pwd: '',
  pwd2: '',
  agree: false
})

// 错误提示显隐状态
const errors = reactive({
  account: false,
  pwd: false,
  pwd2: false,
  agree: false
})

// 口令显隐
const showPwd = ref(false)
const showPwd2 = ref(false)

// 提交中状态
const submitting = ref(false)

const pwdType = computed(() => (showPwd.value ? 'text' : 'password'))
const pwd2Type = computed(() => (showPwd2.value ? 'text' : 'password'))
const eye1Text = computed(() => (showPwd.value ? '隐藏' : '显示'))
const eye2Text = computed(() => (showPwd2.value ? '隐藏' : '显示'))

// 校验规则：手机号或邮箱
function validAccount(v) {
  return /^1[3-9]\d{9}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function goLogin() {
  router.push('/login')
}

function onSubmit() {
  // 每次提交先重置错误
  errors.account = !validAccount(form.account.trim())
  errors.pwd = form.pwd.length < 6
  errors.pwd2 = form.pwd2 !== form.pwd || form.pwd2 === ''
  errors.agree = !form.agree

  if (errors.account || errors.pwd || errors.pwd2 || errors.agree) return

  submitting.value = true
  setTimeout(() => {
    toast('身份觉醒成功！欢迎加入蛛网联盟 🕸️\n（演示页面，未连接后端）', 'success')
    submitting.value = false
  }, 700)
}
</script>

<template>
  <section class="form">
    <h2>觉醒身份</h2>
    <div class="sub">已有英雄身份？<a href="javascript:void(0)" @click="goLogin">前往登录</a></div>

    <form id="regForm" novalidate @submit.prevent="onSubmit">
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
        <label for="pwd">设置口令</label>
        <div class="input" :class="{ err: errors.pwd }">
          <input
            :type="pwdType"
            id="pwd"
            v-model="form.pwd"
            placeholder="至少 6 位"
            autocomplete="new-password"
          />
          <span class="eye" @click="showPwd = !showPwd">{{ eye1Text }}</span>
        </div>
        <Transition name="hint">
          <div class="hint" v-if="errors.pwd">口令至少 6 位</div>
        </Transition>
      </div>

      <div class="field">
        <label for="pwd2">确认口令</label>
        <div class="input" :class="{ err: errors.pwd2 }">
          <input
            :type="pwd2Type"
            id="pwd2"
            v-model="form.pwd2"
            placeholder="再次输入口令"
            autocomplete="new-password"
          />
          <span class="eye" @click="showPwd2 = !showPwd2">{{ eye2Text }}</span>
        </div>
        <Transition name="hint">
          <div class="hint" v-if="errors.pwd2">两次输入的口令不一致</div>
        </Transition>
      </div>

      <div class="row">
        <input type="checkbox" id="agree" v-model="form.agree" />
        <label for="agree">我已阅读并同意 <a href="#">《英雄守则》</a></label>
      </div>
      <Transition name="hint">
        <div class="hint" v-if="errors.agree">请先同意英雄守则</div>
      </Transition>

      <button class="btn" type="submit" :disabled="submitting">
        {{ submitting ? '觉醒中…' : '觉 醒 身 份' }}
      </button>

      <div class="divider">其他方式觉醒</div>
      <div class="social">
        <button type="button">📱 短信觉醒</button>
        <button type="button">🕷️ 蛛网令牌</button>
      </div>

      <div class="login-link">已是英雄？<a href="javascript:void(0)" @click="goLogin">返回登录</a></div>
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
