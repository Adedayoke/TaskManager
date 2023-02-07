'use script';

const enter = document.querySelector('.enter')
const add = document.querySelector('.add')
const none = document.querySelector('.none')
const your = document.querySelector('.your')
const inside = document.querySelector('.inside')
const tasks = document.querySelector('.tasks')
const overlay = document.querySelector('.overlay')
const suc = document.querySelector('.suc')
const ted2 = document.querySelector('.ted2')
const ted = document.querySelector('.ted')
const whole = document.querySelector('.whole')
const add2 = document.querySelector('.search')
const adds = document.querySelector('.adds')
const amend = document.querySelector('.amend')
const contact = add2.lastChild
const dateNow = new Date();

let dataValue = 0;
let dataValue2 = 0;
let control = function(){
    const task = `
    <div class="eachTask " data-index = ${dataValue}>
        <div class="first1"><p class="ent">${enter.value}</p>
            <p class="first2">${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}</p>
        </div>
        <div class="times">
            <img src="/edit2.png" alt="" class="edit2">
            <img class ="bin" src="/trash.png" alt="">
        </div>
    </div>`;
    const read = `<button class="rem">Edit Task</button>`
    const amendment = `
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
    const orig = `<button class="add">Add Task</button>`
    dataValue++;
    whole.insertAdjacentHTML("beforeend", task)
    enter.value = ''
    inside.classList.add('bod')
    setTimeout(() => {ted.classList.remove('non')}, 500);
    setTimeout(() => {ted.classList.add('non')}, 1000);
    const binAll = document.querySelectorAll('.bin');
    let currentBtn;
    binAll.forEach((bin) => {
        bin.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            // const parentVal = bin.parentElement.parentElement.dataset.index
            // enter.value = parentVal
            // .Remove()  or .RemoveChild() ...
            currentBtn = bin.parentElement.parentElement;
            overlay.classList.remove('none')
            amend.classList.remove('non')
            amend.innerHTML = amendment
            const yes = document.querySelector('.yes')
            const no = document.querySelector('.no')
            const shadow = document.querySelector('.shadow')
            const time = document.querySelector('.time')
            yes.addEventListener('click', () => {
                currentBtn.remove();
                setTimeout(() => {suc.classList.remove('non')}, 500);
                setTimeout(() => {suc.classList.add('non')}, 1000)
                shadow.remove()
                overlay.classList.add('none')
                amend.classList.add('non')
            })
            no.addEventListener('click', function(){
                shadow.remove()
                overlay.classList.add('none')
                amend.classList.add('non')
            })
            time.addEventListener('click', function(){
                shadow.remove()
                overlay.classList.add('none')
                amend.classList.add('non')
            })
        })
    })
    const editAll = document.querySelectorAll('.edit2');
    editAll.forEach((edit) => {
        edit.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            currentBtn = edit.parentElement.parentElement;
            const reach = currentBtn.querySelector('.ent')
            enter.value = reach.textContent
            add.remove();
            adds.innerHTML = read
            const rem = document.querySelector('.rem')
            reach.classList.add('extra')
            rem.addEventListener('click', function(){
                reach.textContent = enter.value
                rem.remove();
                adds.innerHTML = orig
                const adding = document.querySelector('.add')
                adding.addEventListener('click', function(){
                    if(enter.value !== ''){
                        control();
                    }
                })
                ted.textContent = 'Task has been edited successfully'
                enter.value = ''
                setTimeout(() => {ted.classList.remove('non')}, 500);
                setTimeout(() => {ted.classList.add('non')}, 1000); 
                reach.classList.remove('extra') 
            })
        })
    })
}
add.addEventListener('click', function(){
    if(enter.value !== ''){
        control();
    }
})