const newTodo = document.querySelector("#newTodo");
const todoList = document.querySelector(".list");
const tools = document.querySelector(".tools");
const itemsCounter = document.querySelector("#itemsLeft");
const clearBtn = document.querySelector("#clear");
const sortBtns = document.querySelectorAll(".tools__sort button");
const noRecordsSort = document.querySelector("#noRecords");
let tasksCounter = 0;

let todoContent = [];

const config = { childList: true };

LoadRecordsFromStorage();

const callback = function (mutationList) {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      const recordList = document.querySelectorAll(".list__record input");
      console.log(recordList);
      tasksCounter = recordList.length - 1;
      itemsCounter.innerText = `${recordList.length - 1} items left`;
      // if (mutation.addedNodes.length == 1) {
      //   tasksCounter++;
      //   itemsCounter.innerText = `${tasksCounter} items left`;
      // }
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(todoList, config);

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter" && newTodo.value !== "") {
    CreateNewTodoRecord(newTodo.value, false);
    newTodo.value = "";
  }
});

todoList.addEventListener("change", (event) => {
  console.log("test");
  if (event.target.type == "checkbox") {
    if (event.target.checked) {
      tasksCounter--;
      todoContent.forEach((el) => {
        if (el.text === event.target.parentNode.children[1].innerText) {
          el.checked = true;
          console.log(el);
        }
      });
      if (tasksCounter == 1) {
        itemsCounter.innerText = `1 item left`;
      } else {
        itemsCounter.innerText = `${tasksCounter} items left`;
      }
    } else {
      tasksCounter++;
      todoContent.forEach((el) => {
        if (el.text === event.target.parentNode.children[1].innerText) {
          el.checked = false;
          console.log(el);
        }
      });
      if (tasksCounter == 1) {
        itemsCounter.innerText = `1 item left`;
      } else {
        itemsCounter.innerText = `${tasksCounter} items left`;
      }
    }
    localStorage.setItem("todo", JSON.stringify(todoContent));
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG" && event.target.parentNode.classList.contains("list__record")) {
    if (todoList.children.length == 3) {
      SetDefaultView();
    } else {
      todoList.removeChild(event.target.parentNode);
      RemoveRecordFromStorage(event.target.parentNode.children[1].innerText);
      tasksCounter--;
      if (tasksCounter == 1) {
        itemsCounter.innerText = `1 item left`;
      } else {
        itemsCounter.innerText = `${tasksCounter} items left`;
      }
    }
  }

  if (event.target == clearBtn) {
    const doneList = document.querySelectorAll("input[type='checkbox']");
    doneList.forEach((checkbox) => {
      if (checkbox.checked) {
        if (todoList.children.length == 3) {
          SetDefaultView();
        } else {
          todoList.removeChild(checkbox.parentNode);
          RemoveRecordFromStorage(checkbox.parentNode.children[1].innerText);
        }
      }
    });
  }

  if (event.target.parentNode.classList.contains("tools__sort")) {
    sortBtns.forEach((btn) => {
      btn.classList.remove("tools__sort__selected");
      if (event.target === btn) {
        btn.classList.add("tools__sort__selected");
        SortTasks(event.target.innerText);
      }
    });
  }
});

function CreateNewTodoRecord(text, checked) {
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
    if (checked === true) {
      todoList.children[1].children[0].checked = true;
    }
  } else {
    const newRecord = document.createElement("div");
    newRecord.classList.add("list__record");
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

function SetDefaultView(text) {
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

function SortTasks(state) {
  const doneList = document.querySelectorAll("input[type='checkbox']");
  noRecordsSort.classList.add("hidden");
  let records = 0;
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
        records++;
      }
    });

    if (records === 1) {
      noRecordsSort.children[1].innerText = "No active tasks...";
      noRecordsSort.classList.remove("hidden");
    }
  }

  if (state == "Completed") {
    doneList.forEach((checkbox, index) => {
      if (!checkbox.checked && index > 1) {
        checkbox.parentNode.classList.add("hidden_by_sort");
      } else if (checkbox.checked) {
        checkbox.parentNode.classList.remove("hidden_by_sort");
        records++;
      }
    });

    if (records === 0) {
      noRecordsSort.children[1].innerText = "No completed tasks...";
      noRecordsSort.classList.remove("hidden");
    }
  }
}

function SaveRecordInStorage(content, checked) {
  todoContent.push({ text: content, checked: checked });
  localStorage.setItem("todo", JSON.stringify(todoContent));
}

function RemoveRecordFromStorage(content) {
  console.log(content);
  if (todoContent.length > 0) {
    todoContent.forEach((el, index) => {
      console.log(el, content);
      if (el.text === content) {
        console.log("check");
        todoContent.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(todoContent));
      }
    });
  }
}

function LoadRecordsFromStorage() {
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
