import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/register', name: 'register', component: RegisterView, meta: { title: '蜘蛛侠 · 觉醒身份' } },
  { path: '/login', name: 'login', component: LoginView, meta: { title: '蜘蛛侠 · 英雄登录' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '页面丢失 · 蛛网联盟' } }
]

const router = createRouter({
  // 用 hash 路由，打包后直接双击 dist/index.html 也能正常跳转
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
