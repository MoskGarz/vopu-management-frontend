import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth0 } from './plugins/auth0'
import { tolgee, VueTolgee } from './plugins/tolgee'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(auth0)
app.use(router)
app.use(VueTolgee, { tolgee })
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    autoHideBadge: false
  }
})

app.mount('#app')
