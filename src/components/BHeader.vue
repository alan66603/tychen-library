<script setup>
import { currentUser, currentRole, isAuthenticated } from '../auth'
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
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <!-- Firebase auth: register / sign in when signed out, show the
             user's email and role plus a log out link when signed in. -->
        <template v-if="isAuthenticated">
          <li class="nav-item d-flex align-items-center">
            <span class="nav-link text-muted">
              {{ currentUser.email }}
              <span class="badge" :class="currentRole === 'admin' ? 'text-bg-danger' : 'text-bg-secondary'">
                {{ currentRole }}
              </span>
            </span>
          </li>
          <li class="nav-item">
            <router-link to="/logout" class="nav-link" active-class="active">Log out</router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signin" class="nav-link" active-class="active">Sign in</router-link>
          </li>
        </template>
      </ul>
    </header>
  </div>
</template>
