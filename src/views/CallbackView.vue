<template>
  <div class="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
    <p class="text-[#3e4850] text-sm">Iniciando sesión...</p>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0()
const authStore = useAuthStore()
const router = useRouter()

watchEffect(async () => {
  if (!isLoading.value && isAuthenticated.value) {
    const token = await getAccessTokenSilently()
    authStore.setSession(token, {
      sub: user.value?.sub ?? '',
      email: user.value?.email ?? ''
    })
    router.push('/')
  }
})
</script>