<template>
  <div class="container">
    <h1>Count Books API</h1>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-else-if="count === null">Loading...</p>
    <template v-else>
      <p>Number of books: <strong>{{ count }}</strong></p>
      <pre>{{ JSON.stringify({ count }, null, 2) }}</pre>
    </template>
    <button type="button" class="btn btn-primary" @click="getBookCount">Refresh</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { countBooksUrl } from '../api/functions.js'

const count = ref(null)
const error = ref(null)

// Calls the countBooks Cloud Function.
const getBookCount = async () => {
  error.value = null
  try {
    const response = await axios.get(countBooksUrl)
    count.value = response.data.count
  } catch (err) {
    console.error('Error fetching book count: ', err)
    error.value = 'Could not fetch the book count.'
  }
}

onMounted(() => {
  getBookCount()
})
</script>
