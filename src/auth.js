import { ref, computed } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './firebase/init'

// Each user has a document in the `users` collection, keyed by their Firebase
// Auth uid, that stores their role. Roles live in Firestore rather than on
// the client so they can be changed (e.g. promoting a user to admin) without
// touching the code.
const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

const USERS_COLLECTION = 'users'

// Module-level refs, so every component that imports them shares one
// instance of the authentication state.
const currentUser = ref(null)
const currentRole = ref(null)
const isAuthenticated = computed(() => currentUser.value !== null)

/**
 * Create the Firestore profile for a newly registered user.
 * @param user {import('firebase/auth').User}
 * @param role {string} one of ROLES
 */
const createUserProfile = (user, role) =>
  setDoc(doc(db, USERS_COLLECTION, user.uid), {
    email: user.email,
    role,
    createdAt: serverTimestamp()
  })

/**
 * Read the role stored for a uid. Falls back to USER when no profile
 * document exists (e.g. an account created before roles were added).
 * @param uid {string}
 * @returns {Promise<string>}
 */
const fetchRole = async (uid) => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid))
  return snapshot.exists() ? snapshot.data().role : ROLES.USER
}

// Firebase restores a persisted session asynchronously after page load, so
// the router guard has to wait for the first onAuthStateChanged callback
// before deciding whether the user is signed in. `authReady` resolves once
// that has happened; the listener keeps running afterwards to track sign
// in / sign out.
const authReady = new Promise((resolve) => {
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user
    currentRole.value = user ? await fetchRole(user.uid) : null
    resolve()
  })
})

const logout = () => signOut(auth)

export {
  ROLES,
  currentUser,
  currentRole,
  isAuthenticated,
  authReady,
  createUserProfile,
  fetchRole,
  logout
}
