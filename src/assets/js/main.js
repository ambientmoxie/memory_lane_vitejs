import "../scss/style.scss";
import createContent from "./createContent";
import drag from "./drag";
import sketch from "./sketch";
import p5 from "p5";
import locked from "./locked";

window.onload = () => {
  createContent();
  drag();
  new p5(sketch);
  locked();
};

console.log('Press "S" or "s" to save the canvas');
console.log('DoubleClick to reset the text position');
