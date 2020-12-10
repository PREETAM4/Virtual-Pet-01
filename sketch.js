//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var foodS;
var foodStock;
var milk; 
var milk1;
var milkImage;
var milkImage1;

function preload(){
  //load images here
  dogImage=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
  milkImage=loadImage("images/milk.png");
  milkImage1=loadImage("images/milk1.png");
}

function setup() {
  database = firebase.database();
  
	createCanvas(800, 700);
  dog=createSprite(249,250);
  dog.addImage(dogImage);
  dog.scale = 0.16;



   foodStock = database.ref('food');
   foodStock.on("value" , readStock,showError);
   foodStock.set(20);

   milk = createSprite(140,435,10,10);
   milk.addImage(milkImage);
   milk.scale = 0.1;

   milk1 = createSprite(210,280,10,10)
   milk1.addImage(milkImage1);
   milk1.scale= 0.025;
   milk1.visible = false;

  }


function draw() {  
  background("forestgreen");

  fill("black")
  textSize(35)
  text("Virtual Pet",310,50)
  



    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImage2);
      milk1.visible = true;
    }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImage);
      milk1.visible = false;
    }
  
 
if(foodS === 0){
  foodS = 20;
}

  //add styles here
  drawSprites();
  textSize(17);
  fill("black");
  text("Press up arrow key for long time to feed your pet");
  fill("black");
  text("Milk Bottles Remaining"+ foodS,170,440);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
} 

function showError(){
  console.log("Error in writing to the database");
}