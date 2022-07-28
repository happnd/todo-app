import "./js/dragAndDrop.js";
import "./js/buttons.js";
import { LoadStyleMode } from "./js/styleModeSwitch.js";
import { IncreaseTaskCounter, DecreaseTaskCounter } from "./js/taskCounter.js";
import { record } from "./js/recordManager.js";

const newTodo = document.querySelector("#newTodo");

LoadStyleMode();
record.loadFromStorage();

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && newTodo.value !== "") {
    record.create(newTodo.value, false);
    newTodo.value = "";
  }
});

record.todoList.addEventListener("change", (event) => {
  if (event.target.type == "checkbox") {
    if (event.target.checked) {
      DecreaseTaskCounter();
    } else {
      IncreaseTaskCounter();
    }
    record.saveInStorage();
  }
});
