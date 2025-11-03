import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyASJMggxbUcQ15Qd5FJ0WaSzfX05agJbao",
    authDomain: "learn-fairebase-fe48b.firebaseapp.com",
    databaseURL: "https://learn-fairebase-fe48b-default-rtdb.firebaseio.com",
    projectId: "learn-fairebase-fe48b",
    storageBucket: "learn-fairebase-fe48b.firebasestorage.app",
    messagingSenderId: "673280035319",
    appId: "1:673280035319:web:a8033301dd1b83221286f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", async () => {
    let input = document.getElementById("input");
    let taske = document.getElementById("taske");

    try {
        const docRef = await addDoc(collection(db, "taskes"), {
            item: input.value,
            task: taske.value
        });
        console.log("Document written with ID: ", docRef.id);

        input.value = "";
        taske.value = ""

        read();

    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

let read = async () => {
    let list = document.getElementById("list");
    list.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "taskes"));
    querySnapshot.forEach((doc) => {
        list.innerHTML += ` <li>${doc.data().item} : ${doc.data().task}
        <button onclick="deleteData('${doc.id}')">Delet</button>
    <button onclick="editData('${doc.id}', '${doc.data().item}', '${doc.data().task}')" id="editbtn">Edit</button>
    </li>`;
    });
}
read();
async function deleteData(e) {
    await deleteDoc(doc(db, "taskes", e));
    read()
}
window.deleteData = deleteData

async function editData(id, olditem, oldtask) {
    let input = document.getElementById("input");
    let taske = document.getElementById("taske");
    let addbtn = document.getElementById("addbtn");
  input.value=olditem;
    taske.value=oldtask;
    addbtn.innerText = "Update"
   
   addbtn.onclick=async()=>{
    await updateDoc(doc(db,"taskes",id),{
        item:input.value,
        task:taske.value
    })
     addbtn.innerText = "Add";
        input.value = "";
        taske.value = "";

        read();
   }  
}
window.editData = editData
