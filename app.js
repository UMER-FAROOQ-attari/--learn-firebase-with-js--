  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getDatabase ,set , get , ref } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyASJMggxbUcQ15Qd5FJ0WaSzfX05agJbao",
    authDomain: "learn-fairebase-fe48b.firebaseapp.com",
    projectId: "learn-fairebase-fe48b",
    storageBucket: "learn-fairebase-fe48b.firebasestorage.app",
    messagingSenderId: "673280035319",
    appId: "1:673280035319:web:a8033301dd1b83221286f2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getDatabase(app)
  console.log(db);
  function writeuserData(userID, name , email){
    set(ref(db,"users/"+userID),{
      name:name,
      email:email
    })
  }
  writeuserData(923095889026 ,"abubaker","bakkermian@gmail.com")
  function readdata(){
    const userRef = ref(db,"users");
    get(userRef).then((snapshot)=>{
      snapshot.forEach((chaidsnapshot)=>{
        console.log(snapshot.val())
      })
    })
  }
  readdata()
  console.log("good")
  const auth = getAuth(app)
  function signupUser(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth,email,password).then((usercerdintial)=>{
    console.log(usercerdintial.user.uid);
  })
  }

//  const signUp = document.getElementById("signup")

