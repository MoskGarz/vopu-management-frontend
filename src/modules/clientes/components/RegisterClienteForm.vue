<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <div class="space-y-1">
      <label for="nombreCompleto" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
        {{ t('registro.campo_nombre') }}
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

      <div class="space-y-1">
        <label for="numeroDocumento" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
          {{ t('registro.campo_documento') }}
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

      <div class="space-y-1">
        <label for="telefono" class="text-xs font-semibold text-[#3e4850] tracking-wider uppercase">
          {{ t('registro.campo_telefono') }}
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

    <div class="pt-6 border-t border-[#bec8d1] flex justify-end gap-3">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-8 py-3 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-[#eaeef3] transition-colors"
      >
        {{ t('registro.boton_cancelar') }}
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="px-8 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all shadow-sm disabled:opacity-60"
      >
        {{ isLoading ? t('registro.guardando') : t('registro.boton_guardar') }}
      </button>
    </div>

  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'
import { useTranslate } from '@tolgee/vue'
import type { RegisterClienteDto } from '../../../services/cliente.service'

const props = defineProps<{ isLoading: boolean }>()
const emit = defineEmits<{
  submit: [dto: RegisterClienteDto]
  cancel: []
}>()

const { t } = useI18n()
const { t: tolgeeT } = useTranslate()

const form = reactive<RegisterClienteDto>({
  nombreCompleto: '',
  numeroDocumento: '',
  telefono: ''
})

const rules = {
  nombreCompleto: {
    required: helpers.withMessage(() => tolgeeT.value('validacion.nombre.requerido'), required),
    minLength: helpers.withMessage(() => tolgeeT.value('validacion.nombre.minimo'), minLength(2)),
    maxLength: helpers.withMessage(() => tolgeeT.value('validacion.nombre.maximo'), maxLength(50)),
    formato: helpers.withMessage(
      () => tolgeeT.value('validacion.nombre.formato'),
      helpers.regex(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ0-9'\-.,"#&\s]+$/)
    )
  },
  numeroDocumento: {
    required: helpers.withMessage(() => tolgeeT.value('validacion.documento.requerido'), required),
    minLength: helpers.withMessage(() => tolgeeT.value('validacion.documento.minimo'), minLength(7)),
    maxLength: helpers.withMessage(() => tolgeeT.value('validacion.documento.maximo'), maxLength(10)),
    formato: helpers.withMessage(
      () => tolgeeT.value('validacion.documento.formato'),
      helpers.regex(/^\d{7,10}$/)
    )
  },
  telefono: {
    required: helpers.withMessage(() => tolgeeT.value('validacion.telefono.requerido'), required),
    minLength: helpers.withMessage(() => tolgeeT.value('validacion.telefono.minimo'), minLength(7)),
    maxLength: helpers.withMessage(() => tolgeeT.value('validacion.telefono.maximo'), maxLength(15)),
    formato: helpers.withMessage(
      () => tolgeeT.value('validacion.telefono.formato'),
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