import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtV7eYf_o2D6dG1Cjg0wf4uLlZWcEqLLg",
  authDomain: "myawesomeproject-6d9c2.firebaseapp.com",
  databaseURL: "https://myawesomeproject-6d9c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myawesomeproject-6d9c2",
  storageBucket: "myawesomeproject-6d9c2.appspot.com",
  messagingSenderId: "368464392262",
  appId: "1:368464392262:web:3094f8271d47b0fe24da47",
  measurementId: "G-G62TX3XK1V"
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
