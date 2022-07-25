let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let score = 0;
let food = { x: 5, y: 6 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollapse(sArr) {
  
for (let i = 1; i< snakeArr.length; i++){
   if(sArr[i].x===sArr[0].x && sArr[i].y===sArr[0].y){
    return true;
   }
}
   if(sArr[0].x>=18 || sArr[0].x<0 || sArr[0].y>=18 || sArr[0].y<0){
    return true;
   }
}



function gameEngine() {
  //update snake and food
  if (isCollapse(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("game over press any key to START");
    snakeArr = [{ x: 13, y: 15 }];
   // musicSound.play();
    score = 0;
    scoreBox.innerHTML="score "+ score;
    speed=4;
  }

  // if you have eaten the food

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score +=1;
    scoreBox.innerHTML="score "+ score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    
  }
  
  if(score>10 && score<=15){
    speed=5;
  }
  
  if(score>15 && score<=20){
    speed=6;
  }
  if(score>20 && score<=25){
    speed=6;
  }
  if(score>25 && score<=35){
    speed=7;
  }
 // moving snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};

        
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

  // display snake
  board.innerHTML = " ";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

// keyboard button  press
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
    //  console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      //console.log("ArrowDown");
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
     // console.log("ArrowLeft");
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
     // console.log("ArrowRight");
      break;
    default:
      break;
  }
});
