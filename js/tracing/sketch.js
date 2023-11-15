let isTracing = false; // Flag to track if the user is tracing
let traceText = ''; // Text to display when tracing
let path = []; // An array to store the mouse movement path
let isDrawing = false; // Flag to track if the user is drawing
let tracedCoordinates = []; // Array to store traced coordinates
let startTime; // Variable to store the start time
let elapsedTime = 0; // Variable to store the elapsed time
let score = 0;

const circleRadius = 150; // Radius of the circle

const targetCoordinates = [];



function setup() {
  createCanvas(1000, 700);
  strokeWeight(5);
  stroke(0, 0, 0);
  cursor(CROSS);

  // Initialize targetCoordinates using cos and sin within setup
  for (let angle = 45; angle <= 225; angle += 90) {
    let x = 700 + circleRadius * cos(radians(angle));
    let y = 400 + circleRadius * sin(radians(angle));
    targetCoordinates.push({ x, y });
  }

  let startButton = createButton('Start');
  startButton.size(200, 50);
  startButton.position(250, 330);
  startButton.style("font-size", "25px");
  startButton.style('background-color', '#CEDEBD');
  startButton.mouseOver(onHover1);
  startButton.mouseOut(onOut1);
  startButton.mousePressed(startTracing);

  let resetButton = createButton('Reset');
  resetButton.size(200, 50);
  resetButton.position(950, 300);
  resetButton.style("font-size", "25px");
  resetButton.style('background-color', '#CEDEBD');
  resetButton.mouseOver(onHover2);
  resetButton.mouseOut(onOut2);
  resetButton.mousePressed(resetTracing);

  let nextButton = createButton('Next');
  nextButton.size(200, 50);
  nextButton.position(950, 360);
  nextButton.style("font-size", "25px");
  nextButton.style('background-color', '#CEDEBD');
  nextButton.mouseOver(onHover3);
  nextButton.mouseOut(onOut3);
  nextButton.mousePressed(goToAnotherPage);

  function onHover1() {
    startButton.style('background-color', '#9EB384');
  }

  function onOut1() {
    startButton.style('background-color', '#CEDEBD');
  }

  function onHover2() {
    resetButton.style('background-color', '#9EB384');
  }

  function onOut2() {
    resetButton.style('background-color', '#CEDEBD');
  }

  function onHover3() {
    nextButton.style('background-color', '#9EB384');
  }

  function onOut3() {
    nextButton.style('background-color', '#CEDEBD');
  }

  function goToAnotherPage() {
    window.location.href = 'tracing1.html'; // Replace with the URL of the target page
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
  drawDashedCircle(700, 400, circleRadius, 10);

  if (isTracing) {
    let distance = dist(mouseX, mouseY, 700, 400);

    if (distance >= circleRadius - 5 && distance <= circleRadius + 5) {
      strokeWeight(5);
      textSize(20);

      isDrawing = true;

      // Record the start time when the user starts tracing
      if (!startTime) {
        startTime = millis();
      }
    } else {
      isDrawing = false;

      if (distance < circleRadius - 5) {
        fill(250, 241, 228);
        strokeWeight(5);
        textSize(25);
        textAlign(CENTER, CENTER);
        text('You are inside the circle', 700, 400);
      } else {
        fill(300, 50, 50);
        strokeWeight(5);
        textSize(25);
        textAlign(CENTER, CENTER);
        text('You are outside the circle', 700, 400);
      }

      // Stop the timer when the user is not tracing
      if (startTime) {
        elapsedTime = millis() - startTime;
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
        if (score > elapsedTime || score == 0) {
          score = elapsedTime;
        }

        textSize(25);
        fill(67, 83, 52);
        strokeWeight(5);
        textAlign(CENTER, CENTER);
        text('Tracing Completed!', 700, 400);
        // Stop the timer when tracing is complete
        elapsedTime = millis() - startTime;
        isTracing = false; // Stop tracing
      }

      noFill();
      beginShape();
      for (let point of path) {
        vertex(point.x, point.y);
      }
      endShape();
    }
  } else {
    // Display the "Tracing Completed!" text when not tracing
    if (score > 0) {
      textSize(25);
      fill(67, 83, 52);
      strokeWeight(5);
      textAlign(CENTER, CENTER);
      text('Tracing Completed!', 700, 400);
    }
  }

  // Display the elapsed time
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Time: ${formatTime(elapsedTime)}`, 700, 600);
  text(`Score:${formatTime(score)}`, 900, 600);
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

function formatTime(milliseconds) {
   let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return nf(minutes, 2) + ':' + nf(seconds, 2);
}

function startTracing() {
  isTracing = true;
  traceText = 'Trace';
  path = [];
  isDrawing = false;
  tracedCoordinates = [];
  startTime = millis(); // Record the start time when the user presses start
}

function resetTracing() {
  isTracing = false;
  traceText = '';
  isDrawing = false;
  tracedCoordinates = [];
  startTime = null; // Reset the start time when the user resets tracing
  elapsedTime = 0; // Reset the elapsed time as well
 
}

function goToAnotherPage() {
  window.location.href = 'tracing1.html';
}
