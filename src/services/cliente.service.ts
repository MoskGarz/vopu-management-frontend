import api from './api'

export interface RegisterClienteDto {
  nombreCompleto: string
  numeroDocumento: string
  telefono: string
}

async function registerCliente(dto: RegisterClienteDto): Promise<void> {
  await api.post('/clientes', dto)
}

export default { registerCliente }