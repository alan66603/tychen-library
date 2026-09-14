import { createApp } from 'vue'
import App from './App.vue'

// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMqY9oaeennUOex_-SDiwh_VUOzud4Wlc',
  authDomain: 'fit5032-67dd3.firebaseapp.com',
  projectId: 'fit5032-67dd3',
  storageBucket: 'fit5032-67dd3.firebasestorage.app',
  messagingSenderId: '13738866384',
  appId: '1:13738866384:web:c8b5dd15f90d1a75b390d5'
}

// Initialize Firebase before the Vue app so getAuth() can find it.
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)

app.mount('#app')
