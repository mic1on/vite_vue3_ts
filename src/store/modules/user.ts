import { store } from '@/store'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    status: {
      token: '',
      user: {},
      permissions: [],
    },
  }),
  getters: {
    getToken(): string {
      return this.status.token
    },
  },
})

export function useUserStoreOutSetUp() {
  return useUserStore(store)
}
