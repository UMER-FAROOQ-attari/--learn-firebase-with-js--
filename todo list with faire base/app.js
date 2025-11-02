import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore,collection, addDoc ,getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js  ";
const firebaseConfig = {
    apiKey: "AIzaSyASJMggxbUcQ15Qd5FJ0WaSzfX05agJbao",
    authDomain: "learn-fairebase-fe48b.firebaseapp.com",
    databaseURL: "https://learn-fairebase-fe48b-default-rtdb.firebaseio.com",
    projectId: "learn-fairebase-fe48b",
    storageBucket: "learn-fairebase-fe48b.firebasestorage.app",
    messagingSenderId: "673280035319",
    appId: "1:673280035319:web:a8033301dd1b83221286f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let addbtn = document.getElementById("addbtn") ;
addbtn.addEventListener("click", async()=>{
    let input = document.getElementById("input")
try {
  const docRef = await addDoc(collection(db, "taskes"), {
 item:input.value
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

})