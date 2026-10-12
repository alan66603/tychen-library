<template>
  <pre>{{ output }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getAllBooksUrl } from '../api/functions.js'

const output = ref('Loading...')

// Calls the getAllBooks Cloud Function and shows the raw JSON it returns.
onMounted(async () => {
  try {
    const response = await axios.get(getAllBooksUrl)
    output.value = JSON.stringify(response.data, null, 2)
  } catch (err) {
    console.error('Error fetching books: ', err)
    output.value = JSON.stringify({ error: 'Could not fetch books' }, null, 2)
  }
})
</script>
