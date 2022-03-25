import { store } from '@/store'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    status: {
      token: '',
    },
    user: {},
    permissions: [],
  }),
  getters: {
    getToken(): string {
      return this.status.token
    },
    getPermissions(): string[] {
      return this.permissions
    },
  },
  actions: {
    getStoredToken() {
      return '123'
    },
    getUserInfo() {
      const data = { permissions: ['admin'] }
      const perms = data.permissions
      this.setPermissions(perms)
      return data
    },
    setPermissions(perms: string[]): void {
      // @ts-ignore
      this.permissions = perms
    },
  },
})

export function useUserStoreOutSetUp() {
  return useUserStore(store)
}
