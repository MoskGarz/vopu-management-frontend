import { ref } from 'vue'
import clienteService from '../services/cliente.service'
import type { RegisterClienteDto } from '../services/cliente.service'

export function useClientes() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  async function registerCliente(dto: RegisterClienteDto) {
    loading.value = true
    error.value = null
    success.value = false
    try {
      await clienteService.registerCliente(dto)
      success.value = true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'error.desconocido'
    } finally {
      loading.value = false
    }
  }

  return { loading, error, success, registerCliente }
}