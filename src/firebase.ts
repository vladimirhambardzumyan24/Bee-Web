// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOlJnMcOmZHhYpHNQYYpzJiEGqPhwnhUU',
  authDomain: 'bee-web-5fe17.firebaseapp.com',
  databaseURL: 'https://bee-web-5fe17-default-rtdb.firebaseio.com',
  projectId: 'bee-web-5fe17',
  storageBucket: 'bee-web-5fe17.appspot.com',
  messagingSenderId: '651837342955',
  appId: '1:651837342955:web:e7780ae1170719b1b2aaae'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth()
