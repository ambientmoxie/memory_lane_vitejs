let canvasWidth;
let canvasHeight;

// Two main variables are defined:
// 1 - "paths" is an array that will record all the lines drawn by the user.
// 2 - "currentPath" is an array that will contain all the points forming the line drawn by the user.

let paths = [];
let currentPath = [];

// The pixelDensity function is added. It modifies the resolution of the canvas.
// Lines 24 and 25 are necessary to correctly resize the canvas element after the resolution change.
// These changes allow for downloading a higher quality image.

export default function sketch(p) {
  p.setup = function () {
    p.pixelDensity(3);

    canvasWidth = window.innerWidth / 2;
    canvasHeight = window.innerHeight;
    let cnv = p.createCanvas(canvasWidth, canvasHeight);
    cnv.parent(document.body);
    cnv.id("p5canvas");

    cnv.elt.style.width = canvasWidth + "px";
    cnv.elt.style.height = canvasHeight + "px";
  };

  p.draw = function () {
    p.background(200);
    for (let path of paths) {
      drawPath(path);
    }

    drawPath(currentPath);
  };

  // "drawPath" is the main function:
  // 1 - The function checks if the curve the user is trying to draw contains at least two points (the two points necessary for the beginning of a curve).
  // Note: These two points are quickly reached given that a point is added with just a press of the mouse at the rate of 60fps.
  // 2 - The start and end points of the curve are doubled. This condition is necessary for the creation of the path, these two points are not visible on the screen.
  // 3 - The function loops through the currentPath and/or Path array(s) to draw all the points recorded in the array(s).

  function drawPath(path) {
    if (path.length > 1) {
      p.stroke(0);
      p.strokeWeight(2.5);
      p.noFill();
      p.beginShape();

      p.curveVertex(path[0].x, path[0].y);

      for (let point of path) {
        p.curveVertex(point.x, point.y);
      }

      p.curveVertex(path[path.length - 1].x, path[path.length - 1].y);
      p.endShape();
    }
  }

  // On click:
  // 1 - The currentPath variable is cleared.
  // 2 - The variable starts to fill up again.

  p.mousePressed = function (e) {
    currentPath = [];
    currentPath.push({ x: e.clientX, y: e.clientY });
  };

  // As long as the mouse button is pressed:
  // 1 - The immediate positions of the cursor are recorded in the "currentPath" array, forming an array composed of several objects, each consisting of X and Y coordinates.
  // 2 - Visualization of the final array: [ {x: x1, y: y1}, {x: x2, y: y2}, ... ]

  p.mouseDragged = function (e) {
    currentPath.push({ x: e.clientX, y: e.clientY });
  };

  // When the mouse cursor is released:
  // 1 - A condition checks if the "currentPath" variable is not empty.
  // 2 - If the variable contains a trace (i.e., an array of coordinates), it is added to the "paths" variable, which contains old traces and will contain future traces.

  p.mouseReleased = function () {
    if (currentPath.length > 0) {
      paths.push(currentPath);
      currentPath = [];
    }
  };

  // When the browser window is resized:
  // 1 - The two width and height variables are redefined.
  // 2 - The canvas is resized.
  // 3 - The "paths" variable is cleared (i.e., the lines drawn on the canvas are erased).

  p.windowResized = function () {
    canvasWidth = window.innerWidth / 2;
    canvasHeight = window.innerHeight;
    p.resizeCanvas(canvasWidth, canvasHeight);
    paths = [];
  };

  // If the user presses "s" or "S", the canvas content is exported in PNG format.

  p.keyPressed = function () {
    if (p.key === "s" || p.key === "S") {
      p.saveCanvas("myCanvas", "png");
    }
  };
}
