import { todoList } from "./recordManager.js";
const noRecordsSort = document.querySelector("#noRecords");

export function SortTasks(state) {
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
