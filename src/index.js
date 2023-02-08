import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
'use script';

const enter = document.querySelector('.enter')
const add = document.querySelector('.add')
const tasks = document.querySelector('.tasks')
const dateNow = new Date();
const overlayCont = document.querySelector(".overlayCont")
const overlay = document.querySelector(".overlay")

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
let user = ""

// let dataValue = 0;
// let dataValue2 = 0;
// let taskState = false
// let allTasks = []
// let control = function(){
//     const task = `
//     <div class="eachTask " data-index = ${dataValue}>
//         <div class="first1"><p class="ent">${enter.value}</p>
//             <p class="first2">${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}</p>
//         </div>
//         <div class="times">
//             <img src="./edit2.png" alt="" class="edit2">
//             <img class ="bin" src="./trash.png" alt="">
//         </div>
//     </div>`;
//     const read = `<button class="rem">Edit Task</button>`
//     const amendment = `
//         <div class="shadow">
//             <div class="inq">
//                 <div class="time">&times;</div>
//                 <p class="del">DELETE TASK</p>
//                 <p class="con">ARE YOU SURE YOU WANT TO DELETE THIS TASK ?</p>
//                 <div class="buttons">
//                     <div class="but">
//                         <button class="yes">YES</button>
//                         <button class="no">NO</button>
//                     </div>
//                 </div>
//             </div>
//         </div>`
//     const orig = `<button class="add">Add Task</button>`
//     dataValue++;
//     whole.insertAdjacentHTML("beforeend", task)
//     const TASKS = document.querySelectorAll(".eachTask")
//     allTasks = TASKS
//     if (allTasks.length > 0) {
//         appear.classList.add("none")
//         console.log("hello")
//     }else{
//         appear.classList.remove("none")
//     }
//     enter.value = ''
//     inside.classList.add('bod')
//     setTimeout(() => {ted.classList.remove('non')}, 500);
//     setTimeout(() => {ted.classList.add('non')}, 1000);
//     const binAll = document.querySelectorAll('.bin');
//     let currentBtn;
//     binAll.forEach((bin) => {
//         bin.addEventListener('click', (e) => {
//             e.stopImmediatePropagation();
//             // const parentVal = bin.parentElement.parentElement.dataset.index
//             // enter.value = parentVal
//             // .Remove()  or .RemoveChild() ...
//             console.log(allTasks)
//             currentBtn = bin.parentElement.parentElement;
//             overlay.classList.remove('none')
//             amend.classList.remove('non')
//             amend.innerHTML = amendment
//             const yes = document.querySelector('.yes')
//             const no = document.querySelector('.no')
//             const shadow = document.querySelector('.shadow')
//             const time = document.querySelector('.time')
//             yes.addEventListener('click', () => {
//                 currentBtn.remove();
//                 setTimeout(() => {suc.classList.remove('non')}, 500);
//                 setTimeout(() => {suc.classList.add('non')}, 1000)
//                 shadow.remove()
//                 overlay.classList.add('none')
//                 amend.classList.add('non')
//             })
//             no.addEventListener('click', function(){
//                 shadow.remove()
//                 overlay.classList.add('none')
//                 amend.classList.add('non')
//             })
//             time.addEventListener('click', function(){
//                 shadow.remove()
//                 overlay.classList.add('none')
//                 amend.classList.add('non')
//             })
//         })
//     })
//     const editAll = document.querySelectorAll('.edit2');
//     editAll.forEach((edit) => {
//         edit.addEventListener('click', (e) => {
//             e.stopImmediatePropagation();
//             currentBtn = edit.parentElement.parentElement;
//             const reach = currentBtn.querySelector('.ent')
//             enter.value = reach.textContent
//             add.remove();
//             adds.innerHTML = read
//             const rem = document.querySelector('.rem')
//             reach.classList.add('extra')
//             rem.addEventListener('click', function(){
//                 reach.textContent = enter.value
//                 rem.remove();
//                 adds.innerHTML = orig
//                 const adding = document.querySelector('.add')
//                 adding.addEventListener('click', function(){
//                     if(enter.value !== ''){
//                         control();
//                     }
//                 })
//                 ted.textContent = 'Task has been edited successfully'
//                 enter.value = ''
//                 setTimeout(() => {ted.classList.remove('non')}, 500);
//                 setTimeout(() => {ted.classList.add('non')}, 1000); 
//                 reach.classList.remove('extra') 
//             })
//         })
//     })
// }
// add.addEventListener('click', function(){
//     if(enter.value !== ''){
//         control();
        
//     }
// })
let dataValue = 0;
let allTasks = [];
let editedTask = 0
let taskCont = ""

if(allTasks.length === 0){
    tasks.innerHTML = `<div class="appear">Tasks Appear Here</div>`
}
const addTask = ()=> {
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
const editTask = (editedTask)=>{
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
    yes.onclick = ()=>{
        overlayCont.classList.add("none")
        const newTask = allTasks.filter((task)=>Number(taskCont.dataset.index) !== task.id)
        newTask.forEach(task =>{
            task.id = dataValue
            dataValue++
        })
        allTasks = newTask
        tasks.innerHTML= ""
        addTask()
    }
}
const handleNo = (no)=>{
    no.onclick = ()=>{
        overlayCont.classList.add("none")
    }
}
const deleteFunction =(taskCont) =>{
    const newTask = allTasks.filter((task)=>Number(taskCont.dataset.index) !== task.id)
    newTask.forEach(task =>{
        task.id = dataValue
        dataValue++
    })
    allTasks = newTask
    tasks.innerHTML= ""
    addTask()
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

