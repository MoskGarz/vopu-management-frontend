<template>
  <div class="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
    <p class="text-[#3e4850] text-sm">Iniciando sesión...</p>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useAuth } from '../composables/useAuth'

const { isAuthenticated, isLoading, getSession } = useAuth()
const authStore = useAuthStore()
const router = useRouter()

watchEffect(async () => {
  if (!isLoading.value) {
    if (isAuthenticated.value) {
      const session = await getSession()
      if (session) {
        authStore.setSession(session.token, {
          sub: session.sub,
          email: session.email
        })
      }
      router.push('/')
    } else {
      router.push('/login')
    }
  }
})
</script>