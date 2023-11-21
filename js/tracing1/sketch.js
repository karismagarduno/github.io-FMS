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
  clear();
  cursor(CROSS);
  
  // let instructions = createButton('Try to beat your fastest time!');
  // instructions.position(635, 210);
  // instructions.size(200, 50);
  // instructions.style('background-color', '#FFFFFF');
  // instructions.style('font-size', '19px');
  // instructions.style('font-family', 'Expo');
  
  let startHere = createButton('^ Start Here... Move This Way >');
  startHere.position(550, 610);
  startHere.style('font-size', '11px');
  startHere.style('font-family', 'Expo');
  
  let homeButton = createButton('Back to Home');
  homeButton.position(950, 360);
  homeButton.size(200, 50);
  homeButton.style('font-size', '25px'); 
  homeButton.style('font-family', 'Expo');
  homeButton.mouseOver(onHover3);
  homeButton.mouseOut(onOut3);
  
  o = createElement("h1");
  o.position(660,650);
  const startText = "Start";
  const stopText = "Stop";
  const resetText = "Reset";
  const startStop = createButton(startText);
  startStop.position(250, 360);
  startStop.size(200, 50);
  startStop.style('font-family', 'Expo');
  startStop.style('font-size', '25px');
  startStop.style('background-color', '#FFFFFF');
  startStop.mouseOver(onHover1);
  startStop.mouseOut(onOut1);
  startStop.mouseClicked(() => {
    strokeWeight(2);
     // textSize(22);
     // textFont('Expo');
     // text('Begin!', 145, 205);
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
  resetButton.size(200, 50);
  resetButton.style('font-family', 'Expo');
  resetButton.style('font-size', '25px');
  resetButton.mouseOver(onHover2);
  resetButton.mouseOut(onOut2);
  resetButton.mouseClicked(() => {
    accumulateTime = true;
    start = null;
    startStop.html(startText);
    resetTracing();
  });
  
  function onHover1() {
  // Change the button's color when hovered over
  startStop.style('background-color', '#9EB384');
}
  
  function onOut1() {
  // Change the button's color when the mouse leaves
  startStop.style('background-color', '#FFFFFF');
}
  function onHover2() {
  // Change the button's color when hovered over
  resetButton.style('background-color', '#9EB384');
}

  function onOut2() {
  // Change the button's color when the mouse leaves
  resetButton.style('background-color', '#FFFFFF');
}
  function onHover3() {
  // Change the button's color when hovered over
  homeButton.style('background-color', '#9EB384');
}

function onOut3() {
  // Change the button's color when the mouse leaves
  homeButton.style('background-color', '#FFFFFF');
}

}

function draw() {
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
  line(550,400,625,250);//left slant (CHANGED)
  line(786,250,855,400);//right slant (CHANGED)
  line(625,250,786,250);//top line (CHANGED)
  line(550,400,550,550);//left verticle (CHANGED)
  line(550,550,855,550);//bottom line (CHANGED)
  line(855,400,855,550);//right verticle (CHANGED)
  
  point(550,400); 
  point(557.5,385);
  point(565,370);    
  point(572.5,355);
  point(580,340);
  point(587.5,325); // left slant points
  point(595,310);
  point(602.5,295);
  point(610,280);
  point(617.5,265);
  point(625.250);
  
  point(786,250);
  point(792.9,265);  
  point(799.8,280);
  point(806.7,295);
  point(813.6,310);
  point(820.5,325); // right slant points
  point(827.4,340);
  point(834.4,355);
  point(841.2,370);
  point(848.1,385);
  point(855,400);
  
    if (isMouseOnLine)
    {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Keep it up!!!', 640, 410);
      isDrawing = true;
    } else {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Don\'t give up!!!', 630, 410);
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
        text('Tracing Completed!', 615, 200); // Display outside
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
 // textSize(18);
 // text('Start tracing!', 50, 300);
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

// function showAlert()
// {
//   alert("Once you click start, you will have 10 seconds to get as many swipes!");
// }
