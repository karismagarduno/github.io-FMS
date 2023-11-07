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

  if (isTracing) {
    let distance = dist(mouseX, mouseY, 350, 350);

    if (distance >= circleRadius - 5 && distance <= circleRadius + 5) {
      stroke(20, 75, 200);
      strokeWeight(2);
      textSize(20);

      isDrawing = true;
    } else {
      isDrawing = false;

      if (distance < circleRadius - 5) {
        fill(20, 75, 200);
        textSize(20);
        textAlign(CENTER, CENTER); // Center the text inside the circle
        text('You are inside the circle', 350, 350); // Display inside the circle
      } else {
        fill(300, 50, 50);
        textSize(20);
        textAlign(CENTER, CENTER); // Center the text inside the circle
        text('You are outside the circle', 350, 350); // Display inside the circle
      }
    }

    if (isDrawing) {
      path.push(createVector(mouseX, mouseY));

      let completedTracing = true;
      for (let targetCoord of targetCoordinates) {
        if (!hasTracedCoordinate(targetCoord)) {
          completedTracing = false;
          break;
        }
      }

      if (completedTracing) {
        textSize(20);
        fill(0); // Set text color to black
        textAlign(CENTER, CENTER); // Center the text inside the circle
        text('Tracing Completed!', 350, 350); // Display inside the circle
      }

      noFill();
      beginShape();
      for (let point of path) {
        vertex(point.x, point.y);
      }
      endShape();
    }
  }
}

function startTracing() {
  isTracing = true;
  traceText = 'Trace';
  path = [];
  isDrawing = false;
  tracedCoordinates = [];
}

function resetTracing() {
  isTracing = false;
  traceText = '';
  isDrawing = false;
  tracedCoordinates = [];
}

function hasTracedCoordinate(targetCoord) {
  for (let point of path) {
    let distance = dist(point.x, point.y, targetCoord.x, targetCoord.y);
    if (distance < 5) { 
      tracedCoordinates.push(targetCoord);
      return true;
    }
  }
  return false;
}





