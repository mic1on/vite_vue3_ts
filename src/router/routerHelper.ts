import { RouteRecordRaw } from 'vue-router'

export function getClientRoutes() {
  ///这个方式，顺序是个问题，写一个文件里，顺序可以保证
  const modules = import.meta.globEager('../router/modules/**/*.ts')
  const routesItems: RouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routesItems.push(...modList)
  })
  // eslint-disable-next-line no-console
  console.log('本地路由', routesItems)
  return routesItems
}
export function filterMenuRoutes(routes: any[]) {
  const finallyRoutes: any[] = []
  routes.forEach((route: any) => {
    let item = { ...route }
    if (item.meta?.hidden !== true) {
      if (item.children && item.children.length) {
        //只有一个下属路由，就不展开目录了
        if (item.children.length === 1) {
          item = item.children[0]
        } else {
          item.children = filterMenuRoutes(item.children)
        }
      } else {
        //以防万一，没下级就把 children 删掉，否则 tree 组件会渲染一个假装有下级的节点出来.
        delete item.children
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
export function hasPermission(
  permissions: any[],
  route: { meta: { permissions: string | any[] } }
): boolean {
  return true
}
export function filterClientRoutesWithPermissions(routes: any[], permissions: string[]): any[] {
  const finallyRoutes: any[] = []
  permissions &&
    permissions.length &&
    routes.forEach((route: any) => {
      const item = { ...route }
      if (hasPermission(permissions, route)) {
        if (item.children) {
          item.children = filterClientRoutesWithPermissions(item.children, permissions)
        }
        finallyRoutes.push(item)
      }
    })
  return finallyRoutes
}
export function filterAffixTabs(routes: any[]) {
  const finallyRoutes: any[] = []
  routes.forEach((route: any) => {
    const item = { ...route }
    if (item.meta && item.meta.affix === true) {
      if (item.children) {
        item.children = filterAffixTabs(item.children)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
