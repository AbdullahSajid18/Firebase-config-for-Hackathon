import {
    storage, ref, uploadBytesResumable, doc,
    db, getDoc, auth, onAuthStateChanged, getDownloadURL, setDoc
} from "../firebaseConfig.js"



let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let oldPassword = document.getElementById('oldPassword')
let password = document.getElementById('password')
let repeatPassword = document.getElementById('repeatPassword')
let profilePicture = document.getElementById('profilePicture')
let updateProfile = document.getElementById('updateProfile')


updateProfile.addEventListener('click', editProfileHandler)

function editProfileHandler() {
    console.log(firstName.value, lastName.value, email.value, profilePicture.files[0], "edit button working properly")


    const file = profilePicture.files[0]


    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                await setDoc(doc(db, "users", currentLoggedInUser), {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    profilePicture: downloadURL
                });
            });
        }
    );
}