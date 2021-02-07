
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1, mango2, mango3, mango4, mango5, mango6;
var world,boy;
var stone;
var elastic;

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1200,150,30);
	mango3=new mango(1090,200,30);
	mango4=new mango(1000,180,30);
	mango5=new mango(1000,80,30);
	mango6=new mango(930,200,30);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);

	stone = new Stone(230, 360, 70);

	elastic = new Elastic(stone.body, {x: 245, y:420})
	
	Engine.run(engine);

}

function draw() {

  background(230);
  
  textSize(20);
  text("Press SPACE for another try!", 20, 30);

  image(boy ,200,340,200,300);  

  treeObj.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();

  groundObject.display();

  stone.display();
  elastic.display();

  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
  detectCollision(stone,mango6);
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stone.body, {x:245, y: 420})
		elastic.attach(stone.body);
	}
}

function mouseDragged(){
	Matter.Body.setPosition(stone.body, {x: mouseX, y: mouseY});
}

function mouseReleased(){
	elastic.fly();
}

function detectCollision(lstone, lmango){
	var stonePos = lstone.body.position;
	var mangoPos = lmango.body.position;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y);
	if(distance<=lstone.r+lmango.r){
		Matter.Body.setStatic(lmango, false);
	}
}