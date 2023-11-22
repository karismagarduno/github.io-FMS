let isTracing = false; // Flag to track if the user is tracing
let traceColor = 50; // Color of the (290, 150) coordinate
let traceText = ''; // Text to display when tracing
let path = []; // An array to store the mouse movement path
//let isDrawing = false; // Flag to track if the user is drawing
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
  createCanvas(1000, 600);
  clear();
  cursor(CROSS);
  
  // let instructions = createButton('Try to beat your fastest time!');
  // instructions.position(635, 210);
  // instructions.size(200, 50);
  // instructions.style('background-color', '#FFFFFF');
  // instructions.style('font-size', '19px');
  // instructions.style('font-family', 'Expo');
  
  let startHere = createButton('^ Start Here... Move This Way >'); // starting point for the player (doesn't activate anything)
  startHere.position(550, 610);
  startHere.style('font-size', '11px');
  startHere.style('font-family', 'Expo');
  
  let homeButton = createButton('Back to Level 1'); // takes the player back to the home page
  homeButton.position(950, 410);
  homeButton.size(200, 50);
  homeButton.style('font-size', '25px'); 
  homeButton.style('font-family', 'Expo');
  homeButton.mouseOver(onHover3);
  homeButton.mouseOut(onOut3);
  
  o = createElement("h1"); // the placeholder for the timer 
  o.position(660,650);
  const startText = "Start";
  const stopText = "Stop";
  const resetText = "Reset";
  const startStop = createButton(startText); // start and stop button 
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
  const resetButton = createButton(resetText); // reset button to set the timer to zero and reset the tracing             
  resetButton.position(950,350);
  resetButton.size(200, 50);
  resetButton.style('font-family', 'Expo');
  resetButton.style('font-size', '25px');
  resetButton.mouseOver(onHover2);
  resetButton.mouseOut(onOut2);
  resetButton.mouseClicked(() => {
    accumulateTime = false;
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
  // code that programs the timer
  if (accumulateTime) 
{  
  const totalMillis = accum + (start != null ? Date.now() - start : 0);
  const s = Math.floor(totalMillis / 1000) % 60;
  const m = Math.floor(totalMillis / 1000 / 60) % 60;
  const string = `Time: ${nf(m, 2)}:${nf(s, 2)}`;
  o.html(string);
  o.style('font-size', '20px')
}

  // check to see if the user is hovering over the lines drawn
  if(((mouseX>=545 && mouseX<=900) && (mouseY>=455 && mouseY<=465)) || ((mouseX>=545 && mouseX<=555) && (mouseY>=305 && mouseY<=465)) || ((mouseX>=850 && mouseX<=860) && (mouseY>=305 && mouseY<=465)) || ((mouseX>=620 && mouseX<=791) && (mouseY>=155 && mouseY<=165)) || ((mouseX>=550 && mouseX<=557.5) && (mouseY<=310 && mouseY>=295)) || ((mouseX>=557.5 && mouseX<=565) && (mouseY<=295 && mouseY>=280)) || ((mouseX>=565 && mouseX<=572.5) && (mouseY<=280 && mouseY>=265)) || ((mouseX>=572.5 && mouseX<=580) && (mouseY<=265 && mouseY>=250)) || ((mouseX>=580 && mouseX<=587.5) && (mouseY<=250 && mouseY>=235)) || ((mouseX>=587.5 && mouseX<=595) && (mouseY<=235 && mouseY>=220)) ||
((mouseX>=595 && mouseX<=602.5) && (mouseY>=220 && mouseY<=205)) || ((mouseX>=602.5 && mouseX<=610) && (mouseY>=205 && mouseY<=190)) || ((mouseX>=610 && mouseX<=617.5) && (mouseY>=190 && mouseY<=175))|| ((mouseX>=617.5 && mouseX<=625) && (mouseY>=175 && mouseY<=160))|| ((mouseX>=792.9 && mouseX<=799.8) && (mouseY>=175 && mouseY<=190))|| ((mouseX>=799.8 && mouseX<=806.7) && (mouseY>=190 && mouseY<=205))|| ((mouseX>=806.7 && mouseX<=813.6) && (mouseY>=205 && mouseY<=220))|| ((mouseX>=813.6 && mouseX<=820.5) && (mouseY>=220 && mouseY<=235))|| ((mouseX>=820.5 && mouseX<=827.4) && (mouseY>=235 && mouseY<=250))|| ((mouseX>=827.4 && mouseX<=834.3) && (mouseY>=250 && mouseY<=265))|| ((mouseX>=834.3 && mouseX<=841.2) && (mouseY>=265 && mouseY<=280))|| ((mouseX>=841.2 && mouseX<=848.1) && (mouseY>=280 && mouseY<=295))|| ((mouseX>=848.1 && mouseX<=855) && (mouseY>=295 && mouseY<=310)))
    {
      isMouseOnLine = true;
    }
  else{
    isMouseOnLine = false;
  }
  
  stroke(0);
  strokeWeight(2);
  line(550,310,625,160); //left slant final
  line(786,160,855,310); //right slant final
  line(625,160,786,160); //top line final
  line(550,310,550,460); // left verticle final
  line(550,460,855,460); //bottom line final
  line(855,310,855,460); //right verticle final
  
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
  
  // gives encouragement  
    if (isMouseOnLine)
    {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Keep it up!!!', 640, 320);
      //isDrawing = true;
      isTracing = true;
    } else {
      strokeWeight(2);
      textSize(26);
      textFont('Expo');
      text('Don\'t give up!!!', 630, 320);
      //isDrawing = false;
      isTracing = false;
    }

  let completedTracing = false;
  
  // creates a moving line behind the user's mouse if they are hovering over the perimeter
    if (isTracing) 
    {
     stroke('rgba(10,120,70, 0.5)');
      path.push(createVector(mouseX, mouseY));
      line(pmouseX, pmouseY, mouseX, mouseY);

      completedTracing = true;
      for (let targetCoord of targetCoordinates) {
        if (!hasTracedCoordinate(targetCoord)) {
          completedTracing = false;
          break;
        } //else completedTracing = true;
        //break;
      }
    }
  
     stroke('rgba(10,120,70, 0.5)');
     if (completedTracing) {
        textSize(26);
        text('Tracing Completed!', 610, 120); // Display outside
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
//  isTracing = true;
  isTracing = false;
  path = [];
 // isDrawing = false;
  tracedCoordinates = [];
}

function resetTracing() {
  isTracing = false;
  textSize(18);
  text(' ', 50, 300);
//  isDrawing = false;
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
