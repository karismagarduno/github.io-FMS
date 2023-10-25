let isTracing = false; // Flag to track if the user is tracing
let traceColor = 255; // Color of the (290, 150) coordinate
let traceText = ''; // Text to display when tracing

function setup() {
  createCanvas(700, 700);
  strokeWeight(2);
  noFill();
  setLineDash([100, 100]);
  setLineDash([10, 10]);
  ellipse(300, 300, 300, 300);
  setLineDash([5, 10, 30, 10]);
  circleSize = 0;

  let startButton = createButton('Start');
  startButton.position(10, 340);
  startButton.mousePressed(startTracing);

  let resetButton = createButton('Reset');
  resetButton.position(10, 370);
  resetButton.mousePressed(resetTracing);

  let changeColorButton = createButton('Change Color');
  changeColorButton.position(10, 400);
  changeColorButton.mousePressed(changeCoordinateColor);

  let resetColorButton = createButton('Reset Color');
  resetColorButton.position(10, 430);
  resetColorButton.mousePressed(resetCoordinateColor);
}

function draw() {
  background(255); 

  ellipse(300, 300, 300, 300);

  if (isTracing) {
    let distance = dist(mouseX, mouseY, 300, 300);
    if (distance > 150) {
      fill(255, 0, 0); // Red fill for the warning
      textSize(20);
      text('Not Tracing the Circle', 10, 30);
    } else {
      fill(0); 
      textSize(20);
      text(traceText, 290, 150);
    }
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function startTracing() {
  isTracing = true;
  traceText = 'Trace'; 
}

function resetTracing() {
  isTracing = false;
  traceText = ''; 
}

function changeCoordinateColor() {
  traceColor = color(0, 255, 0); 
}

function resetCoordinateColor() {
  traceColor = 255; 
}
