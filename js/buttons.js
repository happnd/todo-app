import { SwitchStyleMode } from "./styleModeSwitch.js";
import { animateRemoveRecord, animateSwitcher } from "./animations.js";
import { DecreaseTaskCounter } from "./taskCounter.js";
import { record } from "./recordManager.js";
const changeStyle = document.querySelector("#changeStyle");

document.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG" && event.target.parentNode.classList.contains("list__record")) {
    animateRemoveRecord(event.target.parentNode);
    DecreaseTaskCounter();
  }

  if (event.target == record.clearBtn) {
    const doneList = document.querySelectorAll(".active input[type='checkbox']:checked");
    doneList.forEach((checkbox) => {
      animateRemoveRecord(checkbox.parentNode);
    });
  }

  if (event.target.parentNode.classList.contains("tools__sort") || event.target.parentNode.classList.contains("mobile")) {
    record.setSortButton(event.target);
  }

  if (event.target === changeStyle) {
    SwitchStyleMode();
    animateSwitcher(changeStyle);
  }
});
