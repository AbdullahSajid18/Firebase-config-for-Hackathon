import {auth, app, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc} from './firebaseConfig.js'

let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');

// buttons
let loginBtn = document.getElementById('loginBtn');



function loginHandler() {

signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user){
        window.location.href ='./dashboard/index.html';
    }
    alert("user logged in")
  })
  .catch((error) => {
      const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage)
    alert("user not found")
  });
};

loginBtn.addEventListener('click',loginHandler);

// signup

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let signEmail = document.getElementById('signEmail');
let signPassword = document.getElementById('signPassword');
let phoneNumber = document.getElementById('phoneNumber');
let dateTime = document.getElementById('dateTime');

// buttons
let signupBtn = document.getElementById('signupBtn');

async function signUpnHandler() {
    try {
    const response =  await createUserWithEmailAndPassword(auth, signEmail.value, signPassword.value)

   alert("user registered")
   
   if(response.user){
        adddata(response.user.uid)


}
  }
 catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage)
    
}};


async function adddata(uid){
    try {
        const docRef = await setDoc(doc(db, "users", uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: signEmail.value,
            password: signPassword.value,
            phnNumber : phoneNumber.value,
            dOB : dateTime.value,
            id : uid     
        });

        // console.log(firstName,lastName,signEmail,signPassword,dateTime);
        console.log("Document written with ID: ", docRef.uid);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

signupBtn.addEventListener('click',signUpnHandler);
