import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import Layout from '../layout/index.vue'
import { useUserStore } from '@/store/modules/user'

NProgress.configure({ showSpinner: false }) // 显示右上角螺旋加载提示

const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]
const LY: RouteRecordRaw = {
  path: '/',
  name: 'layout',
  component: Layout,
  redirect: '',
  children: []
}
// 404
const NotFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue')
}
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL_PREFIX),
  routes
})

//路由白名单
const whiteList = ['/login']

// 路由守卫
router.beforeEach(async (to, _) => {
  NProgress.start() //开启进度条
  const userStore = useUserStore()
  const token = userStore.token

  if (token) {
    if (to.path === '/login') {
      return '/'
    } else {
      if (router.getRoutes().length <= 3) {
        await userStore.getInfo()
        const rtList = userStore.routes
        // 首页重定向为第一个子路由
        LY.redirect = rtList[0].path
        // 添加布局路由
        router.addRoute(LY)
        // 添加子路由
        rtList.forEach((item: RouteRecordRaw) => {
          router.addRoute('layout', item)
        })
        // 最后添加404
        router.addRoute(NotFound)
        // console.log(router.getRoutes())
        return to.fullPath
      } else {
        return true
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      return true
    } else {
      return '/login'
    }
  }
})

router.afterEach(() => {
  NProgress.done() //开启进度条
  return true
})

export default router
