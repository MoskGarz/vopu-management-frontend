<template>
  <div class="min-h-screen bg-gradient-to-br from-[#e8f4fd] to-[#f0f7ff] flex items-center justify-center p-6">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="mb-8">
        <img
          src="/BannerVopuManagement.png"
          alt="Vopu Management"
          class="w-full h-auto object-contain rounded-xl shadow-sm"
        />
      </div>

      <!-- Título -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-[#0b1c30]">Inicia sesión en tu cuenta</h2>
        <p class="text-[#3e4850] mt-2 text-sm">Gestión de arquitectura empresarial de alta velocidad.</p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-xl border border-[#bec8d1] p-8 shadow-sm">
        <button
          @click="login"
          :disabled="isLoading"
          class="w-full bg-[#00628d] hover:bg-[#004c6e] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <span v-if="isLoading">Redirigiendo...</span>
          <span v-else>Iniciar Sesión →</span>
        </button>

        <p v-if="error" class="mt-4 text-sm text-red-600 text-center">
          {{ error }}
        </p>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-xs text-[#6f7881]">
        <span class="font-semibold tracking-widest">Management</span>
        <span class="mx-3">|</span>
        <span class="tracking-widest">ENTERPRISE EFFICIENCY</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()
const isLoading = ref(false)
const error = ref<string | null>(null)

async function login() {
  isLoading.value = true
  error.value = null
  try {
    await loginWithRedirect()
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al iniciar sesión'
    isLoading.value = false
  }
}
</script>