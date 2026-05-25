<template>
  <div class="min-h-screen bg-gradient-to-br from-[#e8f4fd] to-[#f0f7ff] flex items-center justify-center p-6">
    <div class="w-full max-w-md">

      <div class="mb-8">
        <img
          src="/BannerVopuManagement.png"
          alt="Vopu Management"
          class="w-full h-auto object-contain rounded-xl shadow-sm"
        />
      </div>

      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-[#0b1c30]">
          <T keyName="login.titulo" />
        </h2>
        <p class="text-[#3e4850] mt-2 text-sm">
          <T keyName="login.subtitulo" />
        </p>
      </div>

      <div class="bg-white rounded-xl border border-[#bec8d1] p-8 shadow-sm">
        <button
          @click="login"
          :disabled="isLoading"
          class="w-full bg-[#00628d] hover:bg-[#004c6e] text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <span v-if="isLoading"><T keyName="login.redirigiendo" /></span>
          <span v-else><T keyName="login.boton" /></span>
        </button>

        <p v-if="error" class="mt-4 text-sm text-red-600 text-center">
          <T keyName="login.error" />
        </p>
      </div>

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
import { useAuth } from '../composables/useAuth'
import { T } from '@tolgee/vue'

const { login, isLoading } = useAuth()
const error = ref<string | null>(null)
</script>