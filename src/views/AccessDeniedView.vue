<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2 text-center">
        <h1>Access Denied</h1>
        <p class="lead">
          <span v-if="route.query.from">
            <code>{{ route.query.from }}</code> is for members only.
          </span>
          <span v-else>That page is for members only.</span>
        </p>
        <p>Please log in to continue.</p>

        <router-link to="/login" class="btn btn-primary me-2">Go to login</router-link>
        <router-link to="/" class="btn btn-secondary">Back to home</router-link>
      </div>
    </div>
  </div>
</template>
