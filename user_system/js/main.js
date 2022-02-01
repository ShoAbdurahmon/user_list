const form = document.querySelector(".form")
const tbody = document.querySelector("tbody")
const new_user = document.querySelector(".btn-success")
let form_inputs = document.querySelectorAll(".form-control")
let searchUser = document.querySelector(".w-100")
let lis = document.querySelectorAll('.nav-item')


lis[1].firstElementChild.children[1].textContent = workers.length
let active = lis[2].firstElementChild.children[1]
active.textContent = hisoblash()[0]
let select = lis[3].firstElementChild.children[1]
select.textContent = hisoblash()[1]
console.log(lis[2].firstElementChild.children[1].textContent)

function hisoblash(){
    let t = 0
    let arr_t = []
    let c = 0
    let arr_c = []
    for(let i of workers){
        if(i.toggled){
            t += 1
            arr_t.push(i)

        }
    }
    for(let i of workers){
        if(i.checked){
            c += 1
            arr_c.push(i)
        }
    }
    console.log(arr_t, arr_c)
    return [t,c, arr_c, arr_t]
}

let button_edit = document.querySelector(".btn-primary")

function render_worker(workers){
    tbody.innerHTML = null
    let a = 1
    for(let worker of workers){
        

        const [td1, td2, td3, td4, td5, td6,tr] = createElement("td","td","td","td","td","td","tr")
        
        td1.setAttribute("class", "align-middle")
        const [div, input, label] = createElement("div", "input", "label")
        div.classList.add("custom-control" ,"custom-control-inline",  "custom-checkbox", "custom-control-nameless", "m-0", "align-top")
        input.classList.add("custom-control-input")
        input.setAttribute("type", "checkbox") 
        input.setAttribute("id", a)
        input.checked = worker.checked

        label.setAttribute('class', "custom-control-label")
        label.setAttribute("for", a)
        div.append(input, label)
        td1.append(div)
        a += 1;



        td2.classList.add( "text-center")
        const [div2, i] = createElement("div", "i")
        div2.classList.add("bg-light", "d-inline-flex" ,"justify-content-center", "align-items-center" ,"align-top")
        div2.setAttribute("style","width: 35px; height: 35px; border-radius: 3px;")
        i.classList.add("fa", "fa-fw", "fa-photo")
        i.setAttribute("style", "opacity: 0.8;")
        div2.append(i)
        td2.append(div2)
        
        td3.classList.add("text-nowrap","align-middle")
        td3.textContent = worker.workerName

        td4.classList.add("text-nowrap","align-middle")
        const [span] = createElement("span")
        span.textContent = worker.date
        td4.append(span)

        td5.classList.add("align-middle", "text-center")
        const [toggle] = createElement("i")
        if(worker.toggled){
            toggle.classList.add("fa", "fa-fw", "text-secondary", "cursor-pointer", "fa-toggle-on")
        }else{
            toggle.classList.add("fa", "fa-fw", "text-secondary", "cursor-pointer", "fa-toggle-off")
        }
        td5.append(toggle)


        td6.classList.add("align-middle", "text-center")
        const [div6, edit, remove, i6] = createElement("div", "button", "button", "i")
        div6.classList.add("align-middle", "text-center")
        div6.classList.add("btn-group","align-top")
        edit.classList.add("btn" ,"btn-sm", "btn-outline-secondary", "badge")
        edit.setAttribute("type","button")
        edit.setAttribute("data-toggle","modal")
        edit.setAttribute("data-target","#user-form-modal")
        edit.textContent = "Edit"
        remove.classList.add("btn", "btn-sm", "btn-outline-secondary","badge")
        remove.setAttribute("type", "button")
        i6.classList.add("fa", "fa-trash")
        remove.append(i6)
        div6.append(edit, remove)
        td6.append(div6)

        tr.append(td1, td2, td3, td4, td5, td6)
        tbody.append(tr)
        

        edit.onclick = () => {
            let ful_name = form_inputs[2]
            let user_name = form_inputs[3]
            let email = form_inputs[4]
            let bio = form_inputs[5]
            let password = form_inputs[6]

            ful_name.value = worker.workerName
            user_name.value = worker.username
            email.value = worker.email
            bio.value = worker.bio
            password.value = worker.password

            form.onsubmit = (event) => {
                workers[workers.indexOf(worker)].workerName = ful_name.value
                workers[workers.indexOf(worker)].username = user_name.value
                workers[workers.indexOf(worker)].email = email.value
                workers[workers.indexOf(worker)].bio = bio.value
                workers[workers.indexOf(worker)].password = password.value

                window.localStorage.setItem("workers", JSON.stringify(workers))
                render_worker(JSON.parse(window.localStorage.getItem("workers")))
            }
        }

        remove.onclick = () => {
            workers = workers.filter((el) => {
                return el.workerId != worker.workerId
            })
            window.localStorage.setItem('workers', JSON.stringify(workers))
            render_worker(workers)
        }


        input.onclick = () => {
            if(input.checked){
                lis[3].children[0].lastElementChild.textContent = parseInt(lis[3].children[0].lastElementChild.textContent) + 1;
                workers[workers.indexOf(worker)].checked = input.checked
            }else{
                lis[3].children[0].lastElementChild.textContent = parseInt(lis[3].children[0].lastElementChild.textContent) - 1;
                workers[workers.indexOf(worker)].checked = input.checked

            }
            window.localStorage.setItem("workers", JSON.stringify(workers))
        }
        toggle.onclick = (event) => {
            if(event.target.classList[4] == "fa-toggle-on"){
                lis[2].firstElementChild.lastElementChild.textContent = parseInt(lis[2].firstElementChild.lastElementChild.textContent) - 1
                event.target.classList.remove("fa-toggle-on")
                event.target.classList.add("fa-toggle-off")
                workers[workers.indexOf(worker)].toggled = false
                console.log(workers)
                window.localStorage.setItem("workers", JSON.stringify(workers))
                workers = JSON.parse(window.localStorage.getItem("workers"))
                render_worker(workers)
            }else{
                lis[2].firstElementChild.lastElementChild.textContent = parseInt(lis[2].firstElementChild.lastElementChild.textContent) + 1
                event.target.classList.remove("fa-toggle-off")
                event.target.classList.add("fa-toggle-on")
                workers[workers.indexOf(worker)].toggled = true
                console.log(workers)

                window.localStorage.setItem("workers", JSON.stringify(workers))
                workers = JSON.parse(window.localStorage.getItem("workers"))

                render_worker(workers)
                
            }
            
            
        }
        lis[2].onclick = (event) => {
            event.preventDefault()
            render_worker(hisoblash()[3])
        }
        
        lis[3].onclick = (event) => {
            event.preventDefault()
            render_worker(hisoblash()[2])
        }
    }  
    a = 0     
}



new_user.onclick = (event) => {
    let ful_name = form_inputs[2].value
    let user_name = form_inputs[3].value
    let email = form_inputs[4].value
    let bio = form_inputs[5].value
    let password = form_inputs[7].value
    let password1 = form_inputs[8].value

    
    



    form.onsubmit = (event) => {
        let ful_name = form_inputs[2].value
        let user_name = form_inputs[3].value
        let email = form_inputs[4].value
        let bio = form_inputs[5].value
        let password = form_inputs[7].value
        let password1 = form_inputs[8].value
    




        if(ful_name.trim() && user_name.trim() && validation_email(email) && password == password1){
            workers.push({workerId: generateId(),username: user_name, workerName: ful_name, date: generateDate(), email: email, password: password, bio: bio, toggled: true, checked: false})
            window.localStorage.setItem('workers', JSON.stringify(workers))
            worker = window.localStorage.getItem('workers')
            render_worker(workers)
            lis[2].firstElementChild.children[1].textContent = worker.length
            lis[1].firstElementChild.children[1].textContent = workers.length
        }else{
            alert("Error! Form Has Validation Check the inputs")
        }
    }


}





function createElement(...arr){
    return arr.map((el) => {
        return document.createElement(el)
    })
} 



render_worker(workers)


searchUser.onkeyup = (event) => {
    let obj = []
    for(let worker of workers){
        if(worker.workerName.toLowerCase().includes(searchUser.value)){
            obj.push(worker)
        }
    }
    render_worker(obj)
    if(!searchUser.value){
        render_worker(workers)
    }
}


function validation_email(email){
    let pattern = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/
    return pattern.test(email)
}