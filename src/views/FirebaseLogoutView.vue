<template>
    <h1>Log out</h1>
    <p v-if="isFirebaseAuthenticated">
        You are signed in as <strong>{{ firebaseUser.email }}</strong> ({{ firebaseRole }}).
    </p>
    <p v-else>You are not signed in.</p>
    <p><button @click="logout" :disabled="!isFirebaseAuthenticated">Sign out via Firebase</button></p>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { firebaseUser, firebaseRole, isFirebaseAuthenticated, firebaseSignOut } from '../firebaseAuth'

const router = useRouter()

const logout = () => {
    firebaseSignOut()
        .then(() => {
            console.log('Firebase Sign out Successful!')
            console.log(auth.currentUser) // null once signed out
            router.push('/FireLogin')
        })
        .catch((error) => {
            console.log(error.code)
        })
}
</script>
