let isTracing = false; // Flag to track if the user is tracing
let traceColor = 50; // Color of the (290, 150) coordinate
let traceText = ''; // Text to display when tracing
let path = []; // An array to store the mouse movement path
let isDrawing = false; // Flag to track if the user is drawing
let tracedCoordinates = []; // Array to store traced coordinates
let accum = 0; // for timer
let start = null; //for timer 
let o; // for timer
let accumulateTime = true;

const targetCoordinates = [
  { x: 110, y: 168 },
  { x: 120, y: 156 },
  { x: 130, y: 154 },
  { x: 140, y: 132 },
  { x: 265, y: 139.95},
  { x: 280, y: 159.9},
  { x: 100, y: 180 },
  { x: 295, y: 180 },
  { x: 150, y: 120 },
  { x: 250, y: 120 },
  { x: 100, y: 270 },
  { x: 295, y: 270 },
  { x: 100, y: 263 },
  { x: 105, y: 270},
];



function setup() {
  createCanvas(1000, 700);
  cursor(CROSS);

  let instructions = createButton('Try to beat your fastest time!');
  instructions.position(675, 200);
  instructions.style('font-size', '11px');
  instructions.style('font-family', 'Expo');
  
  let startHere = createButton('^ Start Here... Move This Way >');
  startHere.position(98, 273);
  startHere.style('font-size', '8px');
  startHere.style('font-family', 'Expo');

  let homeButton = createButton('Back to Home');
  homeButton.position(950, 360);
  homeButton.style('font-size', '25px');
  homeButton.style('font-family', 'Expo');
  
  o = createElement("h1");
  o.position(700,600);
  const startText = "Start";
  const stopText = "Stop";
  const resetText = "Reset";
  const startStop = createButton(startText);
  startStop.position(250, 330);
  startStop.style('font-family', 'Expo');
  startStop.style('font-size', '25px');
  startStop.mouseClicked(() => {
    strokeWeight(2);
      textSize(22);
      textFont('Expo');
      text('Begin!', 145, 205);
    if (start == null) {
      start = Date.now();
      startStop.html(stopText);
      startTracing();
    } else {
      accum += Date.now() - start;
      start = null;
      startStop.html(startText);
      resetTracing();
    }
    }
  );
  const resetButton = createButton(resetText);                         
  resetButton.position(950,300);
  resetButton.style('font-family', 'Expo');
  resetButton.style('font-size', '25px');
  resetButton.mouseClicked(() => {
    accumulateTime = true;
    start = null;
    startStop.html(startText);
    resetTracing();
  });

}

function draw() {
  clear();
  
  if (accumulateTime)
{  
  const totalMillis = accum + (start != null ? Date.now() - start : 0);
  //const ms = Math.floor(totalMillis % 1000 / 10);
  const s = Math.floor(totalMillis / 1000) % 60;
  const m = Math.floor(totalMillis / 1000 / 60) % 60;
  //const h = Math.floor(totalMillis / 1000 / 60 / 60);
  const string = `Time: ${nf(m, 2)}:${nf(s, 2)}`;
  o.html(string);
  o.style('font-size', '20px')
}
  
  if(((mouseX>=95 && mouseX<=300) && (mouseY>=265 && mouseY<=275)) || ((mouseX>=95 && mouseX<=105) && (mouseY>=175 && mouseY<=275)) || ((mouseX>=290 && mouseX<=300) && (mouseY>=175 && mouseY<=275)) || ((mouseX>=145 && mouseX<=255) && (mouseY>=115 && mouseY<=125)) || ((mouseX>=100 && mouseX<=110) && (mouseY<=180 && mouseY>=168)) || ((mouseX>=110 && mouseX<=120) && (mouseY<=168 && mouseY>=156)) || ((mouseX>=120 && mouseX<=130) && (mouseY<=156 && mouseY>=144)) || ((mouseX>=130 && mouseX<=140) && (mouseY<=144 && mouseY>=132)) || ((mouseX>=140 && mouseX<=150) && (mouseY<=132 && mouseY>=120)) ||
((mouseX>=250 && mouseX<=265) && (mouseY>=120 && mouseY<=139.95)) || ((mouseX>=265 && mouseX<=280) && (mouseY>=139.95 && mouseY<=159.9)) || ((mouseX>=280 && mouseX<=295) && (mouseY>=159.9 && mouseY<=180)))
    {
      isMouseOnLine = true;
    }
  else{
    isMouseOnLine = false;
  }
  
  stroke(0);
  strokeWeight(2);
  line(100,180,150,120);//left slant
  line(250,120,295,180);//right slant
  line(150,120,250,120);//top line
  line(100,180,100,270);//left verticle
  line(100,270,295,270);//bottom line
  line(295,180,295,270);//right verticle
  
  point(100,180); 
  point(110,168);
  point(120,156);    //points for the left slant
  point(130,144);
  point(140,132);
  point(150,120);
  
  point(250,120);
  point(265,139.95);  //points for the right slant
  point(280,159.9);
  point(295,180);
  
    if (isMouseOnLine)
    {
      strokeWeight(2);
      textSize(22);
      textFont('Expo');
      text('Keep it up!!!', 145, 205);
      isDrawing = true;
    } else {
      strokeWeight(2);
      textSize(22);
      textFont('Expo');
      text('Don\'t give up!!!', 130, 205);
      isDrawing = false;
    }

  let completedTracing = false;
  
    if (isDrawing) 
    {
     stroke('rgba(10,120,70, 0.5)');
      path.push(createVector(mouseX, mouseY));
      line(pmouseX, pmouseY, mouseX, mouseY);

      completedTracing = true;
      for (let targetCoord of targetCoordinates) {
        if (!hasTracedCoordinate(targetCoord)) {
          completedTracing = false;
          break;
        }
      }
    }
  
     stroke('rgba(10,120,70, 0.5)');
     if (completedTracing) {
        textSize(18);
        text('Tracing Completed!', 123, 97); // Display outside
        let nextButton = createButton('Next');
        nextButton.position(295,335);
        nextButton.style('font-size', '17px');  
        accumulateTime = false;
       
      resetTracing();
      }
  
      strokeWeight(3);
      beginShape();
      noFill();
      for(let point of path)
        {
          vertex(point.x, point.y);
        }
      endShape();

  
}

function startTracing() {
  isTracing = true;
  textSize(18);
  text('Start tracing!', 50, 300);
  path = [];
  isDrawing = false;
  tracedCoordinates = [];
}

function resetTracing() {
  isTracing = false;
  textSize(18);
  text(' ', 50, 300);
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
