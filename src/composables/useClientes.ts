import { ref } from 'vue'
import clienteService from '../services/cliente.service'
import type { RegisterClienteDto } from '../services/cliente.service'
import { useReCaptcha } from 'vue-recaptcha-v3'
import axios from 'axios'

export function useClientes() {
  const loading = ref(false)
  const errorKey = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)
  const success = ref(false)
  const recaptcha = useReCaptcha()

  async function registerCliente(dto: RegisterClienteDto) {
    loading.value = true
    errorKey.value = null
    errorMessage.value = null
    success.value = false
    try {
      await recaptcha?.recaptchaLoaded()
      const token = await recaptcha?.executeRecaptcha('register_cliente')
      await clienteService.registerCliente(dto, token ?? '')
      success.value = true
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const messages = e.response?.data?.detail?.messages
        if (messages?.[0]) {
          errorKey.value = messages[0]
        } else if (e.response?.status === 502 || e.response?.status === 503 || !e.response) {
          errorKey.value = 'error.servicio.no_disponible'
        } else {
          errorKey.value = 'error.inesperado'
        }
      } else if (e instanceof Error) {
        errorMessage.value = e.message
      } else {
        errorKey.value = 'error.inesperado'
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, errorKey, errorMessage, success, registerCliente }
}