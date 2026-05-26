import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth0 } from './plugins/auth0'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { i18n } from './i18n'
import router from './router'
import App from './App.vue'
import './style.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(auth0)
app.use(router)

app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    autoHideBadge: false
  }
})
app.use(i18n)

app.mount('#app')
