import anime from "./animejs/lib/anime.es.js";
import Letterize from "https://cdn.skypack.dev/letterizejs@2.0.0";

export function AnimateNewRecord(object) {
  object.style.position = "relative";
  object.style.top = "-80px";
  anime({
    targets: object,
    top: "0px",
  });
}
