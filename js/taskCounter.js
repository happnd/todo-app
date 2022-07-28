export const itemsCounter = document.querySelector("#itemsLeft");

let tasksCounter = 0;

export function IncreaseTaskCounter() {
  tasksCounter++;
  RefreshTaskCounter();
}

export function DecreaseTaskCounter() {
  tasksCounter--;
  RefreshTaskCounter();
}

export function SetTaskCounter(value) {
  tasksCounter = value;
  RefreshTaskCounter();
}

export function RefreshTaskCounter() {
  if (tasksCounter === 1) {
    itemsCounter.innerText = `${tasksCounter} item left`;
  } else {
    itemsCounter.innerText = `${tasksCounter} items left`;
  }
}
