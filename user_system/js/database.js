let workers = window.localStorage.getItem('workers')



workers = JSON.parse(workers) || []

window.localStorage.setItem("workers", JSON.stringify(workers))


function generateId(){
    let ids = window.localStorage.getItem("ids") || 0
    ids += 1;
    window.localStorage.setItem("ids", ids)
    return ids
}


function generateDate(){
    let date = new Date()
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
}