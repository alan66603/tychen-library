import { ref, computed } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'

// Roles are derived from the email address for this exercise: any account
// whose local part starts with "admin" is an admin, everyone else is a user.
// A real app would store the role server-side (e.g. in Firestore or as a
// custom claim) rather than trusting the email.
const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

const getRole = (email) => {
  if (!email) return null
  const localPart = email.split('@')[0].toLowerCase()
  return localPart.startsWith('admin') ? ROLES.ADMIN : ROLES.USER
}

// Module-level refs, so every component that imports them shares one
// instance of the authentication state.
const currentUser = ref(null)
const currentRole = computed(() => getRole(currentUser.value?.email))
const isAuthenticated = computed(() => currentUser.value !== null)

// Firebase restores a persisted session asynchronously after page load, so
// the router guard has to wait for the first onAuthStateChanged callback
// before deciding whether the user is signed in. `authReady` resolves once
// that has happened; the listener keeps running afterwards to track sign
// in / sign out.
const authReady = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    resolve()
  })
})

const logout = () => signOut(auth)

export { ROLES, getRole, currentUser, currentRole, isAuthenticated, authReady, logout }
