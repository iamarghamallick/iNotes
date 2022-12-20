let appTitle = document.getElementById("heading")
let noti = document.getElementById("notification")
let title = document.getElementById("title-input")
let notes = document.getElementById("notes-input")
let saveBtn = document.getElementById("save-btn")
let display = document.getElementById("display-notes")
let count = document.getElementById("notes_count")
let input_field = document.getElementById("input_field")
let empty_notes = document.getElementsByClassName("empty-notes")
let input_content = document.getElementById("input-content")
let add_new = document.getElementById("add-new")

add_new.addEventListener('click', () => {
    if (input_content.style.display == "flex") {
        input_content.style.display = "none"
        add_new.innerHTML = `Add New <i class="fa fa-angle-down"></i>`
    }
    else {
        input_content.style.display = "flex"
        add_new.innerHTML = `Add New <i class="fa fa-angle-up"></i>`
    }
})

// Adding local storage items
const getLocalStorageData = () => {
    if (localStorage.getItem("TODOs") == null) {
        return []
    } else {
        return JSON.parse(localStorage.getItem("TODOs"))
    }
};

// Adding notes
let TodoList = getLocalStorageData();

// save notes button
saveBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (title.value == "") {
        appTitle.style.display = "none"
        noti.style.display = "block"
        noti.innerText = "Couldn't save the empty Note!"
        setTimeout(() => {
            appTitle.style.display = "block"
            noti.style.display = "none"
        }, 3000)
    }
    else {
        let d = new Date()
        let saving_time = `Saved on ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        let todo = {
            Title: title.value,
            Notes: notes.value,
            Time: saving_time
        }
        TodoList.push(todo)
        localStorage.setItem("TODOs", JSON.stringify(TodoList))
        showtodo()

        saveBtn.innerText = "Save"

        appTitle.style.display = "none"
        noti.style.display = "block"
        noti.innerText = `${title.value} has been saved in your browser's local storage!`
        setTimeout(() => {
            appTitle.style.display = "block"
            noti.style.display = "none"
        }, 5000)

        title.value = ""
        notes.value = ""
    }
})

// Showimg ToDo items
function showtodo() {
    let todos = ""
    for (index = 0; index < TodoList.length; index++) {
        let TitleContent = TodoList[index].Title
        let NotesContent = TodoList[index].Notes
        let SavingTime = TodoList[index].Time
        todos += `
        <div class="show-items">
            <div id="saved-title">
                <h3>${TitleContent}</h3>
                <i class="fa fa-trash" onclick="removeTodo(${index})"></i>
            </div>
            <div id="saved-notes">
                <p>${NotesContent}</p>
                <i class='far fa-edit' onclick="editTodo(${index})"></i>
            </div>
            <div id="saved-time">
                <h6>${SavingTime}</h6>
            </div>
        </div>
      `
        count.innerText = TodoList.length
    }
    if (TodoList.length == 0) {
        display.innerHTML = "No saved Notes found!"
    } else {
        display.innerHTML = todos
    }
}
showtodo()

//deleting note
function removeTodo(index) {
    appTitle.style.display = "none"
    noti.style.display = "block"
    noti.innerText = `${TodoList[index].Title} has been deleted from your browser's local storage!`
    setTimeout(() => {
        appTitle.style.display = "block"
        noti.style.display = "none"
    }, 5000)
    TodoList.splice(index, 1)
    localStorage.setItem("TODOs", JSON.stringify(TodoList))
    showtodo();
    count.innerText = TodoList.length
}

// editing note
function editTodo(index) {
    saveBtn.innerText = "Update"
    let saved_index = index
    let webTask = TodoList
    title.value = webTask[saved_index].Title
    notes.value = webTask[saved_index].Notes
    input_content.style.display = "flex"
}
