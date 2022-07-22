export const todoList = document.querySelector(".list");
export const sortBtns = document.querySelectorAll(".tools__sort button");
export const itemsCounter = document.querySelector("#itemsLeft");
export const clearBtn = document.querySelector("#clear");
const tools = document.querySelector(".tools");

export let todoContent = [];
export let tasksCounter = 0;

export function CreateNewTodoRecord(text, checked) {
  if (todoList.children[1].classList.contains("example")) {
    todoList.children[1].classList.remove("example");
    todoList.children[1].children[1].innerText = text;
    SaveRecordInStorage(text, checked);
    todoList.children[1].children[0].removeAttribute("disabled");
    const newCross = document.createElement("img");
    newCross.src = "images/icon-cross.svg";
    newCross.alt = "";
    todoList.children[1].appendChild(newCross);
    tasksCounter = 1;
    itemsCounter.innerText = `1 item left`;
    clearBtn.removeAttribute("disabled");
    sortBtns.forEach((btn) => btn.removeAttribute("disabled"));
    sortBtns[0].classList.add("tools__sort__selected");
    sortBtns[3].classList.add("tools__sort__selected");
    if (checked === true) {
      todoList.children[1].children[0].checked = true;
    }
  } else {
    const newRecord = document.createElement("div");
    newRecord.classList.add("list__record");
    newRecord.setAttribute("draggable", "true");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newRecord.appendChild(newCheckbox);
    const newTodoText = document.createElement("p");
    newTodoText.innerText = text;
    SaveRecordInStorage(text, checked);
    newRecord.appendChild(newTodoText);
    const newCross = document.createElement("img");
    newCross.src = "images/icon-cross.svg";
    newCross.alt = "";
    newRecord.appendChild(newCross);
    todoList.insertBefore(newRecord, tools);
    if (checked === true) {
      newCheckbox.checked = true;
    }
  }
}

export function SetDefaultView(text) {
  todoList.children[1].classList.add("example");
  todoList.children[1].children[0].checked = false;
  todoList.children[1].children[0].setAttribute("disabled", "true");
  todoList.children[1].children[1].innerText = "Your todo tasks will be here...";
  todoList.children[1].removeChild(todoList.children[1].children[2]);
  tasksCounter = 0;
  itemsCounter.innerText = `0 items left`;
  clearBtn.setAttribute("disabled", "true");
  sortBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
  sortBtns[0].classList.remove("tools__sort__selected");
  localStorage.removeItem("todo");
}

function SaveRecordInStorage(content, checked) {
  todoContent.push({ text: content, checked: checked });
  localStorage.setItem("todo", JSON.stringify(todoContent));
}

export function RemoveRecordFromStorage(content) {
  if (todoContent.length > 0) {
    todoContent.forEach((el, index) => {
      if (el.text === content) {
        todoContent.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(todoContent));
      }
    });
  }
}

export function LoadRecordsFromStorage() {
  if (localStorage.getItem("todo")) {
    const records = JSON.parse(localStorage.getItem("todo"));
    records.forEach((el) => {
      CreateNewTodoRecord(el.text, el.checked);
    });
    todoContent = records;
    tasksCounter = todoContent.filter((el) => el.checked === false).length;
    itemsCounter.innerText = `${tasksCounter} items left`;
  }
}

export function SaveRecordsInStorage() {
  todoContent = [];
  const records = document.querySelectorAll(".list__record");
  records.forEach((el, index) => {
    if (index > 0) {
      todoContent.push({ text: el.children[1].innerText, checked: el.children[0].checked });
      if (index === 1) {
        el.classList.add("border");
      }
    }
  });
  localStorage.setItem("todo", JSON.stringify(todoContent));
}
