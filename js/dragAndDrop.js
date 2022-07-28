import { record } from "./recordManager.js";
let draggedElement;

document.addEventListener("dragstart", (event) => {
  record.todoList.classList.add("drag__content");
  draggedElement = event.target;
  setTimeout(() => event.target.classList.add("hidden"), 50);
  event.target.classList.remove("border");
});

document.addEventListener("dragend", (event) => {
  record.todoList.classList.remove("drag__content");
  event.target.classList.remove("hidden");
});

record.todoList.addEventListener("dragleave", (event) => {
  if (event.target.classList.contains("list__record")) {
    event.target.classList.remove("drag__record__down");
    event.target.classList.remove("drag__record__up");
  }
});

record.todoList.addEventListener("dragover", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.classList.remove("drag__record__down");
      event.target.classList.add("drag__record__up");
    } else if (event.offsetY > 40) {
      event.target.classList.remove("drag__record__up");
      event.target.classList.add("drag__record__down");
    }
  }
});

record.todoList.addEventListener("drop", (event) => {
  event.target.classList.remove("drag__record__down");
  event.target.classList.remove("drag__record__up");
  if (event.target.classList.contains("list__record")) {
    if (event.offsetY < 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target);
    } else if (event.offsetY > 40) {
      event.target.parentNode.insertBefore(draggedElement, event.target.nextSibling);
    }
  }
  record.saveInStorage();
});
