import anime from "./animejs/lib/anime.es.js";
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
  object.style.zIndex = "-1";
  anime({
    targets: object,
    keyframes: [{ scale: 0.95 }, { translateY: -80 }],
    duration: 400,
    easing: "linear",
    complete: () => {
      todoList.removeChild(object);
    },
  });
}

export function AnimateSwitcher(object) {
  anime({
    targets: object,
    keyframes: [{ rotate: 360 }, { rotate: 0 }],
    duration: 400,
  });
}
