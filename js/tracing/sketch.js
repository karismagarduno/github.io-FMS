let isTracing = false; // Flag to track if the user is tracing
let traceColor = 50; // Color of the (290, 150) coordinate
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
}

function draw() {
  background(255);

  ellipse(300, 300, 300, 300);

  if (isTracing) {
    let distance = dist(mouseX, mouseY, 300, 300);
    if (distance > 155) {
      fill(300, 50, 50); // Red fill for the warning if they are not tracing 
      textSize(20);
      text('You are outside the Circle', 10, 30);
    } else  {
      // Check if the mouse is inside the circle
      let circleRadius = 140; // Radius of the circle
      if (distance <= circleRadius) {
        fill(300, 50, 50); // Set fill to red when inside the circle
        textSize(20);
        text('You are inside the circle', 10, 30);
      
      } else {
        fill(400); // Default fill color, it will be white once they are tracking 
        // textSize(20);
        // text('Perfect!', 10, 30);
      }
     

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
  isTracing = true;
  traceText = ''; 
}

function changeCoordinateColor() {
  traceColor = color(20, 75, 200); 
}

function resetCoordinateColor() {
  traceColor = color(20, 75, 200);
}

