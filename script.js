let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
    
  }
  // check button
  if (e.target.classList.contains("check")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Toggle Done Class
    e.target.parentElement.classList.toggle("done");
  }
});


function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let span0 =document.createElement("span")
    span0.textContent = `${task.title}`
    span0.style.width ="500px"
    div.appendChild(span0);
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";

    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash-can");

    span.appendChild(deleteIcon);
    ///create check button
    let span2 = document.createElement("span");
    span2.className = "check";

    let checkIcon = document.createElement("i");
    checkIcon.setAttribute("class", "fa-solid fa-check");

    span2.appendChild(checkIcon);
    //////create edit button
    let span3 = document.createElement("span");
    span3.className = "edit";

    let editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fa-solid fa-pen");

    span3.appendChild(editIcon);
    // Append Button To  Div
    div.appendChild(span);
    div.appendChild(span2);
    div.appendChild(span3);
    
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);

      function newFunction() {
          console.log(document.createTextNode(task.title));
      }
  });
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}


function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
