<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, currentUser, logout } from '../auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!-- Members only: log in when signed out, log out when signed in. -->
        <li v-if="isAuthenticated" class="nav-item d-flex align-items-center">
          <span class="nav-link text-muted">Signed in as {{ currentUser }}</span>
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="handleLogout">
            Log out
          </button>
        </li>
        <li v-else class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
