//set up for matterJS
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
//const Render = Matter.Render;

var engine, world, body, render;

//variables
var pieceR1, pieceR2, pieceR3, pieceR4, pieceR5;
var pieceFR1, pieceFR2, pieceFR3;
var pieceT1, pieceT2, pieceT3, pieceT4, pieceT5;
var pieceFT1, pieceFT2, pieceFT3, pieceFT4, pieceFT5;
var ball;
var screw1, screw2, screw3, screw4, screw5, screw6, screw7, screw8, screw9, screw10;
var paddle1, paddle2;
var paddle1State, paddle2State;

var charge;
var gamestate;

/*
Calculations for the center of the playing area
450 - 25 (pieceR5's space) - 70 (pieceR1's space) = 355 pixels to use
355/2 + 25 (to be far from piece R5) = 202.5 which should be the center
*/

function preload(){
  //load in the font

}

function setup() {
  //create canvas
  createCanvas(450,700);

  //more matterJS set up
  engine = Engine.create();
  world = engine.world;
  //render = Render.create({ element: document.body, engine: engine, options: { width: 450, height: 700, wireframes: false } });

  //create the pieces of the machine
  pieceR1 = new RectangleObject(390, 370, 20, 520);
  pieceR2 = new RectangleObject(450, 350, 50, 1000);
  pieceR3 = new RectangleObject(405, 650, 50, 140);
  pieceR4 = new RectangleObject(225, 20, 450, 100);
  pieceR5 = new RectangleObject(0, 350, 50, 1000);

  pieceFR1 = new FlexableRectObj(202.5, 350, 100, 10);
  pieceFR2 = new FlexableRectObj(132.5, 425, 100, 10);
  pieceFR3 = new FlexableRectObj(272.5, 425, 100, 10);

  pieceT1 = new TriangleObject(415, 60, 40, PI/11);
  pieceT2 = new TriangleObject(132.5, 220, 30, PI/2);
  pieceT3 = new TriangleObject(272.5, 220, 30, PI/2);
  pieceT4 = new TriangleObject(22.5, 585, 35, PI/2);
  pieceT5 = new TriangleObject(382.5, 585, 35, PI/2);
  pieceT6 = new TriangleObject(30, 60, 40, PI/1.15);

  pieceFT1 = new FlexableTriObj(142.5, 520, 25, 0);
  pieceFT2 = new FlexableTriObj(262.5, 520, 25, PI/-3);
  pieceFT3 = new FlexableTriObj(202.5, 150, 35, PI/2);
  pieceFT4 = new FlexableTriObj(62.5, 275, 30, PI/2);
  pieceFT5 = new FlexableTriObj(342.5, 275, 30, PI/2);

  screw1 = new Screw(pieceFR1.body, {x: 202.5, y: 350}, 1, 0, 0);
  screw2 = new Screw(pieceFR2.body, {x: 122.5, y: 425}, 1, 0, 0);
  screw3 = new Screw(pieceFR3.body, {x: 272.5, y: 425}, 1, 0, 0);

  screw4 = new Screw(pieceFT1.body, {x: 142.5, y: 520}, 1, 0, 0);
  screw5 = new Screw(pieceFT2.body, {x: 262.5, y: 520}, 1, 0, 0);
  screw6 = new Screw(pieceFT3.body, {x: 202.5, y: 150}, 1, 0, 0);

  screw7 = new Screw(pieceFT4.body, {x: 62.5, y: 275}, 1, 0, 0);
  screw8 = new Screw(pieceFT5.body, {x: 342.5, y: 275}, 1, 0, 0);

  ball = new Ball(400, 550);

  paddle1 = new Paddle(100, 670, 130, 40, 1);
  screw9 = new Screw(paddle1.body, {x: 40, y: 670}, 1, 0, -65);

  paddle2 = new Paddle(305, 670, 130, 40, 0);
  screw10 = new Screw(paddle2.body, {x: 365, y: 670}, 1, 0, 65);

  charge = 0;
  gamestate = "waiting";

  paddle1State = "resting";
  paddle2State = "resting";
}

function draw() {
  //draw background
  background(0,0,0);  

  //update the engine
  Engine.update(engine);
  //Render.run(render);

  //display the pieces
  pieceR1.display();
  pieceR2.display();
  pieceR3.display();
  pieceR4.display();
  pieceR5.display();

  pieceFR1.display();
  pieceFR2.display();
  pieceFR3.display();

  pieceT1.display();
  pieceT2.display();
  pieceT3.display();
  pieceT4.display();
  pieceT5.display();
  pieceT6.display();

  pieceFT1.display();
  pieceFT2.display();
  pieceFT3.display();
  pieceFT4.display();
  pieceFT5.display();

  ball.display();

  paddle1.display();
  paddle2.display();

  //text
  fill("white");
  textAlign(CENTER);
  textSize(30);
  text("FANTASTIC PINBALL", 225, 40);
  textSize(15);
  text("Hit Space To Reset", 225, 60);

  //charge the ball
  if(keyIsDown(UP_ARROW) && gamestate === "waiting"){
    fill("white");
    textAlign(CENTER);
    textSize(10);

    if(charge > -50){
      charge-=0.3;
      text("Charge: " + round(charge * -1), 410, 610);
    }else{
      text("Charge: MAX", 410, 610);
    }
  }

  //make it so you can't fire the ball after it passes a certain x position
  if(ball.body.position.x < 390){
    gamestate = "playing";
  }

  //set the paddle angles
  if(paddle1State === "resting"){
    Matter.Body.setAngle(paddle1.body, 0);
  }

  if(paddle2State === "resting"){
    Matter.Body.setAngle(paddle2.body, 0);
  }

  //set paddles back to normal after flinging
  if(paddle1.body.angle > 0){
    Matter.Body.setAngularVelocity(paddle1, 0);
    paddle1State = "resting";
  }

  if(paddle2.body.angle < 0){
    Matter.Body.setAngularVelocity(paddle2, 0);
    paddle2State = "resting";
  }
}

function keyReleased(){
  if(keyCode === UP_ARROW) {
    Matter.Body.setVelocity(ball.body, {x: 0, y: charge});

    charge = 0;
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    paddle1State = "flinging";
    Matter.Body.setAngularVelocity(paddle1.body, -0.5);
  }

  if(keyCode === RIGHT_ARROW){
    paddle2State = "flinging";
    Matter.Body.setAngularVelocity(paddle2.body, 0.5);
  }

  if(keyCode === 32){
    gamestate = "waiting";
    Matter.Body.setPosition(ball.body, {x: 400, y: 550});
  }
}