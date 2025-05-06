import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIXk_jZ3tqc5yRti3TMY1C-ojCrjsiEDE",
  authDomain: "smartled-5d29e.firebaseapp.com",
  databaseURL: "https://smartled-5d29e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartled-5d29e",
  storageBucket: "smartled-5d29e.firebasestorage.app",
  messagingSenderId: "784771224159",
  appId: "1:784771224159:web:66df9f75df36353788c1ea",
  measurementId: "G-3FYKGLG078"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function setLedStatus(status) {
  set(ref(database, "led/status"), status);
}

export function listenLedStatus(callback) {
  const ledStatusRef = ref(database, "led/status");
  onValue(ledStatusRef, (snapshot) => {
    const status = snapshot.val();
    callback(status); 
  });
}