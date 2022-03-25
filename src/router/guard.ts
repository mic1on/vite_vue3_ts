import { Router, RouteRecordRaw } from 'vue-router'
import config, { getAppConfig } from '@/config'
import { useRouterStoreOutSetUp } from '@/store/modules/router'
import { useUserStoreOutSetUp } from '@/store/modules/user'
import { NotFoundPageRouteSepPage } from '@/router/index'
export function regRouterGuide(router: Router) {
  if (!router) {
    return
  }
  router.beforeEach(async (to, from, next) => {
    // nProgress.start()
    window.$loadingBar.start()
    const userStore = useUserStoreOutSetUp()
    const token = userStore.getStoredToken()
    // 如有有token
    if (token) {
      //且它的path是登录页面，则跳过登录，进入主页
      console.log('to.path', to.path)
      if (to.path && to.path === config.app.PAGE_LOGIN_PATH) {
        next({
          replace: true,
          name: config.app.PAGE_HOME_NAME,
        })
        window.$loadingBar.finish()
      } else {
        const perms = userStore.getPermissions
        const hasPermissions = perms && perms.length
        if (hasPermissions) {
          console.log(`已加载了用户权限直接跳转. 用户 perms: ${perms}`)
          next()
        } else {
          try {
            const userInfo = userStore.getUserInfo()
            console.log('从后台获取到的用户权限:', userInfo)
            //重新创建路由
            let allRoutes = []
            const routeStore = useRouterStoreOutSetUp()
            // @ts-ignore
            allRoutes = routeStore.setClientRoutes(userInfo.permissions)
            console.log('前端路由', allRoutes)
            console.log('所有路由', allRoutes)
            //产生菜单
            allRoutes.forEach((element: RouteRecordRaw) => {
              console.log('菜单来了！', element)
              router.addRoute(element.name as string, element)
            })
            //404页面 单独页面
            router.addRoute(NotFoundPageRouteSepPage)
            next({ ...to, replace: true, query: to.query })
          } catch (error) {
            console.error('路由守卫出现异常:', error)
            window.$loadingBar.error()
          }
        }
      }
    } else {
      // 如果不存在token,也就是未登录，如果在白名单，就放行
      // eslint-disable-next-line no-lonely-if
      if (config.app.WHITE_LIST.indexOf(to.path) !== -1) {
        next()
        window.$loadingBar.finish()
      } else {
        if (getAppConfig().VITE_RECORD_LAST_ROUTE) {
          next(`${config.app.PAGE_LOGIN_PATH}?redirect=${to.path}`)
        } else {
          next(config.app.PAGE_LOGIN_PATH)
        }
        window.$loadingBar.finish()
      }
    }
  })
  router.afterEach((to) => {
    window.$loadingBar.finish()
  })
  router.onError((error, to, from) => {
    window.$loadingBar.finish()
  })
}
