import { VueReCaptcha } from 'vue-recaptcha-v3'

export const recaptcha = {
  install: VueReCaptcha,
  options: {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    loaderOptions: { autoHideBadge: true }
  }
}