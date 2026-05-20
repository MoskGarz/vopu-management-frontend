import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth0 } from './plugins/auth0'
import { tolgee, VueTolgee } from './plugins/tolgee'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(auth0)
app.use(router)
app.use(VueTolgee, { tolgee })

app.mount('#app')
