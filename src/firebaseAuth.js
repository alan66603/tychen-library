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
// instance of the Firebase authentication state.
const firebaseUser = ref(null)
const firebaseRole = computed(() => getRole(firebaseUser.value?.email))
const isFirebaseAuthenticated = computed(() => firebaseUser.value !== null)

// Firebase tells us whenever the signed-in user changes (sign in, sign out,
// page reload restoring a session), so the header stays in sync.
onAuthStateChanged(auth, (user) => {
  firebaseUser.value = user
})

const firebaseSignOut = () => signOut(auth)

export { ROLES, getRole, firebaseUser, firebaseRole, isFirebaseAuthenticated, firebaseSignOut }
