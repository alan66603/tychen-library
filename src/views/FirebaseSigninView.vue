<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { getRole } from '../firebaseAuth'

const email = ref('')
const password = ref('')
const router = useRouter()

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('Firebase Sign in Successful!')
            console.log(auth.currentUser) //To check the current User signed in
            console.log('Signed in as', data.user.email, 'with role:', getRole(data.user.email))
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code)
        })
}
</script>
