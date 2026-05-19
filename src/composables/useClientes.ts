import { ref } from 'vue'
import clienteService from '../services/cliente.service'
import type { RegisterClienteDto } from '../services/cliente.service'
import axios from 'axios'

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
      if (axios.isAxiosError(e) && e.response?.data?.detail?.messages?.[0]) {
        error.value = e.response.data.detail.messages[0]
      } else if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'error.desconocido'
      }
    }
     finally {
      loading.value = false
    }
  }

  return { loading, error, success, registerCliente }
}