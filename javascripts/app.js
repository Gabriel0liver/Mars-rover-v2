
//rover object
var rover = {
  direction: "N",
  x: 0,
  y: 0
}

//used to simplify rotation
var orientation = ["N","W","S","E"];


//array used to keep track on what tiles the rover has been on
var traelLog = [];

function turnLeft(){
  if(rover.direction === "E"){
    rover.direction = "N";
  }
  else{
    //cycles through orientation array from left to right
    rover.direction = orientation[orientation.indexOf(rover.direction)+1];
  }
}

function turnRight(){
    if(rover.direction === "N"){
    rover.direction = "E";
  }
  else{
    //cycles through orientation array from right to left
    rover.direction = orientation[orientation.indexOf(rover.direction)-1];
  }
}

//function made for moving forward
function moveForward(){
  switchLabel:
  switch (rover.direction){
    case "N":
      //these if statements inside the case are used for the boundries
      if(boundries(rover.y - 1) === "break"){
        break switchLabel;
      }
      rover.y = rover.y - 1;
      break;
    case "S":
      if(boundries(rover.y + 1) === "break"){
        break switchLabel;
      }
      boundries(rover.y);
      rover.y = rover.y + 1;
      break;
    case "W":
      if(boundries(rover.x - 1) === "break"){
       break switchLabel;
     }
      boundries(rover.x);
      rover.x = rover.x - 1;
      break;
    case "E":
      if(boundries(rover.x + 1) === "break"){
        break switchLabel;
      }
      boundries(rover.x);
      rover.x = rover.x + 1;
      break;
  }
  traelLog.push("x:"+rover.x+" y:"+rover.y);
}

//function used to recieve all te commands and process them through their respective function
function recieveCommands(commands){
  for(i in commands){
    switch(commands[i]){
      case "f":
        moveForward();
        break;
      case "r":
        turnRight();
        break;
      case "l":
        turnLeft();
        break;
    }
  }
  console.log(traelLog);
}

//function used so the rover dosen't go out of bundries
function boundries(movingTo){
  if(rover.direction === "N" || rover.direction === "E"){
    if(movingTo === -1){
      console.log("OUT OF BOUNDRIES!!!");
      return "break";
    }
  }
  else{
    if(movingTo === 11){
      console.log("OUT OF BOUNDRIES!!!");
      return "break";
    }
  }
}