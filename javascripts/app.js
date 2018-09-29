
//grid for obstacles
var grid = [
  [null,null,null,"obstacle",null,"obstacle",null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null],
  [null,"obstacle",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,"obstacle",null,null],
  ["obstacle",null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"obstacle",null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null],
  [null,"obstacle",null,null,null,null,null,null,null,null,null],
  [null,null,null,null,"obstacle",null,null,null,"obstacle",null,null],
  ["obstacle",null,null,null,null,null,"obstacle",null,null,null,null]
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
      if(boundriesObstacles(rover.y - 1) === "break"){
        break switchLabel1;
      }
      rover.y = rover.y - 1;
      break;
    case "S":
      if(boundriesObstacles(rover.y + 1) === "break"){
        break switchLabel1;
      }
      rover.y = rover.y + 1;
      break;
    case "W":
      if(boundriesObstacles(rover.x - 1) === "break"){
       break switchLabel1;
     }
      rover.x = rover.x - 1;
      break;
    case "E":
      if(boundriesObstacles(rover.x + 1) === "break"){
        break switchLabel1;
      }
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
      if(boundriesObstacles(rover.y + 1) === "break"){
        break switchLabel2;
      }
      rover.y = rover.y + 1;
      break;
    case "S":
      if(boundriesObstacles(rover.y - 1) === "break"){
        break switchLabel2;
      }
      rover.y = rover.y - 1;
      break;
    case "W":
      if(boundriesObstacles(rover.x + 1) === "break"){
       break switchLabel2;
     }
      rover.x = rover.x + 1;
      break;
    case "E":
      if(boundriesObstacles(rover.x - 1) === "break"){
        break switchLabel2;
      }
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
  //first checks for rover direction
  switch(rover.direction){
    case "N":
     //checks if going out of bounds
     if((movingForward && movingTo === -1) || (!movingForward && movingTo === 11)){
      console.log("out of bounds");
       return "break";
     }
     //then checks for obstacles
     else if(grid[movingTo][rover.x] === "obstacle"){
      console.log("obstacle");
       return "break";
     }
     //if nothing then continue moving
     break;
    case "W":
      if((movingForward && movingTo === -1) || (!movingForward && movingTo === 11)){
        console.log("out of bounds");
        return "break";
      }
      else if(grid[rover.y][movingTo] === "obstacle"){
        console.log("obstacle");
        return "break";
      }
      break;
    case "S":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        console.log("out of bounds");
        return "break";
      }
      else if(grid[movingTo][rover.x] === "obstacle"){
        console.log("obstacle");
        return "break";
      }
      break;
    case "E":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        console.log("out of bounds");
        return "break";
      }
      else if(grid[rover.y][movingTo] === "obstacle"){
        console.log("obstacle");
        return "break";
      }
      break;
  }
}