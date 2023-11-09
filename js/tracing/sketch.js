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
  createCanvas(900, 800);
  strokeWeight(5);
  stroke(0, 0, 0);
  //noFill();

  let startButton = createButton('Start');
  startButton.size(200, 50);
  startButton.position(250, 520);
  startButton.style("font-size", "25px");
  startButton.style('background-color', '#CEDEBD');
  startButton.mouseOver(onHover1);
  startButton.mouseOut(onOut1);
  startButton.mousePressed(startTracing);

  let resetButton = createButton('Reset');
  resetButton.size(200, 50);
  resetButton.position(250, 580);
  resetButton.style("font-size", "25px");
  resetButton.style('background-color', '#CEDEBD');
  resetButton.mouseOver(onHover2);
  resetButton.mouseOut(onOut2);
  resetButton.mousePressed(resetTracing);
  
  let nextButton = createButton('Next');
  nextButton.size(200, 50);
  nextButton.position(250,640);
  nextButton.style("font-size", "25px");
  nextButton.style('background-color', '#CEDEBD');
  nextButton.mouseOver(onHover3);
  nextButton.mouseOut(onOut3);
  nextButton.mousePressed(goToAnotherPage);
  
  function onHover1() {
  // Change the button's color when hovered over
  startButton.style('background-color', '#9EB384');
}

function onOut1() {
  // Change the button's color when the mouse leaves
  startButton.style('background-color', '#CEDEBD');
}
  function onHover2() {
  // Change the button's color when hovered over
  resetButton.style('background-color', '#9EB384');
}

  function onOut2() {
  // Change the button's color when the mouse leaves
  resetButton.style('background-color', '#CEDEBD');
}
  function onHover3() {
  // Change the button's color when hovered over
  nextButton.style('background-color', '#9EB384');
}

function onOut3() {
  // Change the button's color when the mouse leaves
  nextButton.style('background-color', '#CEDEBD');
}
  function goToAnotherPage() {
  window.location.href = 'tracing1.html'; //     Replace with the URL of the target page
  }
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
      //stroke(0, 0, 0);
      strokeWeight(5);
      textSize(20);

      isDrawing = true;
    } else {
      isDrawing = false;
      
      if (distance < circleRadius - 5) {
        fill(250, 241, 228);
        strokeWeight(5);
        textSize(25);
        textAlign(CENTER, CENTER); // Center the text inside the circle
        text('You are inside the circle', 350, 350); // Display inside the circle
      } else {
        fill(300, 50, 50);
        strokeWeight(5);
        textSize(25);
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
        textSize(25);
        fill(67, 83, 52); // Set text color to green
        strokeWeight(5);
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
