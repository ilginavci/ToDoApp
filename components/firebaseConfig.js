// firebaseConfig.js

// Firebase SDK'larından ihtiyaç duyduğunuz fonksiyonları içe aktarın
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase konfigürasyon nesnesi
const firebaseConfig = {
  apiKey: "AIzaSyBbkS4vYkKdoXOE9P4XkycEe6An58xcATQ",
  authDomain: "noteapp-a2278.firebaseapp.com",
  projectId: "noteapp-a2278",
  storageBucket: "noteapp-a2278.appspot.com",
  messagingSenderId: "240439370118",
  appId: "1:240439370118:web:9477d1ae14e1add659cc07",
  measurementId: "G-3LE6JRHM1M"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase hizmetlerine erişim sağlayın
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase veritabanını ve oturum durumu değişkenlerini dışa aktarın
export { app, db, auth};
