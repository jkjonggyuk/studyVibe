const nameForm = document.querySelector(".name-form"),
    nameInput = nameForm.querySelector("input");
const todoForm = document.querySelector(".todo-form"),
    todoInput = todoForm.querySelector("input");
const studyVideo = document.querySelector(".study-video"),
    studyVideoFrame = studyVideo.querySelector("iframe"),
    toggleVideoButton = studyVideo.querySelector(".toggleVideo-button");

function updateTime() {
    const date = new Date(); 
    let hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();

    const currentDate = document.getElementById("current-date");
    const currentTime = document.getElementById("current-time");

    ampm = true;
    ampmText = "AM";
    if (ampm === true) {
        if ((hour / 12) > 0) {
            ampmText = "PM";
            hour = hour % 12;
            if (hour === 0) {
                hour = 12;
            }
        }
    }

    currentDate.innerText = `${(month+1) + "/" + dayOfMonth}`
    currentTime.innerText = `${(hour < 10) ? "0" + hour : hour}:${(minute < 10) ? "0" + minute : minute}:${(second < 10) ? "0" + second : second}${(ampm === true) ? " " + ampmText : ""}`;
}

function getName() {
    const userName = localStorage.getItem("userName");
    const nameForm = document.querySelector(".name-form");
    const userNameText = document.getElementById("user-name");
    if (userName === null) {
        nameForm.classList.add('showing');
    } else {
        nameForm.classList.remove('showing');
        userNameText.innerText = userName;
    }
}

function saveName(event) {
    localStorage.setItem("userName", nameInput.value);
}

function toggleVideo(event) {
    if (studyVideoFrame.classList.contains('hidden')) {
        studyVideoFrame.classList.remove('hidden');    
    } else {
        studyVideoFrame.classList.add('hidden');
    }
}

function saveTodo(event) {
    event.preventDefault();

    const todoItem = localStorage.getItem("todoItem");
    let todoList = [];
    if (todoItem !== null) {
        todoList = JSON.parse(todoItem);
    }

    const newId = todoList.length + 1;
    const newTodo = {id: newId, item: todoInput.value};
    todoList.push(newTodo);
    localStorage.setItem("todoItem", JSON.stringify(todoList));
    todoInput.value = "";
    getTodo();
}

function getTodo() {
    const studyList = document.querySelector(".study-todoList");
    studyList.innerHTML = "";

    const todoItem = localStorage.getItem("todoItem");
    let todoList = [];
    if (todoItem !== null) {
        todoList = JSON.parse(todoItem);
    }

    todoList.forEach(function(todo) {
        const li = document.createElement("li");
        li.innerText = todo.item;
        li.id = todo.id;
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", deleteTodo);
        li.appendChild(deleteButton);
        studyList.appendChild(li);
    });
}

function deleteTodo(event) {
    const removeId = parseInt(event.target.parentNode.id);
    let newId = 0;

    const todoItem = localStorage.getItem("todoItem");
    let todoList = [];
    let newList = [];
    if (todoItem !== null) {
        todoList = JSON.parse(todoItem);
    }
    const listLength = todoList.length;
    for (i = 0; i < listLength; i++){
        const shiftItem = todoList.shift();
        if (shiftItem.id !== removeId) {
            shiftItem.id = newId;
            newId += 1;
            newList.push(shiftItem);
        }
    }
    localStorage.setItem("todoItem", JSON.stringify(newList));

    getTodo();
}

function init() {
    setInterval(updateTime, 1000);
    getName();
    getTodo();
    nameForm.addEventListener('submit', saveName);
    todoForm.addEventListener('submit', saveTodo);
    toggleVideoButton.addEventListener('click', toggleVideo);
}

init();