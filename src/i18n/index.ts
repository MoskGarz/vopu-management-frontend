import { createI18n } from 'vue-i18n'

import esStatic from './static/es.json'
import enStatic from './static/en.json'

import esDynamic from './dynamic/es.json'
import enDynamic from './dynamic/en.json'

export const i18n = createI18n({
  legacy: false,

  locale: 'es',

  fallbackLocale: 'es',

  messages: {
    es: {
      ...esStatic,
      ...esDynamic
    },

    en: {
      ...enStatic,
      ...enDynamic
    }
  }
})