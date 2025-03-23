let main = document.getElementById("main");
let adOff = document.getElementById("adOff");
let adSample = document.getElementById("adSample");
let popUp = document.getElementById("popUp");
let detailedDesc = document.getElementById("detailedDesc");
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
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
      display += `      <div class="characterPreview" data-id=${doc.id}>
        <img class="descContainer" src="${doc.data().img}" data-desc="${
        doc.data().desc
      }"/>
        <div class="charStatName">
          <p class="charName">Tên</p>
          <p class="charAge">Tuổi</p>
          <p class="charGender">Giới</p>
          <p class="charJob">Nghề</p>
        </div>
        <div class="charInfo">
          <p class="charName">${doc.data().name}</p>
          <p class="charAge">${doc.data().age}</p>
          <p class="charGender">${doc.data().gender}</p>
          <p class="charJob">${doc.data().job}</p>
        </div>
      </div>`;
    });
    // Load đống dữ liệu ra
    main.innerHTML = display;
    addImgThing();
  })
  .catch((error) => alert(error));

// Ấn vào hiện desc

function addImgThing() {
  let allEntries = document.querySelectorAll(".characterPreview");
  allEntries.forEach((cell) => {
    cell.addEventListener("click", async function () {
      let charID = this.getAttribute("data-id");
      let docRef = doc(db, "data", charID);
      try {
        let snap = await getDoc(docRef);
        if (snap.exists()) {
          detailedDesc.style.display = "flex";
          detailedDesc.innerHTML = `
          <div id="charLeftOver">
            <img src="${snap.data().img}" alt="" />
            <table>
              <tr>
                <th>Tên</th>
                <td>${snap.data().name}</td>
              </tr>
              <tr>
                <th>Tuổi</th>
                <td>${snap.data().age}</td>
              </tr>
              <tr>
                <th>Giới tính</th>
                <td>${snap.data().gender}</td>
              </tr>
              <tr>
                <th>Công việc</th>
                <td>${snap.data().job}</td>
              </tr>
            </table>
            <button id="closeDetail">Thoát trang thông tin</button>
          </div>
          <div id="charRightOver">
            <h2>1. Ngoại hình</h2>
            <p>${snap.data().desc1}</p>
            <h2>2. Tính cách</h2>
            <p>${snap.data().desc2}</p>
            <h2>3. Cuộc đời</h2>
            <p>${snap.data().desc3}</p>
          </div>`;

          document
            .getElementById("closeDetail")
            .addEventListener("click", function () {
              detailedDesc.style.display = "none";
            });
        } else {
          alert("Không tìm thấy nhân vật!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    });
  });
}

setTimeout(function () {
  popUp.style.display = "block";
  adSample.addEventListener("click", function () {
    window.location.href = "https://anchorguitars.nicepage.io/";
  });
}, 2000);

adOff.addEventListener("click", function () {
  popUp.style.display = "none";
});

let beg = document.getElementById("beg");
let qr = document.getElementById("QR");
let cre = document.getElementById("cre");
let qrState = false;

beg.addEventListener("click", function () {
  if (!qrState) {
    qr.style.display = "block";
    cre.style.display = "block";
    beg.innerText = "Không ủng hộ nữa";
    qrState = true;
  } else if (qrState) {
    qr.style.display = "none";
    cre.style.display = "none";
    beg.innerText = "Ủng hộ nhà phát triển Web!";
    alert(">:(");
    qrState = false;
  }
});
