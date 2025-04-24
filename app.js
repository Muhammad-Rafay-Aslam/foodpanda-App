import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, deleteField, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

let getusersignUpBtn = document.getElementById('us-Btn')
if (getusersignUpBtn) {
  getusersignUpBtn.addEventListener('click', () => {
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
      }).then(() => {
        location.href = './userLogin.html'
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  })
}

let getuserLoginBtn = document.getElementById('ul-Btn')
if (getuserLoginBtn) {
  getuserLoginBtn.addEventListener('click', () => {
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
        location.href = './userDashboard.html'
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
let getadminsignUpBtn = document.getElementById('as-Btn')
if (getadminsignUpBtn) {
  getadminsignUpBtn.addEventListener('click', () => {
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
      }).then(() => {
        location.href = './adminlogin.html'
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  })
}

let getadminLoginBtn = document.getElementById('al-Btn')
if (getadminLoginBtn) {
  getadminLoginBtn.addEventListener('click', () => {
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

if (getsaveDataBtn) {

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
      }).then((result) => {
        if (result.isConfirmed) {
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
}

async function addData() {
  const querySnapshot = await getDocs(collection(db, "dishes"));
  querySnapshot.forEach((doc) => {
    getCards.innerHTML += ` <div class="card m-2 pt-2" style="width: 22rem;">
  <img src="${doc.data().image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title name">${doc.data().name}</h5>
    <p class="card-text">${doc.data().discription}</p>
    <h5 class="card-title">Price: ${doc.data().price}</h5>
    <div class="continer text-center">
      <a href="#" class="btn btn-primary px-5 " onclick="openEditModal('${doc.id}', '${doc.data().name}', '${doc.data().price}', '${doc.data().discription}', '${doc.data().image}')">Edit</a>
    <a href="#" class="btn btn-danger px-5" onclick="delItem('${doc.id}')">Delete</a>
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
    capital: deleteField()
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

let userCards = document.getElementById('user-cards');

async function readUserDishes() {
  userCards.innerHTML = ""
  const querySnapshot = await getDocs(collection(db, "dishes"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    userCards.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${data.image}" class="card-img-top" alt="${data.name}">
          <div class="card-body">
            <h5 class="card-title name">${data.name}</h5>
            <p class="card-text">${data.discription}</p>
            <h6>Price: Rs ${data.price}</h6>
            <button class="btn btn-danger w-100 mt-2">Order Now</button>
            <button type="button" class="btn btn-warning w-100 mt-2" onclick="addToCart('${doc.id}', '${data.name}', '${data.price}', '${data.discription}', '${data.image}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}
readUserDishes();

window.addToCart = function(id, name, price, image, discription) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push({ id, name, price, image, discription });

  localStorage.setItem('cart', JSON.stringify(cart));

  Swal.fire({
    icon: 'success',
    title: 'Added to Cart',
    text: `${name} ko cart me daal diya!`
  });
};
