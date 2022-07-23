import anime from "./animejs/lib/anime.es.js";
import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";
import { todoList } from "./recordManager.js";

export function AnimateNewRecord(object) {
  object.style.position = "relative";
  object.style.top = "-80px";
  anime({
    targets: object,
    top: "0px",
  });
}

export function AnimateRemoveRecord(object) {
  anime({
    targets: object,
    translateX: 400,
    opacity: 0,
    duration: 300,
    easing: "linear",
  });
  todoList.removeChild(event.target.parentNode);
}
