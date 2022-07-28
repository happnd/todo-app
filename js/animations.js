import { record } from "./recordManager.js";

export function animateNewRecord(object) {
  object.style.position = "relative";
  object.style.top = "-80px";
  anime({
    targets: object,
    top: "0px",
  });
}

export function animateRemoveRecord(object) {
  object.style.zIndex = "-1";
  anime({
    targets: object,
    keyframes: [{ scale: 0.95 }, { translateY: -80 }],
    duration: 400,
    easing: "linear",
    complete: () => {
      record.removeFromStorage(object);
    },
  });
}

export function animateSwitcher(object) {
  anime({
    targets: object,
    keyframes: [{ rotate: 360 }, { rotate: 0 }],
    duration: 400,
  });
}
