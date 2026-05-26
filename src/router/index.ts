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

  console.log('AUTH STORE', {
    isLogged: authStore.isLogged,
    token: authStore.token
  })

  if (authStore.isLogged || authStore.token) {
  return true
  }

  return { name: 'login' }
})

export default router