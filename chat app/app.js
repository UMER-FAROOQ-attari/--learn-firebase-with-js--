// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

// Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// ✅ Config (Corrected storageBucket)
const firebaseConfig = {
  apiKey: "AIzaSyASJMggxbUcQ15Qd5FJ0WaSzfX05agJbao",
  authDomain: "learn-fairebase-fe48b.firebaseapp.com",
  databaseURL: "https://learn-fairebase-fe48b-default-rtdb.firebaseio.com",
  projectId: "learn-fairebase-fe48b",
  storageBucket: "learn-fairebase-fe48b.appspot.com",
  messagingSenderId: "673280035319",
  appId: "1:673280035319:web:a8033301dd1b83221286f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
  const email = searchInput.value.trim();
  if(!email) return alert("User email enter karo");

  const q = query(collection(db, "users"), where("email", "==", email));
  const snap = await getDocs(q);

  if(snap.empty){
    return alert("User nahi mila ❌");
  }

  let userObj = snap.docs[0].data();
  openChatWith(userObj);
});

/* --------- DOM elements --------- */
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authArea = document.getElementById("authArea");
const userInfo = document.getElementById("userInfo");
const meName = document.getElementById("meName");

const usersList = document.getElementById("usersList");
const chatWith = document.getElementById("chatWith");
const messagesEl = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

let currentUser = null;
let activeChatWith = null;
let unsubscribeMessages = null;

/* --------- Auth actions --------- */
signupBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if (!name || !email || !pass) return alert("Name, email and password required");

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;
    // save user profile in Firestore
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      uid,
      createdAt: serverTimestamp()
    });
    nameInput.value = "";
    emailInput.value = "";
    passInput.value = "";
  } catch (err) {
    alert("Signup error: " + err.message);
  }
});

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if (!email || !pass) return alert("Email and password required");
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    alert("Login error: " + err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

/* --------- On auth state change --------- */
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (user) {
    // show user info and users list
    authArea.classList.add("hidden");
    userInfo.classList.remove("hidden");
    meName.textContent = `Me: ${user.email}`;
    loadUsers();
  } else {
    authArea.classList.remove("hidden");
    userInfo.classList.add("hidden");
    usersList.innerHTML = "";
    messagesEl.innerHTML = "";
    chatWith.textContent = "Select a user to chat";
    if (unsubscribeMessages) unsubscribeMessages();
  }
});

/* --------- Load all other users (simple list) --------- */
async function loadUsers() {
  usersList.innerHTML = "<li>Loading...</li>";
  
  const snap = await getDocs(collection(db, "users"));
  usersList.innerHTML = "";

  snap.forEach(d => {
    const u = d.data();
    if (u.uid === currentUser.uid) return;
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="name">${u.name || u.email}</div>
      <div class="email">${u.email}</div>
    `;
    li.addEventListener("click", () => openChatWith(u));
    usersList.appendChild(li);
  });

  if (!snap.size) usersList.innerHTML = "<li>No users found</li>";
}
/* --------- Open chat with user --------- */
function openChatWith(userObj) {
  activeChatWith = userObj;
  chatWith.textContent = `Chat with ${userObj.name || userObj.email}`;
  messagesEl.innerHTML = "";
  messageForm.classList.remove("hidden");

  // unsubscribe previous listener
  if (unsubscribeMessages) unsubscribeMessages();

  const chatId = makeChatId(currentUser.uid, userObj.uid);
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp"));

  // realtime listener
  unsubscribeMessages = onSnapshot(q, snapshot => {
    messagesEl.innerHTML = "";
    snapshot.forEach(doc => {
      const m = doc.data();
      const li = document.createElement("li");
      li.classList.add("message");
      li.classList.add(m.senderId === currentUser.uid ? "me" : "other");
      li.innerHTML = `<div class="msg-text">${escapeHtml(m.text)}</div>
                      <div class="msg-meta">${m.senderName ? escapeHtml(m.senderName) : ""} • ${m.timestamp ? new Date(m.timestamp.toDate()).toLocaleTimeString() : ""}</div>`;
      messagesEl.appendChild(li);
    });
    // scroll to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

/* --------- Send message --------- */
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text || !activeChatWith) return;
  const chatId = makeChatId(currentUser.uid, activeChatWith.uid);
  const messagesRef = collection(db, "chats", chatId, "messages");
  try {
    await addDoc(messagesRef, {
      text,
      senderId: currentUser.uid,
      senderName: currentUser.email,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  } catch (err) {
    console.error("Send error:", err);
  }
});

/* --------- Helpers --------- */
function makeChatId(a, b) {
  // deterministic id: sort uids so A-B and B-A are same
  return [a, b].sort().join("_");
}

function escapeHtml(text) {
  if (!text) return "";
  return text.replaceAll("&", "&amp;")
             .replaceAll("<", "&lt;")
             .replaceAll(">", "&gt;")
             .replaceAll('"', "&quot;")
             .replaceAll("'", "&#039;");
}
