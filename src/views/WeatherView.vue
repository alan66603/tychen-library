<template>
  <div class="container weather">
    <h1>Weather</h1>

    <form class="d-flex gap-2 mb-3" @submit.prevent="searchByCity">
      <label for="city" class="visually-hidden">City</label>
      <input
        id="city"
        v-model="city"
        type="text"
        class="form-control"
        placeholder='Enter a city, e.g. "Clayton, AU"'
      />
      <button type="submit" class="btn btn-primary">Search</button>
      <button type="button" class="btn btn-outline-secondary text-nowrap" @click="fetchCurrentLocation">
        My location
      </button>
    </form>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="text-danger">{{ error }}</p>

    <div v-else-if="weather" class="card">
      <div class="card-body d-flex align-items-center gap-3">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          :alt="weather.weather[0].description"
          width="100"
          height="100"
        />
        <div>
          <h2 class="h4 mb-1">{{ weather.name }}, {{ weather.sys.country }}</h2>
          <p class="display-6 mb-1">{{ Math.round(weather.main.temp) }} °C</p>
          <p class="mb-0 text-capitalize">{{ weather.weather[0].description }}</p>
          <p class="mb-0 text-muted">
            Feels like {{ Math.round(weather.main.feels_like) }} °C · Humidity {{ weather.main.humidity }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// OpenWeatherMap key, read from .env.local (not committed).
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const city = ref('')
const weather = ref(null)
const loading = ref(false)
const error = ref(null)

// units=metric returns temperatures in Celsius.
const fetchWeather = async (params) => {
  if (!apiKey) {
    error.value = 'Missing VITE_OPENWEATHER_API_KEY in .env.local'
    return
  }
  loading.value = true
  error.value = null
  try {
    const query = new URLSearchParams({ ...params, units: 'metric', appid: apiKey })
    const response = await fetch(`${BASE_URL}?${query}`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || `HTTP ${response.status}`)
    weather.value = data
  } catch (err) {
    console.error('Error fetching weather: ', err)
    weather.value = null
    error.value = `Could not get the weather: ${err.message}`
  } finally {
    loading.value = false
  }
}

const searchByCity = () => {
  if (city.value.trim() === '') return
  fetchWeather({ q: city.value.trim() })
}

const fetchCurrentLocation = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    return
  }
  loading.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude })
    },
    (err) => {
      loading.value = false
      error.value = `Could not get your location: ${err.message}`
    }
  )
}

// Show the weather where the user is as soon as the page opens.
onMounted(() => {
  fetchCurrentLocation()
})
</script>

<style scoped>
.weather {
  max-width: 640px;
}
</style>
