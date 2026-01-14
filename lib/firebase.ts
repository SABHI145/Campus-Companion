import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDAFZ3zhZVFI8af6hnF7C-JCoSWkDu9maA",
  authDomain: "campus-companion-dfe0a.firebaseapp.com",
  projectId: "campus-companion-dfe0a",
  storageBucket: "campus-companion-dfe0a.firebasestorage.app",
  messagingSenderId: "617701899892",
  appId: "1:617701899892:web:0d5bf6ee0a640ac62ddb21",
  measurementId: "G-YQ9WZGBT1Z",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)