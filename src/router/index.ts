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
      path: '/',
      name: 'dashboard',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { public: false }
    },
    {
        path: '/callback',
        name: 'callback',
        component: () => import('../views/CallbackView.vue'),
        meta: { public: true }
    },
    {
      path: '/clientes/registro',
      name: 'registro-cliente',
      component: () => import('../modules/clientes/views/RegisterClienteView.vue'),
      meta: { public: false }
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (!to.meta.public && !authStore.isLogged) {
    return { name: 'login' }
  }
})

export default router