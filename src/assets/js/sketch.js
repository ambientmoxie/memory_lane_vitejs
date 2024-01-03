let canvasWidth;
let canvasHeight;

// Deux variables principales sont définies :
// 1 - "paths" est un tableau qui enregistrera toutes les lignes dessinées par l'utilisateur.
// 2 - "currentPath" est un tableau qui contiendra tous les points formant la ligne dessinée par l'utilisateur.

let paths = [];
let currentPath = [];

// La fonction pixelDensity est ajouté. Elle modifie la résolution du canvas.
// Les lignes 24 et 25 sont nécessairse pour redimensionner correctement l'élément canvas après le changement de résolution.
// Ces changements permettent de télécharger un image de meilleure qualité.

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

  // "drawPath" est la fonction principale :
  // 1 - La fonction vérifie si la courbe que l'utilisateur essaye de tracer contient au moins deux points (les deux points nécessaires au début d'une courbe).
  // Note : Ces deux points sont rapidement atteints compte tenu du fait qu'un point est rajouté à la simple pression de la souris au rythme de 60fps.
  // 2 - Les points du début et de la fin de la courbe sont doublés. Condition nécessaire à la création du tracé, ces deux points ne sont pas visibles à l'écran.
  // 3 - La fonction boucle dans le tableau currentPath ou/et Path afin de dessiner tous les points enregistrés dans le/les tableau(x).

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

  // Au clic :
  // 1 - La variable currentPath est vidée
  // 2 - La variable commence à se remplir de nouveau.

  p.mousePressed = function (e) {
    currentPath = [];
    currentPath.push({ x: e.clientX, y: e.clientY });
  };

  // Tant que le bouton de la souris est enfoncé :
  // 1 - Les positions immédiates du curseur sont enregistrées dans le tableau "currentPath" constituant un tableau composé de plusieurs objets, eux-mêmes composés de coordonnée en X et en Y.
  // 2 - Visualisation du tableau final : [ {x: x1, y: y1}, {x: x2, y: y2}, ... ]

  p.mouseDragged = function (e) {
    currentPath.push({ x: e.clientX, y: e.clientY });
  };

  // Lorsque le curseur de la souris est relaché :
  // 1 - Une condition vérifie si la variable "currentPath" n'est pas vide.
  // 2 - Si la variable contient un tracé (i.e un tableau de coordonnées), il est ajouté à la variable "paths" qui contient les anciens tracés et contiendra les tracés à venir.

  p.mouseReleased = function () {
    if (currentPath.length > 0) {
      paths.push(currentPath);
      currentPath = [];
    }
  };

  // Lorsque la fenêtre du navigateur est redimensionnée :
  // 1 - Les deux variable de largeur et de hauteur sont redéfinies.
  // 2 - le canvas est redimensionné.
  // 3 - La variable "paths" est vidée (i.e les lignes dessinées sur le canvas sont effacées).

  p.windowResized = function () {
    canvasWidth = window.innerWidth / 2;
    canvasHeight = window.innerHeight;
    p.resizeCanvas(canvasWidth, canvasHeight);
    paths = [];
  };

  // Si l'utilisateur appuie sur "s" ou "S", le contenu du canvas est exporté au format png.

  p.keyPressed = function () {
    if (p.key === "s" || p.key === "S") {
      p.saveCanvas("myCanvas", "png");
    }
  };
}
