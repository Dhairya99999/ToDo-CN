
//Selecting all the elements

const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearButton = document.getElementById("clearButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");



//adding event listeners to add and clear tasks
addButton.addEventListener("click", addTask);
completeAllButton.addEventListener("click", toggleAllCompleted);
clearButton.addEventListener("click", clearAllTasks);



//adding event listener for enter key
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});


//function to add the task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="check">&#10003;</span>
      <span class="completedTask">${taskText}</span>
      <span class="delete">X</span>
    `;
    taskList.appendChild(li);
    taskInput.value = "";
    addEventListeners(li);
    updateTaskCount();
  }
}


//function to mark a task as done
function addEventListeners(li) {
  const check = li.querySelector(".check");
  const deleteBtn = li.querySelector(".delete");
  
  check.addEventListener("click", toggleTask);
  deleteBtn.addEventListener("click", deleteTask);
}

function toggleTask(event) {
  const check = event.target;
  const task = check.parentElement;
  task.classList.toggle("completed");
  updateTaskCount();
}


//clearing a task from the list
function deleteTask(event) {
  const deleteBtn = event.target;
  const task = deleteBtn.parentElement;
  taskList.removeChild(task);
  updateTaskCount();
}


//checking and unchecking tasks
function toggleAllCompleted() {
  const tasks = taskList.children;
  let allCompleted = true;

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (!completed) {
      allCompleted = false;
      break;
    }
  }

  for (const task of tasks) {
    const check = task.querySelector(".check");
    const completed = task.classList.contains("completed");

    if (allCompleted) {
      task.classList.remove("completed");
      if (!completed) {
        check.textContent = "";
      }
    } else {
      task.classList.add("completed");
      if (!completed) {
        check.textContent = "✓";
      }
    }
  }

  updateTaskCount();
}



//clearing the list
function clearAllTasks() {
  taskList.innerHTML = ""; 
  updateTaskCount();
}


//updating number of total and completed tasks
function updateTaskCount() {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".completed").length;
  taskCount.textContent = `${completedTasks} tasks completed out of ${totalTasks} total tasks`;
}