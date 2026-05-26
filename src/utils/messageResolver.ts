import { i18n } from '../i18n'

export function resolveMessage(message?: string | null): string {
  if (!message) return ''

  return i18n.global.t(message)
}