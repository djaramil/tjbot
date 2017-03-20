// Run "sudo node led_test.js" from your terminal to test your LED.
// It should set your light to white and turn the LED on.

var RED_PIN = 11, GREEN_PIN = 13, BLUE_PIN = 15;

var rpio = require('rpio');

var colorPalette = {
    "red": [0,1,1],
    "read": [0,1,1], // sometimes, STT hears "read" instead of "red"
    "green": [1,0,1],
    "blue": [1,1,0],
    "purple": [0,1,0],
    "yellow": [0,0,1],
    "pink": [0,1,0],
    "orange": [0,1,0],
    "aqua": [0,0,0],
    "white": [0,0,0],
    "off": [1,1,1],
    "on": [0,0,0]
}

/*Initialize the pins*/
var initPins = function(){
  //Pins: 11,13,15
  rpio.open(RED_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(GREEN_PIN,rpio.OUTPUT, rpio.HIGH);
  rpio.open(BLUE_PIN,rpio.OUTPUT, rpio.HIGH);
}

var rpioVal = {
  1 : rpio.HIGH,
  0 : rpio.LOW
}

var turnLight = function (colorConfig){
  initPins();
  rpio.open(RED_PIN,rpio.OUTPUT, rpioVal[colorConfig[0]]);
  rpio.open(GREEN_PIN,rpio.OUTPUT, rpioVal[colorConfig[1]]);
  rpio.open(BLUE_PIN,rpio.OUTPUT, rpioVal[colorConfig[2]]);
}

// ----  reset LED before exit
process.on('SIGINT', function () {
    initPins();
    process.nextTick(function () { process.exit(0); });
});

var setLED = function (msg){
    var words = msg.split(" ");
    var color = [0,0,0]; //red

   for(var i=0; i < words.length; i++){
     if (words[i] in colorPalette){
       color = colorPalette[words[i]];
     }
   }
    turnLight(color);
    console.log('color = ', color);
}

var turnLightsOff = function(){
  rpio.open(RED_PIN,rpio.OUTPUT, rpio.LOW);
  rpio.open(GREEN_PIN,rpio.OUTPUT, rpio.LOW);
  rpio.open(BLUE_PIN,rpio.OUTPUT, rpio.LOW);
}

var discoParty = function () {
      var colors = ['red','green','blue','pink','purple','yellow'];
      return setInterval(function(){
        var rand = colors[Math.floor(Math.random()*colors.length)];
        turnLight(colorPalette[rand]);
      },400);
}

// discoParty();
var sleep = require('sleep');

console.log("turn lights off");
turnLight(colorPalette["off"]);
sleep.msleep(2000);

console.log("turn lights on");
var colors = ['red','green','blue','pink','purple','yellow','aqua','white','orange'];
for (var i=0;i<colors.length;i++)
{
  var color=colors[i];
  console.log("color=",color);
  turnLight(colorPalette[color]);
  sleep.msleep(2000);
}

console.log("turn lights off");
turnLight(colorPalette["off"]);