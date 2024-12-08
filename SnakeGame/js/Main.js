var canvas;
var canvasContext;
var start;
var speed;
var framesPerSecond;
var screen;


window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    //speed = document.getElementById("speed").value;
    start = document.getElementById("start")
    drawAll();
    start.onclick = function(){
        framesPerSecond = document.getElementById("speed").value;
        screen = document.getElementById('screen');
        screen.innerHTML = '';
    
        startgame();
    }
    
    //snakeReset();
    //loadImages();
    
}

function startgame(){
    setInterval(updateAll, 1000/framesPerSecond);
    setupInput();   

}

/*function imageLoadingDoneSoStartGame(){
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    
    setupInput();
    loadLevel(levelOne);
}*/

function loadLevel(whichLevel){
    trackGrid = whichLevel.slice();
    
}

function updateAll(){
    
    if(lives == 0){
        //console.log('GAMEOVER updateall');
        gameOver();
        return;
    }
    
    moveAll();
    drawAll();
}

function moveAll(){
    moveSnake();
    snakeTrackHandling();
    snakeFruitHandling();
    snakeSnakeHandling();
    moveSnakeByArrows();
}

function drawAll(){
   
   
    drawtrack();
    drawSnake();
    drawFruit();
    
}

