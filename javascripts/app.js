
var grid = [
  [null,null,"obstacle",null,null,"obstacle",null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,"obstacle",null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,"obstacle",null],
  ["obstacle",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"obstacle",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null],
  [null,"obstacle",null,null,null,null,null,null,null,null],
  [null,null,null,null,"obstacle",null,null,null,"obstacle",null]
]

//rover object
var rover = {
  direction: "N",
  x: 0,
  y: 0
}

//used to simplify rotation
var orientation = ["N","W","S","E"];

//used to distinguish moving forward from backwards for boundries
var movingForward = true;

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
  movingForward = true;
  switchLabel1:
  switch (rover.direction){
    case "N":
      //these if statements inside the case are used for the boundries
      if(boundries(rover.y - 1) === "break"){
        break switchLabel1;
      }
      rover.y = rover.y - 1;
      break;
    case "S":
      if(boundries(rover.y + 1) === "break"){
        break switchLabel1;
      }
      boundries(rover.y);
      rover.y = rover.y + 1;
      break;
    case "W":
      if(boundries(rover.x - 1) === "break"){
       break switchLabel1;
     }
      boundries(rover.x);
      rover.x = rover.x - 1;
      break;
    case "E":
      if(boundries(rover.x + 1) === "break"){
        break switchLabel1;
      }
      boundries(rover.x);
      rover.x = rover.x + 1;
      break;
  }
  traelLog.push("x:"+rover.x+" y:"+rover.y);
}

//same function as previous but inverted directions
function moveBackwards(){
  movingForward = false;
  switchLabel2:
  switch (rover.direction){
    case "N":
      if(boundries(rover.y + 1) === "break"){
        break switchLabel2;
      }
      rover.y = rover.y + 1;
      break;
    case "S":
      if(boundries(rover.y - 1) === "break"){
        break switchLabel2;
      }
      boundries(rover.y);
      rover.y = rover.y - 1;
      break;
    case "W":
      if(boundries(rover.x + 1) === "break"){
       break switchLabel2;
     }
      boundries(rover.x);
      rover.x = rover.x + 1;
      break;
    case "E":
      if(boundries(rover.x - 1) === "break"){
        break switchLabel2;
      }
      boundries(rover.x);
      rover.x = rover.x - 1;
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
      case "b":
        moveBackwards();
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

//checks for out of bounds and obstacles
function boundriesObstacles(movingTo){
  switch(rover.direction){
    case "N":
     if((movingForward && movingTo === -1) || (!movingForward && movingTo === 11)){
       return "break";
     }
     else if(grid[rover.x,movingTo] === "obstacle"){
       return "break";
     }
     break;
    case "W":
      if((movingForward && movingTo === -1) || (!movingForward && movingTo === 11)){
        return "break";
      }
      else if(grid[movingTo,rover.y] === "obstacle"){
        return "break";
      }
      break;
    case "S":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        return "break";
      }
      else if(grid[rover.x,movingTo] === "obstacle"){
        return "break";
      }
      break;
    case "E":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        return "break";
      }
      else if(grid[movingTo,rover.y] === "obstacle"){
        return "break";
      }
      break;
  }
}