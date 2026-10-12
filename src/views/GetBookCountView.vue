<template>
  <div class="container">
    <h1>Book Counter</h1>
    <button type="button" class="btn btn-primary" @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null" class="mt-3">Total number of books: {{ count }}</p>
    <p v-if="error" class="mt-3 text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { countBooksUrl } from '../api/functions.js'

const count = ref(null)
const error = ref(null)

// Calls the countBooks Cloud Function (functions/index.js).
const getBookCount = async () => {
  try {
    const response = await axios.get(countBooksUrl)
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count: ', err)
    count.value = null
    error.value = 'error'
  }
}
</script>
