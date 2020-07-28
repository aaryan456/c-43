var rand;
var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;
var touches=0;


function setup() {
  
createCanvas(
  window.innerWidth,
    window.innerHeight
);


userPaddle = createSprite(window.innerWidth-20,200,10,70);


computerPaddle = createSprite(10,200,10,70);


ball = createSprite(window.innerWidth/2,window.innerHeight/2,12,12);

computerScore = 5;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  background("white");
  edges = createEdgeSprites();
  textSize(30)
  text(computerScore,window.innerWidth/2+80,30);
  
  text("player life",window.innerWidth/2+60,60) 
  
  
  for (var i = 0; i < 6400; i+=20) {
     line(window.innerWidth/2,i,window.innerWidth/2,i+10);
  }

  if (gameState === "serve") {
    text("Press Space to Serve",window.innerWidth/2,180);
    text("Save the paddle from the ball only 5 lives !!!",window.innerWidth/2,220);
  }

  if (gameState === "over") {
    text("Game Over!",window.innerWidth/2,160);
    text("Press 'R' to Restart",window.innerWidth/2,190);
  }
  if (gameState === "save") {
    text("Save The Paddle !!!",window.innerWidth/2,160);
    text("Press 'R' to Restart",window.innerWidth/2,190);
  }

  if (keyDown("r") && gameState==="over") {
    gameState = "serve";
    computerScore = 5;
    playerScore = 5;
  }


  
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 15;
    ball.velocityY = 15;
    gameState = "play";
  }

 
  userPaddle.y = World.mouseY;



  
  if(ball.isTouching(userPaddle)){
    
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  
  if(ball.isTouching(computerPaddle)){
  
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
    touches++;
  }


  if(ball.x > window.innerWidth || ball.x < 0){
    

  if (ball.x < 0) {
      playerScore--;
  touches=0;  
  }
    else {
      computerScore--;
    touches=0;
    }

    ball.x = window.innerWidth/2;
    ball.y = window.innerHeight/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 0 ){
      gameState = "over";
    }
   
  }

  
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    
  }

  
  console.log(touches);
  
  if(touches<15){
  computerPaddle.y = ball.y;
  }
  else{
   computerPaddle.y=ball.y+50; 
  }
   

    drawSprites();
}
