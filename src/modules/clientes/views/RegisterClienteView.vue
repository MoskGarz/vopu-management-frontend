<template>
  <div class="flex items-center justify-center p-8">
    <div class="w-full max-w-2xl bg-white border border-[#bec8d1] rounded-lg p-10 shadow-sm">

      <div class="mb-10">
        <h3 class="text-2xl font-bold text-[#171c20]">
          <T keyName="cliente.registro.titulo" />
        </h3>
        <p class="text-[#3e4850] mt-1 text-sm">
          <T keyName="cliente.registro.subtitulo" />
        </p>
      </div>

      <p v-if="error" class="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
        {{ error }}
      </p>

      <p v-if="success" class="mb-6 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <T keyName="cliente.registro.exito" />
      </p>

      <RegisterClienteForm
        :is-loading="loading"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import RegisterClienteForm from '../components/RegisterClienteForm.vue'
import { useClientes } from '../../../composables/useClientes'
import type { RegisterClienteDto } from '../../../services/cliente.service'
import { T } from '@tolgee/vue'

const router = useRouter()
const { loading, error, success, registerCliente } = useClientes()

async function handleSubmit(dto: RegisterClienteDto) {
  await registerCliente(dto)
}

function handleCancel() {
  router.push('/')
}
</script>