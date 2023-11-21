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
  { x: 550, y: 310 },
  { x: 625, y: 160 },
  { x: 786, y: 160 },
  { x: 855, y: 310 },
  { x: 550, y: 460},
  { x: 855, y: 460},
  { x: 550, y: 453 },
  { x: 557, y: 460 },
  { x: 557.5, y: 295 },
  { x: 565, y: 280 },
  { x: 572.5, y: 265 },
  { x: 580, y: 250 },
  { x: 587.5, y: 235 },
  { x: 595, y: 220},
  { x: 602.5, y: 205},
  { x: 610, y: 190},
  { x: 617.5, y: 175},
  { x: 792.9, y: 175},
  { x: 799.8, y: 190},
  { x: 806.7, y: 205},
  { x: 813.6, y: 220},
  { x: 820.5, y: 235},
  { x: 827.4, y: 250},
  { x: 834.3, y: 265},
  { x: 841.2, y: 280},
  { x: 848.1, y: 310},
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
  homeButton.position(950, 410);
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
  startStop.position(250, 410);
  startStop.size(200, 50);
  startStop.style('font-family', 'Expo');
  startStop.style('font-size', '25px');
  startStop.style('background-color', '#FFFFFF');
  startStop.mouseOver(onHover1);
  startStop.mouseOut(onOut1);
  startStop.mouseClicked(() => {
    strokeWeight(2);
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
  resetButton.position(950,350);
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
 // line(550,400,625,250);//left slant (CHANGED)
  line(550,310,625,160);
 // line(786,250,855,400);//right slant (CHANGED)
  line(786,160,855,310);
 // line(625,250,786,250);//top line (CHANGED)
  line(625,160,786,160);
 // line(550,400,550,550);//left verticle (CHANGED)
  line(550,310,550,460);
 // line(550,550,855,550);//bottom line (CHANGED)
  line(550,460,855,460);
 // line(855,400,855,550);//right verticle (CHANGED)
  line(855,310,855,460);
  
  point(550,310); 
  point(557.5,295);
  point(565,280);    
  point(572.5,265);
  point(580,250);
  point(587.5,235); // left slant points
  point(595,220);
  point(602.5,205);
  point(610,190);
  point(617.5,175);
  point(625,160);
  
  point(786,160);
  point(792.9,175);  
  point(799.8,190);
  point(806.7,205);
  point(813.6,220);
  point(820.5,235); // right slant points
  point(827.4,250);
  point(834.4,265);
  point(841.2,280);
  point(848.1,295);
  point(855,310);
  
    if (isMouseOnLine)
    {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Keep it up!!!', 640, 320);
      isDrawing = true;
    } else {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Don\'t give up!!!', 630, 320);
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
