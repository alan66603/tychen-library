<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
        <select v-model="role">
            <option :value="ROLES.USER">User</option>
            <option :value="ROLES.ADMIN">Admin</option>
        </select>
    </p>
    <p><button @click="register">register</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/init'
import { ROLES, createUserProfile } from '../auth'

const email = ref('')
const password = ref('')
// Letting the user pick their own role is only for this exercise; a real
// app would default to USER and have an admin promote accounts.
const role = ref(ROLES.USER)
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => createUserProfile(data.user, role.value))
        .then(() => {
            console.log('Firebase Register Successful!')
            console.log('Registered role:', role.value)
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code)
        })
}
</script>
