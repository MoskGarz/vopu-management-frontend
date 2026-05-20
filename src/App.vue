<template>
  <RouterView />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import { useAuth } from './composables/useAuth'

const { isAuthenticated, isLoading, getSession } = useAuth()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

watch(isLoading, async (loading) => {
  if (!loading) {
    if (isAuthenticated.value) {
      if (!authStore.isLogged) {
        const session = await getSession()
        if (session) {
          authStore.setSession(session.token, {
            sub: session.sub,
            email: session.email
          })
        }
      }
    } else if (!route.meta.public) {
      router.push('/login')
    }
  }
})
</script>