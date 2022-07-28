import { record } from "./recordManager.js";
const noRecordsSort = document.querySelector("#noRecords p");
let doneList;
let records;

export function SortTasks(state) {
  doneList = document.querySelectorAll("input[type='checkbox']:not([disabled])");
  doneList.forEach((done) => done.parentNode.classList.remove("hidden_by_sort"));
  noRecordsSort.parentNode.classList.add("hidden");
  records = 0;

  switch (state) {
    case "All":
      Array.from(record.todoList.children).forEach((todo) => todo.classList.remove("hidden_by_sort"));
      break;

    case "Active":
      checkStateOfCheckbox(false);
      showNoRecordsInfo("No active tasks...");
      break;

    case "Completed":
      checkStateOfCheckbox(true);
      showNoRecordsInfo("No completed tasks...");
      break;
  }
}

function showNoRecordsInfo(text) {
  if (records === 0) {
    noRecordsSort.innerText = text;
    noRecordsSort.parentNode.classList.remove("hidden");
  }
}

function checkStateOfCheckbox(checked) {
  doneList.forEach((checkbox) => {
    if (checkbox.checked === checked) {
      records++;
    } else {
      checkbox.parentNode.classList.add("hidden_by_sort");
    }
  });
}
