import { i18n } from '../i18n'

async function getMessage(key: string): Promise<string> {
  return i18n.global.t(key)
}

export function useMessages() {
  return { getMessage }
}