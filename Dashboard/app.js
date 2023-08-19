import { auth, db, onAuthStateChanged, signOut, getDoc, doc, collection, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, orderBy, query, where } from "../firebaseConfig.js"


let blogTitleInputField = document.querySelector('#blogTitleInputField')
let blogTextArea = document.querySelector('#blogTextArea')
let publishBtn = document.querySelector('.publishBtn')
let blogContainer = document.querySelector('.blogContainer')
let logoutBtn = document.querySelector('.logoutBtn')
let username = document.querySelector('.loggedInUserName')
let userName = document.getElementById('userName')
let loggedinUserId;
let postIdGlobal;

console.log(blogTextArea, blogTitleInputField, publishBtn, blogContainer)

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        getUserData(uid)
        console.log(uid);
        loggedinUserId = uid
    } else {
        window.location.href = '../HomePage/homePage.html'
    }
});



logoutBtn.addEventListener('click', logoutHandler)
publishBtn.addEventListener('click', storeBlogAndCreateBlogHandler)

function logoutHandler() {
    signOut(auth).then(() => {
        loggedinUserId = ``
        window.location.href = "../index.html.html"
    }).catch((error) => {
        console.error(error)
    });
}

async function getUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { firstName, lastName, emailAddress } = docSnap.data()
        username.innerHTML = `${firstName} ${lastName}`
    } else {
        console.log("No such document!");
    }
    createPost(uid)
}

async function storeBlogAndCreateBlogHandler() {
    if(blogTitleInputField == `` || blogTextArea == ``){
        alert('fill all the fields to continue')
    } else if ((blogTitleInputField.value.length < 5 || blogTitleInputField.value.length > 50) || (blogTextArea.value.length < 100 || blogTextArea.value.length > 3000)) {
        alert(`title lenght should be between 5 - 50 character and blog lenght should be between 100 - 3000 character`)
    } else{
        const docRef = await addDoc(collection(db, "blogs"), {
            BlogContent: blogTextArea.value,
            BlogTitle: blogTitleInputField.value,
            author: loggedinUserId,
            timestamp: serverTimestamp()
        });
        createPost(loggedinUserId)
    }
}



async function createPost(uid) {
    blogContainer.innerHTML = ``;
    // const postsCollectionRef = collection(db, "blogs");

    // Create a query to order the documents by "time" field in descending order
    const sortedQuery = query(collection(db, "blogs"), where("author", "==", uid)); // "desc"
    const querySnapshot = await getDocs(sortedQuery);
    querySnapshot.forEach(async (doc) => {
        let postId = doc.id
        // doc.data() is never undefined for query doc snapshots
        const { BlogContent, BlogTitle, author, timestamp } = doc.data()

        const gettingDataOfUser = await getAuthData(author)
        console.log(gettingUserData)

        let div = document.createElement('div')
        div.setAttribute('class', 'postConatiner postInputContainer my-3')
        div.innerHTML = `<div class="d-flex justify-content-between ">
                    <div class="authorsDetails d-flex align-items-center">
                        <div class="post-header-container d-flex align-items-center">
                            <div class="image">
                                <img src=${gettingUserOfData.profilePicture || "../dummy.jpeg"}
                                    alt="" class="img-fluid rounded mx-auto d-block">
                            </div>
                            <div class="username-id ms-2">
                                <h4 class="mb-1 blogTitle" style="color: #868686;">
                                    ${BlogTitle}</h4>
                                <div class="d-flex align-items-center justify-content-center">
                                    <h6 class="mb-1 username">${gettingDataOfUser.firstName} ${getiingDataOfUser.lastName}</h6>
                                    <h6 class="mb-0 ms-2">${moment(timestamp.toDate()).fromNow()}</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle"
            type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" onclick="editPostHandler('${postId}')">Edit</a></li>
                <li><a class="dropdown-item" onclick="deletePostHandler('${postId}')">Delete</a></li>
                </ul>
                </div>
                </div>
                <div class="blogDetails">
                    <p id="post-text" class="mt-2">${BlogContent}</p>
                </div>`
        blogContainer.prepend(div)
        blogTitleInputField.value = ""
        blogTextArea.value = ""
    });
}

async function getAuthData(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}

async function editPostHandler(postId) {
    console.log("edit btn working", "==>", postId)
    postIdGlobal = postId

    let title = prompt('enter title')
    let blog = prompt('enter blog')

    const washingtonRef = doc(db, "blogs", postIdGlobal);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
        BlogContent: blog,
        BlogTitle: title,
        author: loggedinUserId,
        timestamp: serverTimestamp()
    });

    createPost(loggedinUserId)

    const blogData = getBlogForEdit(postIdGlobal)
    blogTextArea.value = blogData.BlogContent;
    blogTitleInput.value = blogData.BlogTitle;

    publishBtn.removeEventListener('click', storeBlogAndCreateBlogHandler);
    publishBtn.addEventListener('click', editPostHandler)

}

async function deletePostHandler(postId) {
    let confirmDelete = prompt('If you want to delete data type yes')
    console.log(confirmDelete)
    let lowerCase = confirmDelete.toLowerCase()
    console.log(lowerCase)
    if(lowerCase.includes('yes')){
        try {
            await deleteDoc(doc(db, "blogs", postId));
            alert("Your post has been deleted");
            createPost(loggedinUserId);
        } catch (error) {
            console.log(error);
        }
    } else{
        return
    }

}


async function getBlogForEdit(postId){
    const docRef = doc(db, "blogs", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

window.editPostHandler = editPostHandler;
window.deletePostHandler = deletePostHandler;