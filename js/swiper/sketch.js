 var header = document.getElementById("mydiv");
      var btns = header.getElementsByClassName("btn");
      for(var i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function(){
          var current = 
              document.getElementsByClassName("start");
          current[0].className=
            current[0].className.replace("start", "");
          this.className += " start";
        });
      }
        // JavaScript code to handle button click and start timer
        document.getElementById('Start').addEventListener('click', function() {
            // Set the duration of the timer in seconds
            var durationInSeconds = 10;

            // Get references to HTML elements
            var timerDisplay = document.getElementById('timerDisplay');
            var timerValue = document.getElementById('timerValue');

            // Display initial time
            timerValue.textContent = durationInSeconds;

            // Start the timer
            var countdown = setInterval(function() {
                durationInSeconds--;

                if (durationInSeconds >= 0) {
                    // Update the timer display
                    timerValue.textContent = durationInSeconds;
                } else {
                    // Timer has reached zero
                    clearInterval(countdown);
                    timerDisplay.textContent = 'Time is up!';
                }
            }, 1000);
        });
      document.getElementById('Reset').addEventListener('click', function() {
        var durationInSeconds = 10;
        
         var timerDisplay = document.getElementById('timerDisplay');
            var timerValue = document.getElementById('timerValue');
       
        timerValue.textContent = durationInSeconds;
        
        
      });
function showAlert()
{
  alert("Once you click start, you will have 10 seconds to get as many swipes!");
}

document.getElementById('Start').addEventListener('click', function(){
  
});
