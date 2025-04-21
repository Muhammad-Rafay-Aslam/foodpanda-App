import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (location.pathname.endsWith('/userSignup.html') || location.pathname.endsWith('/userLogin.html')) {
      location.href = './userDashboard.html'
    }
    if (location.pathname.endsWith('/adminLogin.html') || location.pathname.endsWith('/adminSignup.html')) {
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
        })
        console.log(user.email)
      }).then(() => {
        location.href = './adminDashboard.html'
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

let getadminLogoutBtn = document.getElementById('logout')
getadminLogoutBtn.addEventListener('click', () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "You LogOut",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            window.location.href = './index.html'
          })
        }
      });
    }).catch((error) => {
      console.log(error)
    });
})

let getuserLogoutBtn = document.getElementById('logout')
getuserLogoutBtn.addEventListener('click', () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logging out?",
            text: "Thanks for stopping by. See you again soon!.",
            icon: "success"
          }).then(() => {
            window.location.href = './index.html'
          })
        }
      });
    }).catch((error) => {
      console.log(error)
    });
})

let span = document.getElementById('user-email')
let getName = document.getElementById('name')
let getPrice = document.getElementById('price')
let getdiscription = document.getElementById('dis')
let getImgUrl = document.getElementById('img-url')
let getCards = document.getElementById('cards')
let getsaveDataBtn = document.getElementById('savedata')

getsaveDataBtn.addEventListener('click', async () => {
  getCards.innerHTML = ""
  try {
    const docRef = await addDoc(collection(db, "dishes"), {
      name: getName.value,
      price: getPrice.value,
      discription: getdiscription.value,
      image: getImgUrl.value
    });
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((addDoc) => {
      if (addDoc.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    addData()
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

})

async function addData() {
  const querySnapshot = await getDocs(collection(db, "dishes"));
  querySnapshot.forEach((doc) => {
    getCards.innerHTML += ` <div class="card m-2 pt-2" style="width: 18rem;">
  <img src="${doc.data().image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title name">${doc.data().name}</h5>
    <p class="card-text">${doc.data().discription}</p>
    <h5 class="card-title">Price: ${doc.data().price}</h5>
    <div class="continer text-center">
      <a href="#" class="btn btn-primary " onclick="openEditModal('${doc.id}', '${doc.data().name}', '${doc.data().price}', '${doc.data().discription}', '${doc.data().image}')">Edit</a>
    <a href="#" class="btn btn-danger" onclick="delItem('${doc.id}')">Delete</a>
    </div>
  </div>
  </div>`
    // console.log(`${doc.id} => ${doc.data()}`);
  });

}
addData()

async function delItem(id) {
  getCards.innerHTML = "";
  const cityRef = doc(db, "dishes", id);
  await deleteDoc(cityRef, {
    capital: deleteField();
  });
  addData();
}
window.delItem = delItem;

window.openEditModal = function (id, name, price, discription, image) {
  document.getElementById("editProductId").value = id;
  document.getElementById("editProductName").value = name;
  document.getElementById("editProductPrice").value = price;
  document.getElementById("editProductDesc").value = discription;
  document.getElementById("editProductImage").value = image;

  let editModal = new bootstrap.Modal(document.getElementById("editProductModal"));
  editModal.show();
};

window.saveProductChanges = async function () {
  const id = document.getElementById("editProductId").value;
  const name = document.getElementById("editProductName").value;
  const price = document.getElementById("editProductPrice").value;
  const discription = document.getElementById("editProductDesc").value;
  const image = document.getElementById("editProductImage").value;

  const productRef = doc(db, "dishes", id);

  try {
    await updateDoc(productRef, {
      name,
      price,
      discription,
      image
    });

    Swal.fire({
      title: "Update!",
      text: "Product successfully updated",
      icon: "success"
    });

    getCards.innerHTML = "";
    addData();
    bootstrap.Modal.getInstance(document.getElementById("editProductModal")).hide();

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: error.message,
    });
  }
};
