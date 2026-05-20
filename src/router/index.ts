import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { public: true }
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../views/CallbackView.vue'),
      meta: { public: true }
    },
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { public: false },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'clientes/registro',
          name: 'registro-cliente',
          component: () => import('../modules/clientes/views/RegisterClienteView.vue'),
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.public) return true

  const authStore = useAuthStore()
  if (authStore.isLogged) return true

  const { useAuth0 } = await import('@auth0/auth0-vue')
  const auth0 = useAuth0()

  // Esperar a que Auth0 termine de cargar
  if (auth0.isLoading.value) {
    await new Promise<void>((resolve) => {
      const unwatch = auth0.isLoading
      const interval = setInterval(() => {
        if (!unwatch.value) {
          clearInterval(interval)
          resolve()
        }
      }, 50)
    })
  }

  if (auth0.isAuthenticated.value) {
    const token = await auth0.getAccessTokenSilently()
    authStore.setSession(token, {
      sub: auth0.user.value?.sub ?? '',
      email: auth0.user.value?.email ?? ''
    })
    return true
  }

  return { name: 'login' }
})

export default router