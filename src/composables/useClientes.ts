import { ref } from 'vue'
import clienteService from '../services/cliente.service'
import type { RegisterClienteDto } from '../services/cliente.service'
import { useMessages } from './useMessages'
import axios from 'axios'

export function useClientes() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const { getMessage } = useMessages()

  async function registerCliente(dto: RegisterClienteDto) {
    loading.value = true
    error.value = null
    success.value = false
    try {
      await clienteService.registerCliente(dto)
      success.value = true
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const messages = e.response?.data?.detail?.messages
        if (messages?.[0]) {
          error.value = messages[0]
        } else if (e.response?.status === 502 || e.response?.status === 503 || !e.response) {
          error.value = await getMessage('error.servicio.no_disponible')
        } else {
          error.value = await getMessage('error.inesperado')
        }
      } else if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = await getMessage('error.inesperado')
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, error, success, registerCliente }
}