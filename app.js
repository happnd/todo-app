import { SwitchStyleMode, LoadStyleMode } from "./js/styleModeSwitch.js";
import { IncreaseTaskCounter, DecreaseTaskCounter } from "./js/taskCounter.js";
import { SortTasks } from "./js/sortTasks.js";
import {
  LoadRecordsFromStorage,
  SaveRecordsInStorage,
  CreateNewTodoRecord,
  RemoveRecordFromStorage,
  SetDefaultView,
  todoList,
  todoContent,
  sortBtns,
  clearBtn,
} from "./js/recordManager.js";

const newTodo = document.querySelector("#newTodo");
const changeStyle = document.querySelector("#changeStyle");

let draggedElement;

LoadRecordsFromStorage();
LoadStyleMode();

changeStyle.addEventListener("click", () => {
  SwitchStyleMode();
});

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && newTodo.value !== "") {
    CreateNewTodoRecord(newTodo.value, false);
    newTodo.value = "";
  }
});

todoList.addEventListener("change", (event) => {
  if (event.target.type == "checkbox") {
    if (event.target.checked) {
      DecreaseTaskCounter();
      todoContent.forEach((el) => {
        if (el.text === event.target.parentNode.children[1].innerText) {
          el.checked = true;
        }
      });
    } else {
      IncreaseTaskCounter();
      todoContent.forEach((el) => {
        if (el.text === event.target.parentNode.children[1].innerText) {
          el.checked = false;
        }
      });
    }
    localStorage.setItem("todo", JSON.stringify(todoContent));
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG" && event.target.parentNode.classList.contains("list__record")) {
    if (todoList.children.length == 4) {
      SetDefaultView();
    } else {
      todoList.removeChild(event.target.parentNode);
      RemoveRecordFromStorage(event.target.parentNode.children[1].innerText);
      DecreaseTaskCounter();
    }
  }

  if (event.target == clearBtn) {
    console.log("test");
    const doneList = document.querySelectorAll("input[type='checkbox']");
    doneList.forEach((checkbox) => {
      if (checkbox.checked) {
        if (todoList.children.length == 4) {
          SetDefaultView();
        } else {
          todoList.removeChild(checkbox.parentNode);
          RemoveRecordFromStorage(checkbox.parentNode.children[1].innerText);
        }
      }
    });
  }

  if (event.target.parentNode.classList.contains("tools__sort") || event.target.parentNode.classList.contains("mobile")) {
    sortBtns.forEach((btn) => {
      btn.classList.remove("tools__sort__selected");
      if (event.target === btn) {
        btn.classList.add("tools__sort__selected");
        SortTasks(event.target.innerText);
      }
    });
  }
});

document.addEventListener("dragstart", (event) => {
  todoList.classList.add("drag__content");
  draggedElement = event.target;
  setTimeout(() => event.target.classList.add("hidden"), 50);
  event.target.classList.remove("border");
});

document.addEventListener("dragend", (event) => {
  todoList.classList.remove("drag__content");
  event.target.classList.remove("hidden");
});

todoList.addEventListener("dragleave", (event) => {
  if (event.target.classList.contains("list__record")) {
    event.target.classList.remove("drag__record__down");
    event.target.classList.remove("drag__record__up");
  }
});

todoList.addEventListener("dragover", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.classList.remove("drag__record__down");
      event.target.classList.add("drag__record__up");
    } else if (event.offsetY > 40) {
      event.target.classList.remove("drag__record__up");
      event.target.classList.add("drag__record__down");
    }
  } else if (event.target.parentNode.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.parentNode.classList.remove("drag__record__down");
      event.target.parentNode.classList.add("drag__record__up");
    } else if (event.offsetY > 40) {
      event.target.parentNode.classList.remove("drag__record__up");
      event.target.parentNode.classList.add("drag__record__down");
    }
  }
});

todoList.addEventListener("drop", (event) => {
  event.target.classList.remove("drag__record__down");
  event.target.classList.remove("drag__record__up");
  if (event.target.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target);
    } else if (event.offsetY > 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target.nextSibling);
    }
  } else if (event.target.parentNode.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target);
    } else if (event.offsetY > 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target.nextSibling);
    }
  }
  SaveRecordsInStorage();
});
