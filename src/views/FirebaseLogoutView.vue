<template>
    <h1>Log out</h1>
    <p v-if="isAuthenticated">
        You are signed in as <strong>{{ currentUser.email }}</strong> ({{ currentRole }}).
    </p>
    <p v-else>You are not signed in.</p>
    <p><button @click="handleLogout" :disabled="!isAuthenticated">Sign out via Firebase</button></p>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../firebase/init'
import { currentUser, currentRole, isAuthenticated, logout } from '../auth'

const router = useRouter()

const handleLogout = () => {
    logout()
        .then(() => {
            console.log('Firebase Sign out Successful!')
            console.log(auth.currentUser) // null once signed out
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code)
        })
}
</script>
