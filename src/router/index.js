import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseLogoutView from '../views/FirebaseLogoutView.vue'
import { isAuthenticated, authReady } from '../auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: FirebaseRegisterView
  },
  {
    path: '/signin',
    name: 'Signin',
    component: FirebaseSigninView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: FirebaseLogoutView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard: routes flagged with requiresAuth are members only.
// Wait for Firebase to restore any persisted session first, otherwise a
// page reload on /about would always be treated as signed out.
// Returning a location object cancels the navigation and redirects.
router.beforeEach(async (to) => {
  await authReady
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'AccessDenied', query: { from: to.fullPath } }
  }
})

export default router
