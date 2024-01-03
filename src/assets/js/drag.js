// Déclaration de variables vides.

let startX;
let startY;
let offsetX;
let offsetY;
let dragElem;

export default function drag() {
  // Stockage de la position en X et Y de l'élément déplaçable.

  const initX = document.getElementById("main").offsetLeft;
  const initY = document.getElementById("main").offsetTop;

  document.onmousedown = onMouseDown;
  document.onmouseup = onMouseUp;
  document.ondblclick = onDoubleClick;

  // Au clic de la souris :
  // 1 - Les coordonnées en X de la souris sont enregistrée.
  // 2 - Les coordonnées en Y de la souris sont enregistrée.
  // 3 - Les coordonnées en X du coin supérieur gauche du container déplaçable sont enregistrées.
  // 4 - Les coordonnées en Y du coin supérieur gauche du container déplaçable sont enregistrées.
  // 5 - Le container déplaçable est enregistré dans une variable.
  // ------ Si le bouton de la souris est maintenu et que l'utilisateur bouge le curseur :
  // ------ 1 - Les coordonnées en X du coin supérieux gauche de l'élément déplaçable sont remplacée à chaque nouveau mouvement de souris.
  // ------ 2 - Les coordonnées en Y du coin supérieux gauche de l'élément déplaçable sont remplacée à chaque nouveau mouvement de souris.

  function onMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    offsetX = document.getElementById("main").offsetLeft;
    offsetY = document.getElementById("main").offsetTop;
    dragElem = document.getElementById("main");
    document.onmousemove = onMouseMove;
  }

  function onMouseMove(e) {
    dragElem.style.left = offsetX + e.clientX - startX + "px";
    dragElem.style.top = offsetY + e.clientY - startY + "px";
  }

  // Si l'utilisateur relache le clic :
  // 1 - La function onMouseMove est détaché de l'évènement oumousemove. Plus rien ne se passe quand l'utilisateur bouge la souris.
  // 2 - La variable dragELem est vidée. Le container déplaçable ne sera plus identifié avant que l'utilisateur clic de nouveau sur le document.

  function onMouseUp() {
    document.onmousemove = null;
    dragElem = null;
  }

  // Si l'utilisateur double clic :
  // 1 - La container modifiable est identifié et enregistré dans une variable.
  // 2 - Sa position initial en X lui est de nouveau attribuée.
  // 3 - Sa position initial en Y lui est de nouveau attribuée.

  function onDoubleClick() {
    dragElem = document.getElementById("main");
    dragElem.style.left = initX + "px";
    dragElem.style.top = initY + "px";
  }
}
