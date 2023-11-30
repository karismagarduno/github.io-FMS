//let isTracing = false; // Flag to track if the user is tracing
let isDrawing = false;
let traceColor = 50; // Color of the (290, 150) coordinate
let traceText = ''; // Text to display when tracing
let path = []; // An array to store the mouse movement path
let tracedCoordinates = []; // Array to store traced coordinates
let accum = 0; // for timer
let start = null; //for timer 
let o; // for timer
let accumulateTime = true;
let isMouseOnLine = false;
let completedTracing = false;
let startTime;
let elapsedTime = 0; // Variable to store the elapsed time
let score = 0;
let playerScore = 0;

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

  const nothing = '';
  const done= "Great job!";
  fin = createButton(nothing);
  fin.position(705,200);
  fin.style('background-color', '#CEDEBD');
  fin.style('border', 'none');
  fin.style('stroke', '3');
  fin.style('font-family', 'Expo');
  fin.style('font-size', '26px');
  
  let finish = createButton('Finish');
  finish.position(950,350);
  finish.style('font-size', '25px');
  finish.style('font-family', 'Expo');
  finish.size(200, 50);
  finish.style('background-color', '#FFFFFF');
  finish.mouseOver(onHover4);
  finish.mouseOut(onOut4);
  finish.mouseClicked(() => {
    fin.html(done);
    if (score > elapsedTime || score == 0) {
          score = elapsedTime;
        }
    elapsedTime = millis() - startTime;
    isTracing = false; // Stop tracing
  });
  
  let startHere = createButton('^ Start Here... Move This Way >'); // starting point for the player (doesn't activate anything)
  startHere.position(550, 610);
  startHere.style('font-size', '11px');
  startHere.style('font-family', 'Expo');
  
  let homeButton = createButton('Back to Level 1'); // takes the player back to the home page
  homeButton.position(950, 410);
  homeButton.size(200, 50);
  homeButton.style('font-size', '25px'); 
  homeButton.style('font-family', 'Expo');
  homeButton.style('background-color', '#FFFFFF');
  homeButton.mouseOver(onHover3);
  homeButton.mouseOut(onOut3);
  
  o = createElement("h1"); // the placeholder for the timer 
  o.position(660,650);
  const startText = "Start";
  const resetText = "Reset";
  const stopText = "Stop";
  const startStop = createButton(startText); // start and stop button 
  //startStop.position(250, 410);
  startStop.position(250, 350);
  startStop.size(200, 50);
  startStop.style('font-family', 'Expo');
  startStop.style('font-size', '25px');
  startStop.style('background-color', '#FFFFFF');
  startStop.mouseOver(onHover1);
  startStop.mouseOut(onOut1);
  startStop.mouseClicked(() => {
    strokeWeight(2);
    fin.html(nothing);
    if (start == null) {
      start = Date.now();
      accumulateTime  = true;
      startTracing();
    } 
    }
  );
  const stopButton = createButton(stopText); // reset button to set the timer to zero and reset the tracing             
  // stopButton.position(950,350);
  stopButton.position(250,410);
  stopButton.size(200, 50);
  stopButton.style('font-family', 'Expo');
  stopButton.style('font-size', '25px');
  stopButton.style('background-color', '#FFFFFF');
  stopButton.mouseOver(onHover2);
  stopButton.mouseOut(onOut2);
  stopButton.mouseClicked(() => {
    start = null;
    isDrawing = false;
    path = [];
    startStop.html(resetText);
    //resetTracing();
    endShape();
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
  stopButton.style('background-color', '#9EB384');
}

  function onOut2() {
  // Change the button's color when the mouse leaves
  stopButton.style('background-color', '#FFFFFF');
}
  function onHover3() {
  // Change the button's color when hovered over
  homeButton.style('background-color', '#9EB384');
}

function onOut3() {
  // Change the button's color when the mouse leaves
  homeButton.style('background-color', '#FFFFFF');
}

function onHover4() {
  // Change the button's color when hovered over
  finish.style('background-color', '#9EB384');
}

function onOut4() {
  // Change the button's color when the mouse leaves
  finish.style('background-color', '#FFFFFF');
}
  
}  
  
function draw() {
  
  // code that programs the timer
  
//   if (accumulateTime) 
// {  
//   const totalMillis = accum + (start != null ? Date.now() - start : 0);
//   const s = Math.floor(totalMillis / 1000) % 60;
//   const m = Math.floor(totalMillis / 1000 / 60) % 60;
//   const string = `Time: ${nf(m, 2)}:${nf(s, 2)}`;
//   o.html(string);
//   o.style('font-size', '20px')
// }

  // check to see if the user is hovering over the lines drawn
  if(((mouseX>=545 && mouseX<=900) && (mouseY>=455 && mouseY<=465)) || ((mouseX>=545 && mouseX<=555) && (mouseY>=305 && mouseY<=465)) || ((mouseX>=850 && mouseX<=860) && (mouseY>=305 && mouseY<=465)) || ((mouseX>=620 && mouseX<=791) && (mouseY>=155 && mouseY<=165)) || ((mouseX>=550 && mouseX<=557.5) && (mouseY<=310 && mouseY>=295)) || ((mouseX>=557.5 && mouseX<=565) && (mouseY<=295 && mouseY>=280)) || ((mouseX>=565 && mouseX<=572.5) && (mouseY<=280 && mouseY>=265)) || ((mouseX>=572.5 && mouseX<=580) && (mouseY<=265 && mouseY>=250)) ||((mouseX>=587.5 && mouseX<=595) && (mouseY<=235 && mouseY>=220)) ||
((mouseX>=595 && mouseX<=602.5) && (mouseY>=220 && mouseY<=205)) ||
((mouseX>=602.5 && mouseX<=610) && (mouseY>=205 && mouseY<=190)) ||
((mouseX>=610 && mouseX<=617.5) && (mouseY>=190 && mouseY<=175))||
((mouseX>=617.5 && mouseX<=625) && (mouseY>=175 && mouseY<=160))||
((mouseX>=786 && mouseX<=792.9) && (mouseY>=160 && mouseY<=175))||
((mouseX>=792.9 && mouseX<=799.8) && (mouseY>=175 && mouseY<=190))|| ((mouseX>=799.8 && mouseX<=806.7) && (mouseY>=190 && mouseY<=205))|| ((mouseX>=806.7 && mouseX<=813.6) && (mouseY>=205 && mouseY<=220))|| ((mouseX>=813.6 && mouseX<=820.5) && (mouseY>=220 && mouseY<=235))|| ((mouseX>=820.5 && mouseX<=827.4) && (mouseY>=235 && mouseY<=250))|| ((mouseX>=827.4 && mouseX<=834.3) && (mouseY>=250 && mouseY<=265))|| ((mouseX>=834.3 && mouseX<=841.2) && (mouseY>=265 && mouseY<=280))|| ((mouseX>=841.2 && mouseX<=848.1) && (mouseY>=280 && mouseY<=295))|| ((mouseX>=848.1 && mouseX<=855) && (mouseY>=295 && mouseY<=310)))
    {
      isMouseOnLine = true;
      if (!startTime) {
        startTime = millis();
      }
    }
  else{
    isMouseOnLine = false;
    if (startTime) {
        elapsedTime = millis() - startTime;
      }
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
  
  const bad = 'Don\'t give up';
  const good = "Keep it up!!!!!";
  enc = createButton(bad);
  enc.position(633,400);
  enc.style('background-color', '#CEDEBD');
  enc.style('border', 'none');
  enc.style('stroke', '3');
  enc.style('font-family', 'Expo');
  enc.style('font-size', '26px')
  
  // gives encouragement  
    if (isMouseOnLine)
    {
      enc.html(good);
      isDrawing = true;
    } else {
      enc.html(bad);
      isDrawing = false;
    }
  
  // creates a moving line behind the user's mouse if they are hovering over the perimeter
    if (isDrawing) 
    {
     stroke('rgba(10,120,70, 0.5)');
     draws = path.push(createVector(mouseX, mouseY));
     line(pmouseX, pmouseY, mouseX, mouseY);
      
      completedTracing = true;
      for (let targetCoord of targetCoordinates){
        if (!hasTracedCoordinate(targetCoord)) {
          completedTracing = false;
          break;
         // } else completedTracing = true;
        }
        
//         if (completedTracing) {
//         if (score > elapsedTime || score == 0) {
//           score = elapsedTime;
//         }

//         textSize(25);
//         fill(67, 83, 52);
//         strokeWeight(5);
//         textAlign(CENTER, CENTER);
//         //text('Tracing Completed!', 700, 400);
//         // Stop the timer when tracing is complete
//         elapsedTime = millis() - startTime;
//         isTracing = false; // Stop tracing
//       }
      }
  
     stroke('rgba(10,120,70, 0.5)');
  
     if (completedTracing) {
        textSize(26);
        text('Tracing Completed!', 610, 120); // Display outside
        accumulateTime = false;
        resetTracing();
       endShape();
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
  if (score > 0) {
      // textSize(25);
      // fill(67, 83, 52);
      // strokeWeight(5);
      // textAlign(CENTER, CENTER);
      // text('Tracing Completed!', 700, 400);
      //tracing completed should be gone once the reset button is clicked
      playerScore = score;
  }
  
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Time: ${time(elapsedTime)}`, 550, 550);
  text(`Score:${time(playerScore)}`, 830, 550);

}

function time(mili){
if (accumulateTime) 
{  
  let seconds = Math.floor(mili / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return nf(minutes, 2) + ':' + nf(seconds, 2);
  // const totalMillis = accum + (start != null ? Date.now() - start : 0);
  // const s = Math.floor(totalMillis / 1000) % 60;
  // const m = Math.floor(totalMillis / 1000 / 60) % 60;
  // const string = `Time: ${nf(m, 2)}:${nf(s, 2)}`;
  // o.html(string);
  // o.style('font-size', '20px')
}
}

function formatTime(milliseconds) {
   let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return nf(minutes, 2) + ':' + nf(seconds, 2);
}

function startTracing() {
 // isTracing = true;
  path = [];
  isDrawing = false;
  tracedCoordinates = [];
  startTime = millis(); 
}

function resetTracing() {
  // isDrawing = false;
  // tracedCoordinates = [];
  //isTracing = false;
  isDrawing = false;
  tracedCoordinates = [];
  startTime = null; // Reset the start time when the user resets tracing
  accumulateTime = false;
  path = []; 
  elapsedTime = 0;
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
