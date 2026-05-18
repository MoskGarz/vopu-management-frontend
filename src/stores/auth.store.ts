import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isLogged = ref(false)
  const user = ref<{ sub: string; email: string } | null>(null)

  function setSession(t: string, u: { sub: string; email: string }) {
    token.value = t
    user.value = u
    isLogged.value = true
  }

  function clearSession() {
    token.value = null
    user.value = null
    isLogged.value = false
  }

  return { token, isLogged, user, setSession, clearSession }
})