import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase , set , ref,get} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
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
const db = getDatabase(app);
let name = document.getElementById("name")
let email = document.getElementById("email")
let rollNo = document.getElementById("rollNo")
let btn = document.getElementById("btn")
let password = document.getElementById("password")
let getroll = document.getElementById("getroll")
let gete = document.getElementById("gete")
let answer = document.getElementById("answer")
function add(name,email , rollNo, password){
 set(ref(db,"Users/"+ rollNo.value),{
    Name:name.value,
    Email:email.value,
    RollNumber:rollNo.value,
    Password:password.value
 })
 .then(()=>{
    console.log("data saved")
 })
 .catch((error)=>{
  console.log("❌ Error: " + error)
 })
}
btn.addEventListener("click",()=>{
    add(name,email,rollNo,password)
})
function getdata(){
    const userdata = ref(db,"Users/"+getroll.value);
    get(userdata).then((snapshot)=>{
        if(snapshot.exists()){

        let data = snapshot.val()
        answer.innerHTML =`
        Name : ${data.Name}<br>
        Email:${data.Email}<br>
        RollNumber:${data.RollNumber}<br>
        Password:${data.Password}
        `
        }
    })
}
gete.addEventListener("click",()=>{
    getdata()
})
console.log("good")
