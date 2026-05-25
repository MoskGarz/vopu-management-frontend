<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <!-- Nombre completo -->
    <div class="space-y-1">
    <label for="nombreCompleto" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
        Nombre completo
    </label>
    <input
        id="nombreCompleto"
        v-model="form.nombreCompleto"
        type="text"
        placeholder="Ej. Juan Pérez"
        class="w-full px-6 py-3 rounded-lg border border-[#6f7881] focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
        :class="{ 'border-red-500': v$.nombreCompleto.$error }"
    />
    <p v-if="v$.nombreCompleto.$error" class="text-xs text-red-600">
        {{ v$.nombreCompleto.$errors[0].$message }}
    </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Número de documento -->
    <div class="space-y-1">
    <label for="numeroDocumento" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
        Número de documento
    </label>
    <input
        id="numeroDocumento"
        v-model="form.numeroDocumento"
        type="text"
        placeholder="1030310130"
        class="w-full px-6 py-3 rounded-lg border border-[#6f7881] focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
        :class="{ 'border-red-500': v$.numeroDocumento.$error }"
    />
    <p v-if="v$.numeroDocumento.$error" class="text-xs text-red-600">
        {{ v$.numeroDocumento.$errors[0].$message }}
    </p>
    </div>

        <!-- Teléfono -->
    <div class="space-y-1">
    <label for="telefono" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
        Número de teléfono
    </label>
    <input
        id="telefono"
        v-model="form.telefono"
        type="tel"
        placeholder="+57 300 000 0000"
        class="w-full px-6 py-3 rounded-lg border border-[#6f7881] focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
        :class="{ 'border-red-500': v$.telefono.$error }"
    />
    <p v-if="v$.telefono.$error" class="text-xs text-red-600">
        {{ v$.telefono.$errors[0].$message }}
    </p>
    </div>

    </div>

    <!-- Botones -->
    <div class="pt-6 border-t border-[#bec8d1] flex justify-end gap-3">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-8 py-3 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-[#eaeef3] transition-colors"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="px-8 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all shadow-sm disabled:opacity-60"
      >
        {{ isLoading ? 'Guardando...' : 'Guardar' }}
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import type { RegisterClienteDto } from '../../../services/cliente.service'

const props = defineProps<{ isLoading: boolean }>()
const emit = defineEmits<{
  submit: [dto: RegisterClienteDto]
  cancel: []
}>()

const form = reactive<RegisterClienteDto>({
  nombreCompleto: '',
  numeroDocumento: '',
  telefono: ''
})

const rules = {
  nombreCompleto: {
    required: helpers.withMessage('El nombre es requerido', required),
    minLength: helpers.withMessage('Mínimo 2 caracteres', minLength(2)),
    maxLength: helpers.withMessage('Máximo 50 caracteres', maxLength(50)),
    formato: helpers.withMessage(
      'Solo letras, espacios y caracteres como . , - #',
      helpers.regex(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ0-9'\-.,"#&\s]+$/)    )
  },
  numeroDocumento: {
    required: helpers.withMessage('El número de documento es requerido', required),
    minLength: helpers.withMessage('Mínimo 7 dígitos', minLength(7)),
    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLength(10)),
    formato: helpers.withMessage(
      'Solo números',
      helpers.regex(/^\d{7,10}$/)
    )
  },
  telefono: {
    required: helpers.withMessage('El teléfono es requerido', required),
    minLength: helpers.withMessage('Mínimo 7 caracteres', minLength(7)),
    maxLength: helpers.withMessage('Máximo 15 caracteres', maxLength(15)),
    formato: helpers.withMessage(
      'Formato válido: +57 300 000 0000',
      helpers.regex(/^\+?\d{7,15}$/)
    )
  }
}

const v$ = useVuelidate(rules, form)

async function handleSubmit() {
  const valid = await v$.value.$validate()
  if (!valid) return
  emit('submit', { ...form })
}
</script>