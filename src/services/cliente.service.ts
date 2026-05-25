import api from './api'

export interface RegisterClienteDto {
  nombreCompleto: string
  numeroDocumento: string
  telefono: string
}

async function registerCliente(dto: RegisterClienteDto, recaptchaToken: string): Promise<void> {
  await api.post('/api/v1/clientes', {
    nombre_completo: dto.nombreCompleto,
    numero_documento: dto.numeroDocumento,
    telefono: dto.telefono,
    recaptcha_token: recaptchaToken
  })
}

export default { registerCliente }