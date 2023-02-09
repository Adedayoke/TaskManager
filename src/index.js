import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {getFirestore, doc, setDoc, updateDoc, arrayUnion, getDoc} from 'firebase/firestore';
'use script';

const enter = document.querySelector('.enter')
const add = document.querySelector('.add')
const tasks = document.querySelector('.tasks')
const dateNow = new Date();
const overlayCont = document.querySelector(".overlayCont")
const overlay = document.querySelector(".overlay")
const loginCont = document.querySelector(".loginCont")
const signupCont = document.querySelector(".signupCont")
const name = document.querySelectorAll(".name")
const userName = document.querySelectorAll(".userName")
const error = document.querySelector(".error")
const ham = document.querySelector(".ham")


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnrAVV_IgpsF0dkx5i8Hi-uRKQzf60wu0",
  authDomain: "task-manager-72d57.firebaseapp.com",
  projectId: "task-manager-72d57",
  storageBucket: "task-manager-72d57.appspot.com",
  messagingSenderId: "909616744551",
  appId: "1:909616744551:web:e25f4e66eaad06c7796cc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
let currentuser;
currentuser = JSON.parse(localStorage.getItem("currentuser"))
let savedUser = {}


// localStorage.setItem('user', JSON.stringify(user))
// localStorage.setItem('num', JSON.stringify(number))


let dataValue = 0;
let allTasks=[]
let myTasks = [];
const baseData = []
let editedTask = 0
let taskCont = ""


window.onload = async()=>{
    checkuser()
    if(currentuser){
        updateData()
        
    }
}


const updateData = async ()=>{
    
    const docRef = doc(db, "users", currentuser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            allTasks = docSnap.data().allTasks
            if(allTasks.length === 0){
                tasks.innerHTML = `<div class="appear">Tasks Appear Here</div>`
            }
            addTask()
        } else {
        // doc.data() will be undefined in this case
    }   
}

const addTask = async()=> {
    if (currentuser){
            await setDoc(doc(db, "users", currentuser.uid), {allTasks})
            for (let i = 0; i < allTasks.length; i++) {
                const task = allTasks[i];
                tasks.insertAdjacentHTML('beforeend',
                `<div class="eachTask " data-index = ${i}>
                <div class="first1"><p class="ent">${task.taskName}</p>
                <p class="first2">${task.date}</p>
                </div>
                <div class="times">
                <img src="./edit2.png" alt="" class="edit2">
                <img class ="bin" src="./trash.png" alt="">
                </div>
                </div>`)
                const binAll = document.querySelectorAll('.bin');
                const editAll = document.querySelectorAll('.edit2');
                binFunction(binAll)
                editFunction(editAll)
            
        }
    }
    else{
        signupCont.classList.remove("none")
    }
}

const editTask = (editedTask)=>{
    // console.log(number)
    allTasks.forEach((task)=>{
        if (task.id === editedTask){
            task.taskName = enter.value
            task.date = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`
            tasks.innerHTML= ""
            addTask() 
        }
    })
    add.textContent = "Add Task"
}
const binFunction = (binAll)=>{
    binAll.forEach((bin) => {
        bin.onclick = (e) => {
            e.stopImmediatePropagation()
            overlayCont.classList.remove("none")
            overlay.innerHTML = `
                   <div class="shadow">
                       <div class="inq">
                           <div class="time">&times;</div>
                           <p class="del">DELETE TASK</p>
                           <p class="con">ARE YOU SURE YOU WANT TO DELETE THIS TASK ?</p>
                           <div class="buttons">
                               <div class="but">
                                   <button class="yes">YES</button>
                                   <button class="no">NO</button>
                               </div>
                            </div>
                        </div>
                    </div>`
            dataValue = 0
            taskCont = bin.parentElement.parentElement
            handleYes(document.querySelector(".yes"))
            handleNo(document.querySelector(".no"))
        }
    })
}
const handleYes = (yes)=>{
    yes.onclick = async()=>{
        overlayCont.classList.add("none")
        const newTask = allTasks.filter((task)=>Number(taskCont.dataset.index) !== task.id)
        newTask.forEach(task =>{
            task.id = dataValue
            dataValue++
        })
        allTasks = newTask
        await updateDoc(doc(db, "users", currentuser.uid), {allTasks})
        tasks.innerHTML= ""
        addTask()
    }
}
const handleNo = (no)=>{
    no.onclick = ()=>{
        overlayCont.classList.add("none")
    }
}
const editFunction = (editAll) => {
    editAll.forEach((edit) => {
        edit.onclick = (e) => {
            e.stopImmediatePropagation()
            taskCont = edit.parentElement.parentElement
            const newTask = allTasks.find((task)=>Number(taskCont.dataset.index) === task.id)
            enter.value = newTask.taskName
            editedTask = Number(taskCont.dataset.index)
            add.textContent = "Edit Task"
        }
    })
}
add.onclick = (e)=>{
    e.stopImmediatePropagation();
    if(add.textContent !== "Edit Task"){
        allTasks.push({taskName: enter.value, date: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`, id: dataValue})
        tasks.innerHTML = ""
        addTask()
        enter.value = ""
        dataValue++
    }else{
        editTask(editedTask)
        enter.value = ""
    }
}
window.onkeydown = ({key})=>{
    if(key === "Enter"){
        if(add.textContent !== "Edit Task"){
            allTasks.push({taskName: enter.value, date: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`, id: dataValue})
            tasks.innerHTML = ""
            addTask()
            enter.value = ""
            dataValue++
        }else{
            editTask(editedTask)
            enter.value = ""
        }
    }
}



// Login and sign up functions
const signupForm = document.querySelector(".signupForm")
const loginForm = document.querySelector(".loginForm")
const logins = document.querySelectorAll(".only-login")
const signin = document.querySelectorAll(".btn-login")
const signups = document.querySelectorAll(".only-signup")
const signup = document.querySelectorAll(".btn-signup")
let email = "";
let password = "";
const signout = document.querySelectorAll(".btn-logout")
const loginwithgoogle = document.querySelector(".--btn-danger")

logins.forEach((login)=>{
    login.onclick =()=>{
        loginCont.classList.remove("none")
        signupCont.classList.add("none")
    }
})
signups.forEach((signup)=>{
    signup.onclick =()=>{
        signupCont.classList.remove("none")
        loginCont.classList.add("none")
    }
})

signupForm.onsubmit = (e)=>{
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input')
    email = inputs[0].value
    password= inputs[1].value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    //Signed in 
    const user = userCredential.user;
    localStorage.setItem('currentuser', JSON.stringify(user))
    currentuser = JSON.parse(localStorage.getItem("currentuser"))
    signupCont.classList.add("none")
    loginCont.classList.add("none")
    checkuser()
    //...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    error.classList.remove("transformer")
    setTimeout(() => {
        error.classList.add("transformer")
    }, 1500);
    //..
    });
}
loginForm.onsubmit = (e)=>{
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input')
    email = inputs[0].value
    password= inputs[1].value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    //Signed in 
    const user = userCredential.user;
    localStorage.setItem('currentuser', JSON.stringify(user))
    currentuser = JSON.parse(localStorage.getItem("currentuser"))
    signupCont.classList.add("none")
    loginCont.classList.add("none")
    checkuser()
    //...
    })
    .catch((eror) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log(errorMessage)
    error.classList.remove("transformer")
    setTimeout(() => {
        error.classList.add("transformer")
    }, 1500);
    //..
    });
}
signout.forEach((out)=>{
    out.onclick=()=>{
        signOut(auth).then(() => {
            const user = null
            // Sign-out successful.
            localStorage.setItem('currentuser', JSON.stringify(user))
            currentuser = JSON.parse(localStorage.getItem("currentuser"))
            loginCont.classList.remove("none")
            checkuser()
            
          }).catch((error) => {
            // An error happened.
          });
    }
})
//Auth
console.log(currentuser)
const checkuser = ()=>{
    if(currentuser){
        name.forEach((nam)=>{
            nam.classList.remove("none")
        })
        userName.forEach((nam)=>{
            nam.textContent = (currentuser.email.substring(0, currentuser.email.indexOf("@"))).charAt(0).toUpperCase() + currentuser.email.substring(0, currentuser.email.indexOf("@")).slice(1)
        })
        signin.forEach((gnin)=>{
            gnin.classList.add("none")
        })
        signout.forEach((out)=>{
            out.classList.remove("none")
        })
        signup.forEach((up)=>{
            up.classList.add("none")
        })
    }
    else{
        signin.forEach((gnin)=>{
            gnin.classList.remove("none")
        })
        signout.forEach((out)=>{
            out.classList.add("none")
        })
        signup.forEach((up)=>{
            up.classList.remove("none")
        })
    }
}
ham.onclick = ()=>{
    ham.classList.toggle('rotate')
    document.querySelector('.btns2').classList.toggle('hamTrans')
}
// sign in with google
// const provider = new GoogleAuthProvider();
// const signInWithGoogle = async()=>{
//     await signInWithPopup(auth, provider)
//     .then((result) => {
//         const user = result.user;
//         localStorage.setItem('currentuser', JSON.stringify(user))
//         currentuser = JSON.parse(localStorage.getItem("currentuser"))
//         signupCont.classList.add("none")
//         loginCont.classList.add("none")
//         checkuser()
        
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode)
//     });
// }
// loginwithgoogle.onclick = () => signInWithGoogle()