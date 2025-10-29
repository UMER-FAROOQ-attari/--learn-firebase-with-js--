  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js'

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
    const auth = getAuth(app)
  function signupUser(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth,email,password).then((usercerdintial)=>{
    console.log(usercerdintial.user.uid);
  })
  }
  const signup = document.getElementById("signup");
  signup.addEventListener("click",signupUser)

   function signInUser(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth,email,password).then((usercerdintial)=>{
    console.log(usercerdintial.user.uid);
  })
  }
  const signin = document.getElementById("sign_in");
  signin.addEventListener("click",signInUser)  
   
 