import { ref } from 'vue'

// Hardcoded for this exercise only. A real app would verify credentials
// on a server and never ship them to the browser.
const VALID_USERNAME = 'librarian'
const VALID_PASSWORD = 'Fit5032!'

// Module-level refs, so every component that imports them shares one
// instance of the authentication state.
const isAuthenticated = ref(false)
const currentUser = ref(null)

/**
 * Check the supplied credentials and record the result.
 * @param username {string}
 * @param password {string}
 * @returns {boolean} true when the credentials match.
 */
const login = (username, password) => {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    isAuthenticated.value = true
    currentUser.value = username
    return true
  }
  return false
}

const logout = () => {
  isAuthenticated.value = false
  currentUser.value = null
}

export { isAuthenticated, currentUser, login, logout, VALID_USERNAME, VALID_PASSWORD }
