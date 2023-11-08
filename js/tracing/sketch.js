let isTracing = false; // Flag to track if the user is tracing
let traceColor = 50; // Color of the (290, 150) coordinate
let traceText = ''; // Text to display when tracing
let path = []; // An array to store the mouse movement path
let isDrawing = false; // Flag to track if the user is drawing
let tracedCoordinates = []; // Array to store traced coordinates

const targetCoordinates = [
  { x: 363, y: 202 },
  { x: 310, y: 496 },
  { x: 342, y: 496 },
];

const circleRadius = 150; // Radius of the circle

function setup() {
  createCanvas(700, 700);
  strokeWeight(2);
  noFill();

  let startButton = createButton('Start');
  startButton.position(300, 530);
  startButton.mousePressed(startTracing);

  let resetButton = createButton('Reset');
  resetButton.position(300, 550);
  resetButton.mousePressed(resetTracing);
  
  let nextButton = createButton('Next');
  nextButton.position(300,570);
}

function drawDashedCircle(x, y, radius, dashLength) {
  for (let angle = 0; angle < 360; angle += dashLength) {
    let x1 = x + cos(radians(angle)) * radius;
    let y1 = y + sin(radians(angle)) * radius;
    let x2 = x + cos(radians(angle + dashLength)) * radius;
    let y2 = y + sin(radians(angle + dashLength)) * radius;
    if (angle % (dashLength * 2) < dashLength) {
      line(x1, y1, x2, y2);
    }
  }
}

function draw() {
  clear();

  // Draw dashed circle
  drawDashedCircle(350, 350, circleRadius, 10);
}
