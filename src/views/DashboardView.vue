<template>
  <div class="flex items-center justify-center h-full p-8">
    <p class="text-[#3e4850]">{{ t('dashboard.bienvenida') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>