<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Register</button></p>
    <p class="text-muted small">
        Accounts whose email starts with <code>admin</code> get the admin role; everyone else is a user.
    </p>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { getRole } from '../auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('Firebase Register Successful!')
            console.log('Registered role:', getRole(data.user.email))
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code)
        })
}
</script>
