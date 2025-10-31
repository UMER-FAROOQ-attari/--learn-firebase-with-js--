// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase Config
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
const auth = getAuth(app);

// Signup Button Function
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  let emailEl = document.getElementById("email");
  let passwordEl = document.getElementById("password");

  let email = emailEl.value;
  let password = passwordEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Created:", userCredential.user.uid);
      alert("Account Successfully Created ✅");
    })
    .catch((error) => {
      alert(error.message);
    });

  emailEl.value = "";
  passwordEl.value = "";
});

console.log("good");

let btn1 = document.getElementById("btn1");
btn1.addEventListener("click", () => {
  let emailEl = document.getElementById("email");
  let passwordEl = document.getElementById("password");

  let email = emailEl.value;
  let password = passwordEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Login:", userCredential.user.uid);
      alert("Login Successful ✅");
    })
    .catch((error) => {
      alert(error.message);
    });

  emailEl.value = "";
  passwordEl.value = "";
});
