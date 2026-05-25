import { Tolgee, DevTools, FormatSimple } from '@tolgee/vue'
export { VueTolgee } from '@tolgee/vue'

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    language: 'es',
    availableLanguages: ['es', 'en'],
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
    staticData: undefined
  })