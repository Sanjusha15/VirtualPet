var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database  = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDog = createButton("AddMilk");
  feedDog.position(700,95);
  feedDog.mousePressed(feed);

  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  var getFeedTime = database.ref("feedTime");
  getFeedTime.on("value",function(data){
    lastFeed = data.val;

  })

  fill(255,255,234);
  textSize(40);
  if(lastFed >= 12){
    text("Last Feed" + lastFed%12 + "pm" , 350,30);

  }else if(lastFed === 0){
    text("Last Feed : 12am ",350,30);
  }else {
    text("Last Feed" + lastFed + "pm" , 350,30);

  }

  //write code to read fedtime value from the database 
  
  
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var foodStock = foodObj.getfoodStock();
  if(foodStock <= 0 ){
    foodObj.updateFoodStock(foodStock*0);
  }else{
    foodObj.updateFoodStock(foodStock-1);
  }
  database.ref("/").update({
    Food : foodObj.getfoodStock(),
    FeedTime : hour()
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
