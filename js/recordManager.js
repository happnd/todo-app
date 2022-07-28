import { IncreaseTaskCounter, SetTaskCounter } from "./taskCounter.js";
import { animateNewRecord } from "./animations.js";
import { SortTasks } from "./sortTasks.js";

const todoList = document.querySelector(".list");
const sortBtns = document.querySelectorAll(".tools__sort button");
const clearBtn = document.querySelector("#clear");
const tools = document.querySelector(".tools");
const defaultRecord = document.querySelector(".default");

const todoContent = [];

class Record {
  constructor() {
    this.storage = todoContent;
    this.clearBtn = clearBtn;
    this.todoList = todoList;
  }

  create(text, checked) {
    defaultRecord.classList.add("hidden");
    const newRecord = document.createElement("div");
    newRecord.classList.add("list__record");
    newRecord.classList.add("active");
    newRecord.appendChild(createCheckboxElement(checked));
    newRecord.appendChild(createTextElement(text));
    newRecord.appendChild(createCrossElement());
    todoList.insertBefore(newRecord, tools);
    newRecord.setAttribute("draggable", "true");
    animateNewRecord(newRecord);
    SaveRecordInStorage(text, checked);
    IncreaseTaskCounter();
    clearBtn.removeAttribute("disabled");
    sortBtns.forEach((btn) => btn.removeAttribute("disabled"));
    this.setSortButton();
    if (localStorage.getItem("todo-style") == "light") {
      newRecord.classList.add("list__record-white");
    }
  }

  setDefaultView() {
    console.log("test");
    defaultRecord.classList.remove("hidden");
    SetTaskCounter(0);
    clearBtn.setAttribute("disabled", "true");
    sortBtns.forEach((btn) => btn.setAttribute("disabled", "true"));
    sortBtns[0].classList.remove("tools__sort__selected");
    localStorage.removeItem("todo");
  }

  removeFromStorage(object) {
    const id = this.getID(object);
    console.log(id);
    todoList.removeChild(object);
    if (this.storage.length > 0) {
      this.storage.forEach((todo, index) => {
        if (index === id) {
          this.storage.splice(index, 1);
          localStorage.setItem("todo", JSON.stringify(this.storage));
        }
      });
      console.log(this.getActiveRecords().length);
      if (this.getActiveRecords().length === 0) {
        this.setDefaultView();
      }
    }
  }

  loadFromStorage() {
    if (localStorage.getItem("todo")) {
      defaultRecord.classList.add("hidden");
      const records = JSON.parse(localStorage.getItem("todo"));
      records.forEach((el) => {
        this.create(el.text, el.checked);
      });
      this.storage = records;
      const counter = this.storage.filter((el) => el.checked === false).length;
      SetTaskCounter(counter);
    }
  }

  saveInStorage() {
    this.storage = [];
    const activeRecords = document.querySelectorAll(".active");
    activeRecords.forEach((record) => this.storage.push({ text: record.children[1].innerText, checked: record.children[0].checked }));
    localStorage.setItem("todo", JSON.stringify(this.storage));
  }

  setSortButton(object) {
    if (object) {
      sortBtns.forEach((btn) => {
        btn.classList.remove("tools__sort__selected");
        if (object === btn) {
          btn.classList.add("tools__sort__selected");
          SortTasks(object.innerText);
        }
      });
    } else {
      sortBtns[0].classList.add("tools__sort__selected");
    }
  }

  getActiveRecords() {
    const activeRecords = document.querySelectorAll(".active");
    return activeRecords;
  }

  getID(recordObject) {
    const activeRecords = document.querySelectorAll(".active");
    let id;
    activeRecords.forEach((record, index) => {
      if (record === recordObject) {
        id = index;
      }
    });
    return id;
  }
}

function createCheckboxElement(checked) {
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.checked = checked;
  return newCheckbox;
}

function createTextElement(text) {
  const newTodoText = document.createElement("p");
  newTodoText.innerText = text;
  return newTodoText;
}

function createCrossElement() {
  const newCross = document.createElement("img");
  newCross.src = "images/icon-cross.svg";
  newCross.alt = "";
  return newCross;
}

function SaveRecordInStorage(content, checked) {
  record.storage.push({ text: content, checked: checked });
  localStorage.setItem("todo", JSON.stringify(record.storage));
}

export const record = new Record();
