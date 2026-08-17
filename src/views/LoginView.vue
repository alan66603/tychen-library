<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login, VALID_USERNAME, VALID_PASSWORD } from '../auth'

const router = useRouter()
const route = useRoute()

const credentials = ref({
  username: '',
  password: ''
})

const error = ref(null)

const handleLogin = () => {
  if (login(credentials.value.username, credentials.value.password)) {
    error.value = null
    // Return the user to whatever they were trying to reach, or the
    // members area if they came here directly.
    router.push(route.query.from || '/about')
  } else {
    error.value = 'Incorrect username or password.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <h1 class="text-center">Member Login</h1>
        <p class="text-center text-muted">Sign in to reach the members area.</p>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="login-username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="login-username"
              v-model="credentials.username"
            />
          </div>

          <div class="mb-3">
            <label for="login-password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="login-password"
              v-model="credentials.password"
            />
          </div>

          <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Log in</button>
          </div>
        </form>

        <p class="text-center text-muted mt-4 small">
          Demo credentials: <code>{{ VALID_USERNAME }}</code> / <code>{{ VALID_PASSWORD }}</code>
        </p>
      </div>
    </div>
  </div>
</template>
