const newTodo = document.querySelector("#newTodo");
const todoList = document.querySelector(".list");
const tools = document.querySelector(".tools");
const itemsCounter = document.querySelector("#itemsLeft");
const clearBtn = document.querySelector("#clear");
const sortBtns = document.querySelectorAll(".tools__sort button");
let tasksCounter = 0;

const config = { childList: true };

const callback = function (mutationList, observer) {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      tasksCounter = todoList.children.length - 1;
      if (tasksCounter == 1) {
        itemsCounter.innerText = `1 item left`;
      } else {
        itemsCounter.innerText = `${tasksCounter} items left`;
      }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(todoList, config);

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && newTodo.value !== "") {
    CreateNewTodoRecord();
    newTodo.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG" && event.target.parentNode.classList.contains("list__record")) {
    if (todoList.children.length == 2) {
      SetDefaultView();
    } else {
      todoList.removeChild(event.target.parentNode);
    }
  }

  if (event.target == clearBtn) {
    const doneList = document.querySelectorAll("input[type='checkbox']");
    doneList.forEach((checkbox) => {
      if (checkbox.checked) {
        if (todoList.children.length == 2) {
          SetDefaultView();
        } else {
          todoList.removeChild(checkbox.parentNode);
        }
      }
    });
  }

  if (event.target.parentNode.classList.contains("tools__sort")) {
    sortBtns.forEach((btn) => {
      if (event.target === btn) {
        console.log(event.target.innerText);
        SortTasks(event.target.innerText);
      }
    });
  }
});

function CreateNewTodoRecord() {
  if (todoList.children[0].classList.contains("example")) {
    todoList.children[0].classList.remove("example");
    todoList.children[0].children[1].innerText = newTodo.value;
    todoList.children[0].children[0].removeAttribute("disabled");
    const newCross = document.createElement("img");
    newCross.src = "images/icon-cross.svg";
    newCross.alt = "";
    todoList.children[0].appendChild(newCross);
    tasksCounter = 1;
    itemsCounter.innerText = `1 item left`;
    clearBtn.removeAttribute("disabled");
  } else {
    const newRecord = document.createElement("div");
    newRecord.classList.add("list__record");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newRecord.appendChild(newCheckbox);
    const newTodoText = document.createElement("p");
    newTodoText.innerText = newTodo.value;
    newRecord.appendChild(newTodoText);
    const newCross = document.createElement("img");
    newCross.src = "images/icon-cross.svg";
    newCross.alt = "";
    newRecord.appendChild(newCross);
    todoList.insertBefore(newRecord, tools);
  }
}

function SetDefaultView() {
  todoList.children[0].classList.add("example");
  todoList.children[0].children[0].checked = false;
  todoList.children[0].children[0].setAttribute("disabled", "true");
  todoList.children[0].children[1].innerText = "Your todo tasks will be here...";
  todoList.children[0].removeChild(todoList.children[0].children[2]);
  tasksCounter = 0;
  itemsCounter.innerText = `0 items left`;
  clearBtn.setAttribute("disabled", "true");
}

function SortTasks(state) {
  const doneList = document.querySelectorAll("input[type='checkbox']");
  console.log(todoList.childNodes);
  if (state == "All") {
    for (let i = 0; i < todoList.children.length; i++) {
      todoList.children[i].classList.remove("hidden_by_sort");
    }
  }

  if (state == "Active") {
    doneList.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkbox.parentNode.classList.add("hidden_by_sort");
      } else if (!checkbox.checked && index > 0) {
        checkbox.parentNode.classList.remove("hidden_by_sort");
      }
    });
  }

  if (state == "Completed") {
    doneList.forEach((checkbox, index) => {
      if (!checkbox.checked && index > 0) {
        checkbox.parentNode.classList.add("hidden_by_sort");
      } else if (checkbox.checked) {
        checkbox.parentNode.classList.remove("hidden_by_sort");
      }
    });
  }
}
