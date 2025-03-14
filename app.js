let inpName = document.getElementById("inpName");
let inpAge = document.getElementById("inpAge");
let inpSpecies = document.getElementById("inpSpecies");
let inpJob = document.getElementById("inpJob");
let inpDesc = document.getElementById("inpDesc");
let submit = document.getElementById("submit");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

submit.addEventListener("click", function () {
  localStorage.setItem("tempName", inpName.value);
  localStorage.setItem("tempAge", inpAge.value);
  localStorage.setItem("tempSpecies", inpSpecies.value);
  localStorage.setItem("tempJob", inpJob.value);
  localStorage.setItem("tempImg");
});
