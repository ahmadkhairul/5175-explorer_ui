import { defineStore } from 'pinia'
import { auth } from '@/services'
import { clearStorages, getToken, setToken } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as null | { id: number; name: string; role: string },
    error: '' as unknown,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      this.error = null
      setToken(token)
    },
    setUser(userData: { id: number; name: string; role: string }) {
      this.user = userData
      this.error = null
    },
    async initialize() {
      const token = getToken()
      if (token) {
        this.token = token
        try {
          const data = await auth()
          this.user = data
        } catch (err: unknown) {
          this.token = ''
          this.user = null
          this.error = err
          clearStorages()
        }
      }
    },
    logout() {
      this.token = ''
      this.user = null
      this.error = null
      clearStorages()
    },
  },
})
