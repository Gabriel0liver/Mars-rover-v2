
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
  [null,null,null,null,null,null,"obstacle",null,null,null,null]
]

//rover objects
var rover1 = {
  direction: "N",
  x: 0,
  y: 0
}

var rover2 = {
  direction: "N",
  x: 0,
  y: 10
}

var rover3 = {
  direction: "N",
  x: 10,
  y: 10
}

//used to simplify rotation
var orientation = ["N","W","S","E"];

//used to distinguish moving forward from backwards for boundries
var movingForward = true;

//arrays used to keep track on what tiles the rovers have been on
var travelLog1 = [];
var travelLog2 = [];
var travelLog3 = [];


function turnLeft(rover){
  if(rover.direction === "E"){
    rover.direction = "N";
  }
  else{
    //cycles through orientation array from left to right
    rover.direction = orientation[orientation.indexOf(rover.direction)+1];
  }
}

function turnRight(rover){
    if(rover.direction === "N"){
    rover.direction = "E";
  }
  else{
    //cycles through orientation array from right to left
    rover.direction = orientation[orientation.indexOf(rover.direction)-1];
  }
}

//function made for moving forward
function moveForward(rover){
  movingForward = true;
  switchLabel1:
  switch (rover.direction){
    case "N":
      //these if statements inside the case are used for the boundries
      if(boundriesObstacles(rover.y - 1, rover) === "break"){
        break switchLabel1;
      }
      rover.y = rover.y - 1;
      break;
    case "S":
      if(boundriesObstacles(rover.y + 1, rover) === "break"){
        break switchLabel1;
      }
      rover.y = rover.y + 1;
      break;
    case "W":
      if(boundriesObstacles(rover.x - 1, rover) === "break"){
       break switchLabel1;
     }
      rover.x = rover.x - 1;
      break;
    case "E":
      if(boundriesObstacles(rover.x + 1, rover) === "break"){
        break switchLabel1;
      }
      rover.x = rover.x + 1;
      break;
  }
  grid[rover.y][rover.x] = "rover";
  travelLog(rover);
}

//same function as previous but inverted directions
function moveBackwards(rover){
  movingForward = false;
  switchLabel2:
  switch (rover.direction){
    case "N":
      if(boundriesObstacles(rover.y + 1, rover) === "break"){
        break switchLabel2;
      }
      rover.y = rover.y + 1;
      break;
    case "S":
      if(boundriesObstacles(rover.y - 1, rover) === "break"){
        break switchLabel2;
      }
      rover.y = rover.y - 1;
      break;
    case "W":
      if(boundriesObstacles(rover.x + 1, rover) === "break"){
       break switchLabel2;
     }
      rover.x = rover.x + 1;
      break;
    case "E":
      if(boundriesObstacles(rover.x - 1, rover) === "break"){
        break switchLabel2;
      }
      rover.x = rover.x - 1;
      break;
  }
  grid[rover.y][rover.x] = "rover";
  travelLog(rover);
}

//function used to recieve all te commands and process them through their respective function
function recieveCommands(commands,rover){
  for(i in commands){
    switch(commands[i]){
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackwards(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
    }
  }
  console.log(travelLog1, travelLog2, travelLog3);
}

//checks for out of bounds and obstacles
function boundriesObstacles(movingTo,rover){
  //first checks for rover direction
  switch(rover.direction){
    case "N":
     //checks if going out of bounds
     if((movingForward && movingTo === -1) || (!movingForward && movingTo === 11)){
      console.log("out of bounds");
       return "break";
     }
     //then checks for obstacles
     else if(grid[movingTo][rover.x] === ("obstacle" || "rover")) {
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
      else if(grid[rover.y][movingTo] === ("obstacle" || "rover")){
        console.log("obstacle");
        return "break";
      }
      break;
    case "S":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        console.log("out of bounds");
        return "break";
      }
      else if(grid[movingTo][rover.x] === ("obstacle" || "rover")){
        console.log("obstacle");
        return "break";
      }
      break;
    case "E":
      if((movingForward && movingTo === 11) || (!movingForward && movingTo === -1)){
        console.log("out of bounds");
        return "break";
      }
      else if(grid[rover.y][movingTo] === ("obstacle"  || "rover")){
        console.log("obstacle");
        return "break";
      }
      break;
  }
}

function travelLog(rover){
  switch(rover){
    case rover1:
      travelLog1.push("x:"+rover.x+" y:"+rover.y);
      break;
    case rover2:
      travelLog2.push("x:"+rover.x+" y:"+rover.y);
      break;
    case rover3:
      travelLog2.push("x:"+rover.x+" y:"+rover.y);
      break;
  }
}