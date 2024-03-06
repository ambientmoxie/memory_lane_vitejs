// Empty var.

let startX;
let startY;
let offsetX;
let offsetY;
let dragElem;

export default function drag() {
  // Storing the X and Y position of the movable element.

  const initX = document.getElementById("main").offsetLeft;
  const initY = document.getElementById("main").offsetTop;

  // Mouse Events
  document.onmousedown = onMouseDown;
  // document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.ondblclick = onDoubleClick;

  // Touch Events
  document.ontouchstart = onTouchStart;
  document.ontouchend = onMouseUp; // Reuse onMouseUp for touchend
  document.ontouchmove = onTouchMove;

  // On mouse click:
// 1 - The X coordinates of the mouse are recorded.
// 2 - The Y coordinates of the mouse are recorded.
// 3 - The X coordinates of the upper left corner of the movable container are recorded.
// 4 - The Y coordinates of the upper left corner of the movable container are recorded.
// 5 - The movable container is stored in a variable.
// ------ If the mouse button is held down and the user moves the cursor:
// ------ 1 - The X coordinates of the upper left corner of the movable element are replaced with each new mouse movement.
// ------ 2 - The Y coordinates of the upper left corner of the movable element are replaced with each new mouse movement.

  function onMouseDown(e) {
    startX = e.clientX;
    startY = e.clientY;
    offsetX = document.getElementById("main").offsetLeft;
    offsetY = document.getElementById("main").offsetTop;
    dragElem = document.getElementById("main");
    document.onmousemove = onMouseMove;
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) { // Only deal with one finger
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      setOffsetAndDragElem();
      document.ontouchmove = onTouchMove;
    }
  }

  function setOffsetAndDragElem() {
    offsetX = document.getElementById("main").offsetLeft;
    offsetY = document.getElementById("main").offsetTop;
    dragElem = document.getElementById("main");
  }

  function onMouseMove(e) {
    dragElem.style.left = offsetX + e.clientX - startX + "px";
    dragElem.style.top = offsetY + e.clientY - startY + "px";
  }

  function onTouchMove(e) {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      moveDragElement(touch.clientX, touch.clientY);
    }
  }

  function moveDragElement(clientX, clientY) {
    if (dragElem) {
      dragElem.style.left = offsetX + clientX - startX + 'px';
      dragElem.style.top = offsetY + clientY - startY + 'px';
    }
  }

  // If the user releases the click:
  // 1 - The onMouseMove function is detached from the onmousemove event. Nothing happens when the user moves the mouse anymore.
  // 2 - The dragElem variable is cleared. The movable container will no longer be identified until the user clicks again on the document.

  function onMouseUp() {
    document.onmousemove = null;
    dragElem = null;
  }

  // If the user double clicks:
  // 1 - The modifiable container is identified and stored in a variable.
  // 2 - Its initial X position is reassigned to it.
  // 3 - Its initial Y position is reassigned to it.

  function onDoubleClick() {
    dragElem = document.getElementById("main");
    dragElem.style.left = initX + "px";
    dragElem.style.top = initY + "px";
  }
}
