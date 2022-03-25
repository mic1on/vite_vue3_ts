import { defineStore } from 'pinia'
import { store } from '@/store'
import { RouterStateType } from 'typings/store'
import {
  filterClientRoutesWithPermissions,
  getClientRoutes,
  filterMenuRoutes,
} from '@/router/routerHelper'

export const useRouterStore = defineStore({
  id: 'router',
  state: (): RouterStateType => ({ routes: [], menus: [] }),
  getters: {
    getRoutes(): any[] {
      return this.routes
    },
    getMenus(): any[] {
      return this.menus
    },
  },
  actions: {
    setClientRoutes(perms: string[]) {
      const filterRoutes = filterClientRoutesWithPermissions(getClientRoutes(), perms)
      this.routes = filterRoutes
      this.menus = filterMenuRoutes(filterRoutes)
      return filterRoutes
    },
  },
})

export function useRouterStoreOutSetUp() {
  return useRouterStore(store)
}
