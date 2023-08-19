import{ auth, app, db, createUserWithEmailAndPassword, doc, setDoc} from '../firebaseConfig.js'

// SignUp Inputs

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let password = document.getElementById('password')
let repeatPassword = document.getElementById('repeatPassword')

// signupbtn

let signupbtn = document.getElementById('signupbtn')

console.log(signupbtn);

async function signupHandler() {
    if(password.value == repeatPassword.value){
        try{
            let response = await createUserWithEmailAndPassword(auth, email.value, password.value)
            // console.log(response, 'user found')
            alert('User Registered')
    
            if(response.user){
                addData(response.user.uid)
            }
        }catch (error) {
           let errorMessage = error.message;
           console.log(errorMessage)
        }
    }else{
       return alert("plz type same pass in both field")
    }
    
};

async function addData(uid){
   try{
      let docRef = await setDoc(doc(db , "users", uid), {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        id : uid
      });

      console.log('Document written with ID:');
    }catch (e){
        console.error('Error adding document', e);
    }
}
signupbtn.addEventListener('click',signupHandler);

