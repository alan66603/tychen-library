// Firebase is initialised here, in its own module, so that any file which
// imports `auth` is guaranteed the app already exists. (ES imports run before
// the body of main.js, so initialising there would be too late for modules
// that call getAuth() at load time.)
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMqY9oaeennUOex_-SDiwh_VUOzud4Wlc',
  authDomain: 'fit5032-67dd3.firebaseapp.com',
  projectId: 'fit5032-67dd3',
  storageBucket: 'fit5032-67dd3.firebasestorage.app',
  messagingSenderId: '13738866384',
  appId: '1:13738866384:web:c8b5dd15f90d1a75b390d5'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
export default db
