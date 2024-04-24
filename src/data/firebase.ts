
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_FIRESTORE_API_KEY
const AUTH_DOMAIN = import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_FIRESTORE_PROJECT_ID
const STORAGE_BUCKET = import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_FIRESTORE_APP_ID
const MEASUREMENT_ID = import.meta.env.VITE_FIRESTORE_MEASUREMENT_ID

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};
  
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app); analytics

const database = getFirestore()

export const productsCollection = collection(database, 'products')
export const ordersCollection = collection(database, 'orders')