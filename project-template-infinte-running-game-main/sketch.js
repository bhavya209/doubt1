var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score =0

var boy , boy_running , boy_collided
var road, road_Image , invisible_road

var obstacleGroup 

 


function preload(){
 boy_running = loadAnimation("run_1.png","run_2.png","run_3.png","run_4.png")
 boy_collided = loadAnimation("collieded.png")

 road_Image = loadImage("Road.jpg" , road_Image)

 Obs1 = loadImage("obs1.png")
 Obs2 = loadImage("obs2.png")
 Obs3 = loadImage("obs3.png")
 Obs4 = loadImage("obs4.png")
}

function setup() {
 createCanvas(800,800)

 road = createSprite(400,400,400,400)
 road.addImage("Road",road_Image)
 road.x = road.width / 2
 road.velocityX = -(7+3*score/100)
 road.scale = 2

 boy = createSprite(100,600,40,100)
 boy.addAnimation("Runnig",boy_running)
 boy.addAnimation("Collieded".boy_collided)
 boy.scale = 1


 invisible_road = createSprite(400,600,800,75)
 invisible_road.visible = false;

 boy.setCollider("rectangle",0,0,boy.width,boy.height);
  boy.debug = true

  obstacleGroup = createGroup();

}

function draw() {
 
    spawnObs();

    boy.collide(invisible_road);

    if(gameState === PLAY){
     //move the ground
     //road.velocityX = -(4+3*score/100);
     //scoring
     score = score + Math.round(frameCount/60);

     if (road.x < 200){
      road.x = road.width/2;
     }

     //jump when the space key is pressed
     if(keyDown("space") && boy.y >= 400) {
     boy.velocityY = -20;
     }

     //add gravity
    boy.velocityY = boy.velocityY + 0.8
    console.log(boy.y)
    
    if(boy.isTouching(obstacleGroup)){

        gameState = END
        
    }
    
    if(gameState === END){
        boy.velocityX = 0
        obstacleGroup.Setlifetime = -1
        
    }

 if(keyDown("up")){
    
    gameState = PLAY
     boy.addAnimation("Runnig",boy_running)
     
    
    }






}




    drawSprites();
}

function spawnObs(){

if(frameCount % 200 === 0){
obstacle = createSprite(800,Math.round(random(500,600)))
obstacle.velocityX = -7
obstacle.scale = 1
obstacle.depth = boy.depth
obstacle.depth += 1
obstacleGroup.add(obstacle)


var rand = Math.round(random(1,3))
 switch(rand){
 case 1 : obstacle.addImage(Obs1)
 break;

 case 2 : obstacle.addImage(Obs2)
 break;

 case 3 : obstacle.addImage(Obs3)
 break;
 }




}









}




