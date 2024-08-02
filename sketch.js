let myFont;
let cols = 4;
let rows = 5;
let cellWidth;
let cellHeight;
let colors;
let shapes = ['square', 'circle', 'triangle']; // Creo un array de formas geométricas, para luego asignarlos aleatoriamente;
let gridItems;

// Margen
let margin = 35;

function preload() {
  myFont = loadFont('./assets/Leco_Regular.ttf');
}

function setup() {
  createCanvas(630, 945); // Tamaño del lienzo. Para plantearlo, me he pasadobasándome en la imagen de referencia (está dentro de la carpeta de assets).
  // Primero, he definido una "cuadrícula virtual" de 27x de alto * 18x de ancho, siendo x = 35px.
  // Los márgenes tienen un ancho de x, mientras que cada casilla de la composición tiene un ancho y un alto de 4x = 140px.

  cellWidth = (width - margin * 2) / cols;
  cellHeight = (height - margin * 7) / rows;

  // Creo un array de colores, para luego asignarlos aleatoriamente;
  colors = [
    color(237, 221, 190), // Fondo
    color(249, 161, 29), // Naranja
    color(241, 88, 49), // Rojo
    color(80, 115, 178), // Azul
  ];

  // Inicializo los colores y las formas de la cuadrícula;
  // Creo la matriz gridItems, en el que cada "casilla" tendrá un color y una forma aleatoria cada vez que se cargue la página;
  gridItems = [];
  for (let i = 0; i < cols; i++) {
    gridItems[i] = [];
    for (let j = 0; j < rows; j++) {
      let colorIndex = int(random(colors.length));
      let shapeIndex = int(random(shapes.length));
      gridItems[i][j] = {
        color: colors[colorIndex],
        shape: shapes[shapeIndex]
      };
    }
  }

  draw();

}

function draw() {

  colorMode(RGB);
  rectMode(CORNER);
  ellipseMode(CORNER);

  background(237, 221, 190); // Color de fondo

  strokeWeight(15); // Grosor del borde
  strokeJoin(ROUND); // Los vértices están redondeados

  // Dibujo la cuadrícula;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellWidth + margin;
      let y = j * cellHeight + margin * 6;
      let item = gridItems[i][j];

      fill(item.color);

      // Dibujo las formas geométricas;
      if (item.shape === 'square') {
        rect(x, y, cellWidth, cellHeight);
      } else if (item.shape === 'circle') {
        ellipse(x, y, cellWidth, cellHeight);
      } else if (item.shape === 'triangle') {
        triangle(x + cellWidth / 2, y, x, y + cellHeight, x + cellWidth, y + cellHeight);
      }
    }
  }



  // Dibujo el texto
  fill(0); // Color del texto
  textSize(96);
  textFont(myFont);
  textAlign(LEFT, TOP);

  // Texto principal con un tracking custom (separación entre caracteres);
  let mainText = 'BAUHAUS';
  let availableWidth = width - 2 * margin;
  let tracking = (availableWidth - textWidth(mainText)) / (mainText.length - 1);

  let x = margin;
  for (let i = 0; i < mainText.length; i++) {
    text(mainText[i], x, margin);
    x += textWidth(mainText[i]) + tracking;
  }

  // Texto secundario con tracking custom;
  let subText = 'EXHIBITION JULY 23, 1923';
  textSize(36);
  tracking = (availableWidth - textWidth(subText)) / (subText.length - 1);

  x = margin;
  for (let i = 0; i < subText.length; i++) {
    text(subText[i], x, margin * 4);
    x += textWidth(subText[i]) + tracking;
  }

}

function mousePressed() {
  // Detecto en qué casilla se ha hecho click;
  let xIndex = floor((mouseX - margin) / cellWidth);
  let yIndex = floor((mouseY - margin * 6) / cellHeight);

  // Miro si el clic está dentro de la cuadrícula;
  if (xIndex >= 0 && xIndex < cols && yIndex >= 0 && yIndex < rows) {
    // Cambio el color y la forma de la casilla;
    let colorIndex = int(random(colors.length));
    let shapeIndex = int(random(shapes.length));
    gridItems[xIndex][yIndex] = {
      color: colors[colorIndex],
      shape: shapes[shapeIndex],
    };

    draw(); // Redibujo la cuadrícula y el texto;
  }
}

// Shortcuts del teclado
function keyPressed() {
  // P: Pantallazo
  if (key === 'p') {
    saveFrames('sketch-', 'png', 1, 1);
  }
}
