let inpName = document.getElementById("inpName");
let inpImg = document.getElementById("inpImg");
let inpAge = document.getElementById("inpAge");
let inpSpecies = document.getElementById("inpSpecies");
let inpJob = document.getElementById("inpJob");
let inpDesc = document.getElementById("inpDesc");
let main = document.getElementById("main");
let submit = document.getElementById("submit");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-GXlgXE3_8QUY6CmePkjqJ0NU7U3y8cs",
  authDomain: "dave-6f5f5.firebaseapp.com",
  projectId: "dave-6f5f5",
  storageBucket: "dave-6f5f5.firebasestorage.app",
  messagingSenderId: "631008866389",
  appId: "1:631008866389:web:33969d9c601a2b1d50e4dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Khởi động: Tải danh sách nhân vật lên
getDocs(collection(db, "data"))
  .then((snap) => {
    // Add từng nhân vật vào từ dữ liệu có sẵn
    let display = "";
    snap.forEach((doc) => {
      display += `      <div class="characterPreview">
        <img src="${doc.data().img}" desc="${doc.data().desc}"/>
        <div class="charStatName">
          <p class="charName">Tên</p>
          <p class="charAge">Tuổi</p>
          <p class="charSpecies">Chủng tộc</p>
          <p class="charJob">Công việc</p>
        </div>
        <div class="charInfo">
          <p class="charName">"${doc.data().name}"</p>
          <p class="charAge">"${doc.data().age}"</p>
          <p class="charSpecies">"${doc.data().species}"</p>
          <p class="charJob">"${doc.data().job}"</p>
        </div>
      </div>`;
    });
    // Load đống dữ liệu ra
    main.innerHTML = display;
  })
  .catch((error) => alert(error));

submit.addEventListener("click", function () {
  if (
    !inpName.value.trim() ||
    !inpImg.value.trim() ||
    !inpAge.value.trim() ||
    !inpSpecies.value.trim() ||
    !inpJob.value.trim() ||
    !inpDesc.value.trim()
  ) {
    alert("Xin hãy nhập đầy đủ dữ liệu về nhân vật");
  } else {
    addDoc(collection(db, "data"), {
      img: inpImg.value.trim(),
      name: inpName.value.trim(),
      age: inpAge.value.trim(),
      species: inpSpecies.value.trim(),
      job: inpJob.value.trim(),
      desc: inpDesc.value.trim(),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => alert(error));
  }
});
