var fruitX = 300;
var fruitY = 400;
const fruitRadius = 10;
var showingGameOver = false;

var points = framesPerSecond;
var score = 0;
var scoreText = document.getElementById('score');
var livesText = document.getElementById('lives');

function produceFruit(){
    fruitX = Math.floor(Math.random() * canvas.width)+1;
    fruitY = Math.floor(Math.random() * canvas.height)+1;
    //console.log(fruitX,fruitY);
    for(var i=0; i <= noOfTails; i++){
        if(snake[i].x <= fruitX+fruitRadius && snake[i].x >= fruitX-fruitRadius && snake[i].y <= fruitY+fruitRadius && snake[i].y >= fruitY-fruitRadius){
            produceFruit();
        }
    }
    
}
function drawFruit(){
    colorCircle(fruitX,fruitY,fruitRadius,'orange');
    scoreText.innerText = 'SCORE : '+score;
    livesText.innerText = 'LIVES : '+lives;
}

function snakeFruitHandling(){
    if(snake[0].x <= fruitX+fruitRadius && snake[0].x >= fruitX-fruitRadius && snake[0].y <= fruitY+fruitRadius && snake[0].y >= fruitY-fruitRadius){
        addNewHead();
        noOfTails++;
        produceFruit();
        score += 10;
    }
}

function gameOver(){
    showingGameOver = true;
    colorText("GAMEOVER",canvas.width/2-50,canvas.height/2-10,'lightskyblue');
    colorText("YOUR SCORE : "+score,canvas.width/2-60,canvas.height/2+10,'lightskyblue');
    colorText("CLICK TO RESTART",canvas.width/2-70,canvas.height/2+30,'lightskyblue');
    
    
}