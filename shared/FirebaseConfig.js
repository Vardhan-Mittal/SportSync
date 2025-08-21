// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"; // Import Fi
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQaFn9fW4xM7hZSwfm98RBfDhemmvVjvU",
  authDomain: "find-player-b556a.firebaseapp.com",
  projectId: "find-player-b556a",
  storageBucket: "find-player-b556a.firebasestorage.app",
  messagingSenderId: "386142995209",
  appId: "1:386142995209:web:653f44a898a8624f9609d8",
  measurementId: "G-2HVVYQQW9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;
// const analytics = getAnalytics(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app); 
export { app, db }; // Export db
// export default app;
// export default db;
export { analytics }