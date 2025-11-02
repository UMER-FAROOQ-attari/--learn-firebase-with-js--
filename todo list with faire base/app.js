import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs ,doc, deleteDoc , updateDoc, deleteField} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

    try {
        const docRef = await addDoc(collection(db, "taskes"), {
            item: input.value
        });
        console.log("Document written with ID: ", docRef.id);

        input.value = "";

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
        list.innerHTML += `<li>${doc.data().item}
        <button onclick="deleteData('${doc.id}')">Delet</button>
    <button onclick='editData()'>Edit</button>
    </li>`;
    });
}
read();
async function deleteData(e){
await deleteDoc(doc(db, "taskes", e));
read()
}
window.deleteData = deleteData
async function editData(e){
    const cityRef = doc(db, 'taskes', e);

await updateDoc(cityRef, {
    capital: deleteField()
});

}