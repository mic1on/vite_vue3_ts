import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { regRouterGuide } from '@/router/guard'

export const NotFoundPageRouteSepPage = {
  path: '/:catchAll(.*)*',
  name: 'NotFound',
  hidden: true,
  component: () => import('@/views/base/404.vue'),
}
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue'),
  },
  // 重定向和刷新
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    meta: { hidden: true },
    component: () => import('@/views/base/redirect.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

regRouterGuide(router)

export const setupVueRouter = (app: App) => {
  app.use(router)
}
