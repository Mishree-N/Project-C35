//variables
var balloon, balloonAni, backgroundImg;
var database, dbPosition;;


function preload(){

  //load background image
  backgroundImg=loadImage("cityImage.png");

  //load balloon animation
  balloonAni=loadAnimation("HotAirBallon-01.png", "HotAirBallon-02.png", "HotAirBallon-03.png");

}

function setup() {
  //setup DB
  database = firebase.database ();
  //make canvas
  createCanvas(1000,500);
  

  //make balloon sprite 
  balloon=createSprite(200,300, 10,10);
  //add animation
  balloon.addAnimation("balloon", balloonAni);
  //scale 
  balloon.scale=0.6;

  var balloonPosition = database.ref ("Balloon/Position") ;
  balloonPosition.on ("value", readPosition, showError);

}

function draw() {
  //add background's image to the background
  background(backgroundImg); 
  
  //display text for game instructions to use key controls to move
  textSize(14);
  fill("black");
  text("Use arrow key controls to move Hot Air Balloon!", 10, 30);

  //when left arrow key is pressed
  if(keyDown(LEFT_ARROW)){
    //make balloon move left
    writePosition(-1,0)
  }

  //when right arrow key is pressed
  else if(keyDown(RIGHT_ARROW)){
    //move balloon to right
    writePosition(1,0);
  }

  //when up arrow key is pressed
  else if(keyDown(UP_ARROW)){
    //move balloon up
    writePosition(0,-1);
    //make balloon smaller to give realistic appearance
    balloon.scale=balloon.scale-0.002;
  }

  //when down arrow key is pressed
  else if(keyDown(DOWN_ARROW)){
    //move balloon down
    writePosition(0,+1);
    //make balloon bigger to give realistic appearance
    balloon.scale=balloon.scale+0.001;

  }

  //show sprites like balloon
  drawSprites();
}


function readPosition(data){
  
  pos = data.val (); 
  balloon.x=pos.x;
  balloon.y=pos.y;

}

function showError(){

  console.log("error");

}

function writePosition(x,y){

  balloonPosition = database.ref ("Balloon/Position") ;
  balloonPosition.set({x: balloon.x+x , y: balloon.y+y });

}
