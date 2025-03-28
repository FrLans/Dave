let inpName = document.getElementById("inpName");
let inpImg = document.getElementById("inpImg");
let inpAge = document.getElementById("inpAge");
let inpGender = document.getElementById("inpGender");
let inpJob = document.getElementById("inpJob");
let inpDesc1 = document.getElementById("inpDesc1");
let inpDesc2 = document.getElementById("inpDesc2");
let inpDesc3 = document.getElementById("inpDesc3");
let main = document.getElementById("main");
let submit = document.getElementById("submit");
let adOff = document.getElementById("adOff");
let popUp = document.getElementById("popUp");
let adSample = document.getElementById("adSample");
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
  apiKey: "AIzaSyCxFoQ4DvRP8mVoyqTVWhaRQfeiCj7rjuo",
  authDomain: "marvindang-a5f32.firebaseapp.com",
  projectId: "marvindang-a5f32",
  storageBucket: "marvindang-a5f32.firebasestorage.app",
  messagingSenderId: "651882168552",
  appId: "1:651882168552:web:55e81de8d1accc35a4495d",
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

// Tải nhân vật mới lên
submit.addEventListener("click", function () {
  if (
    !inpName.value.trim() ||
    !inpImg.value.trim() ||
    !inpAge.value.trim() ||
    !inpGender.value.trim() ||
    !inpJob.value.trim() ||
    !inpDesc1.value.trim() ||
    !inpDesc2.value.trim() ||
    !inpDesc3.value.trim()
  ) {
    alert("Xin hãy nhập đầy đủ dữ liệu về nhân vật");
  } else {
    submit.disabled = true;
    addDoc(collection(db, "data"), {
      img: inpImg.value.trim(),
      name: inpName.value.trim(),
      age: inpAge.value.trim(),
      gender: inpGender.value.trim(),
      job: inpJob.value.trim(),
      desc1: inpDesc1.value.trim(),
      desc2: inpDesc2.value.trim(),
      desc3: inpDesc3.value.trim(),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => alert(error));
  }
});
setTimeout(function () {
  popUp.style.display = "block";
  adSample.addEventListener("click", function () {
    window.location.href = "https://anchorguitars.nicepage.io/";
  });
}, 2000);

adOff.addEventListener("click", function () {
  popUp.style.display = "none";
});

let home = document.getElementById("home");
home.addEventListener("click", function () {
  window.location.href = "./index.html";
});

alert(
  "Trang web này là sản phẩm của cộng đồng, và bất kỳ ai đều có thể đăng bài. Xin đừng đăng nội dung thiếu văn hoá, không phù hợp với chuẩn mực cộng đồng. Nhà phát triển sẽ cố gắng xoá bỏ những nội dung vi phạm, nhưng không thể đảm bảo."
);
