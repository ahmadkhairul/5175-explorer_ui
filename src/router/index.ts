import { createRouter, createWebHistory } from 'vue-router'
import FileExplorer from '@/views/FileExplorerView.vue'
import Login from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isLogin: false },
  },
  {
    path: '/',
    name: 'File Explorer',
    component: FileExplorer,
    meta: {
      isLogin: true, // wajib login
      role: ['admin', 'user'], // role yang diizinkan
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ✅ Guard
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()

  const isAuthenticated = !!auth.token

  const requiresLogin = to.meta.isLogin === true
  const routeRoles = to.meta.role as string[] | undefined

  if (requiresLogin && !isAuthenticated) {
    // Belum login, tapi halaman butuh login
    return next('/login')
  }

  if (!requiresLogin && isAuthenticated && to.path === '/login') {
    // Sudah login tapi buka halaman login
    return next('/')
  }

  if (requiresLogin && routeRoles && auth?.user?.role && !routeRoles.includes(auth.user.role)) {
    // Role tidak sesuai
    return next('/') // atau redirect ke 403 page
  }

  next()
})

export default router
