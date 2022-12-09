let appTitle = document.getElementById("heading")
let noti = document.getElementById("notification")
let title = document.getElementById("title-input")
let notes = document.getElementById("notes-input")
let saveBtn = document.getElementById("save-btn")
let display = document.getElementById("display-notes")
let empty_notes = document.getElementsByClassName("empty-notes")

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
        let todo = {
            Title: title.value,
            Notes: notes.value
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
        </div>
      `
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

}

// editing note
function editTodo(index) {
    saveBtn.innerText = "Update"
    let saved_index = index
    let webTask = TodoList
    title.value = webTask[saved_index].Title
    notes.value = webTask[saved_index].Notes
}









/*



let todo = {
                    Title: title.value,
                    Notes: notes.value
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



*/