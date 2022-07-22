export function SwitchStyleMode() {
  document.body.classList.toggle("body-white");
  document.querySelector(".todo").classList.toggle("todo-white");
  document.querySelector(".tools").classList.toggle("tools-white");
  document.querySelector(".drag").classList.toggle("drag-white");
  document.querySelector(".tools__sort").classList.toggle("tools__sort-white");
  document.querySelectorAll(".list__record").forEach((el) => {
    el.classList.toggle("list__record-white");
  });
  if (localStorage.getItem("todo-style") == "dark") {
    changeStyle.src = "images/icon-moon.svg";
    localStorage.setItem("todo-style", "light");
  } else {
    changeStyle.src = "images/icon-sun.svg";
    localStorage.setItem("todo-style", "dark");
  }
}

export function LoadStyleMode() {
  if (localStorage.getItem("todo-style") == "light") {
    document.body.classList.toggle("body-white");
    document.querySelector(".todo").classList.toggle("todo-white");
    document.querySelector(".tools").classList.toggle("tools-white");
    document.querySelector(".drag").classList.toggle("drag-white");
    document.querySelector(".tools__sort").classList.toggle("tools__sort-white");
    document.querySelectorAll(".list__record").forEach((el) => {
      el.classList.toggle("list__record-white");
    });
    changeStyle.src = "images/icon-moon.svg";
  }
}
