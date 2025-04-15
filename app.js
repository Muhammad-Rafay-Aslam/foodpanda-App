import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXUWaGH4tCeFTV8nr6kecC17MDXVXAcF8",
  authDomain: "foodpanda-a51f3.firebaseapp.com",
  projectId: "foodpanda-a51f3",
  storageBucket: "foodpanda-a51f3.firebasestorage.app",
  messagingSenderId: "167064113035",
  appId: "1:167064113035:web:03ac52539e939592c0a98e",
  measurementId: "G-NFT43XD10Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (location.pathname.endsWith('userSignup.html') || location.pathname.endsWith('userLogin.html')) {
      location.href = './userDashboard.html'
    }
    if(location.pathname.endsWith('adminLogin.html') || location.pathname.endsWith('adminSignup.html')){
      location.href = './adminDashboard.html'
    }
    const uid = user.uid;
    console.log(uid.email)
  } else {
    // ...
  }
});

let getsignUpBtn = document.getElementById('s-Btn')
if (getsignUpBtn) {
  getsignUpBtn.addEventListener('click', () => {
    let email = document.getElementById('semail')
    let password = document.getElementById('spassword')
    let UserName = document.getElementById('sname')
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          title: "Sign up Successfully!",
          text: `congrats ${user.email}`,
          icon: "success"
        });
        console.log(user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  })
}

let getLoginBtn = document.getElementById('l-Btn')
if (getLoginBtn) {
  getLoginBtn.addEventListener('click', () => {
    let email = document.getElementById('lemail')
    let password = document.getElementById('lpassword')
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          title: "Login Successfully!",
          text: `congrats ${user.email}`,
          icon: "success"
        });
        console.log(user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credential",
        });
        console.log(errorCode, errorMessage)
      });
  })
}