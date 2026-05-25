<template>
  <div class="flex min-h-screen">

    <aside class="hidden md:flex flex-col h-screen w-64 bg-primary py-6 shrink-0 fixed left-0 top-0">
      <div class="mb-16 px-4">
        <img
          src="/BannerVopu2.jpg"
          alt="Vopu Management"
          class="w-full h-auto object-contain rounded-lg"
        />
      </div>

      <nav class="flex-1 space-y-1 px-3">
        <RouterLink
          to="/clientes/registro"
          class="flex items-center gap-3 text-white rounded-lg font-bold px-4 py-3 transition-all hover:bg-white/20"
          active-class="bg-white/20"
        >
          <span class="text-sm"><T keyName="navegacion.clientes" /></span>
        </RouterLink>
      </nav>

      <div class="px-3 mb-4">
        <RouterLink
          to="/"
          class="flex items-center gap-3 text-white/70 rounded-lg px-4 py-3 transition-all hover:bg-white/20 hover:text-white text-sm"
        >
          <T keyName="navegacion.dashboard" />
        </RouterLink>
      </div>
    </aside>

    <main class="flex-1 md:ml-64 bg-[#f6fafe] min-h-screen flex flex-col">

      <header class="flex justify-between items-center w-full px-8 h-16 bg-[#f6fafe] border-b border-[#bec8d1] fixed top-0 md:left-64 md:w-[calc(100%-16rem)] z-10">
        <h2 class="text-xl font-bold text-primary">{{ pageTitle }}</h2>
        <div class="flex items-center gap-4">
          <button
            @click="toggleLanguage"
            class="text-sm text-[#3e4850] hover:text-primary transition-colors font-medium border border-[#bec8d1] rounded px-2 py-1"
          >
            {{ currentLanguage === 'es' ? 'EN' : 'ES' }}
          </button>
          <button
            @click="handleLogout"
            class="text-sm text-[#3e4850] hover:text-primary transition-colors font-medium"
          >
            <T keyName="navegacion.cerrar_sesion" />
          </button>
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
            {{ userInitial }}
          </div>
        </div>
      </header>

      <div class="mt-16 flex-1">
        <RouterView />
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useAuth } from '../composables/useAuth'
import { tolgee } from '../plugins/tolgee'
import { T, useTranslate } from '@tolgee/vue'

const route = useRoute()
const authStore = useAuthStore()
const { logout } = useAuth()
const { t } = useTranslate()

const currentLanguage = ref(tolgee.getLanguage() ?? 'es')

async function toggleLanguage() {
  const newLang = currentLanguage.value === 'es' ? 'en' : 'es'
  await tolgee.changeLanguage(newLang)
  currentLanguage.value = newLang
}

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'registro-cliente': t.value('pagina.crear_cliente'),
  }
  return titles[route.name as string] ?? t.value('pagina.vopu_management')
})

const userInitial = computed(() => {
  return authStore.user?.email?.charAt(0).toUpperCase() ?? 'U'
})

async function handleLogout() {
  authStore.clearSession()
  await logout()
}
</script>