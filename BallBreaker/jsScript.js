var canvas;
var canvasContext;

var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS =14;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var mouseX;
var mouseY;

function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left -root.scrollLeft;
    mouseY = evt.clientY - rect.top -root.scrollTop;
    
    paddleX = mouseX - PADDLE_WIDTH/2;
    
    //cheat/hack to test ball in any pos
    /*ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 4;
    ballSpeedY = -4;*/
    
}

function brickReset(){
    bricksLeft = 0;
    var i;
    for(i=0;i<3 *BRICK_COLS;i++){
        brickGrid[i] = false;
    }
    for(;i<BRICK_COLS * BRICK_ROWS;i++){
        brickGrid[i] = true;
        bricksLeft++;
    }
}

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    
    canvas.addEventListener('mousemove', updateMousePos);
    
    brickReset();
    ballReset();
}

function updateAll(){
    
    moveAll();
    drawAll();
}

function ballReset(){
    ballX = paddleX + PADDLE_WIDTH/2;
    ballY = canvas.height-PADDLE_DIST_FROM_EDGE;
    ballSpeedX = 0;
    ballSpeedY = -7;
}

function ballMove(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX > canvas.width && ballSpeedX > 0.0){  //right
        ballSpeedX *= -1;
    }
    if(ballX < 0 && ballSpeedX < 0.0){  //Left
        ballSpeedX *= -1;
    }
    if(ballY > canvas.height){ //bottom
        ballReset();
        //ballSpeedY *= -1;
    }
    if(ballY < 0){ //Top
        ballSpeedY *= -1;
    }
    
}

function isBrickAtColRow(col,row){
    if(col >= 0 && col < BRICK_COLS && 
       row >= 0 && row < BRICK_ROWS){
        var brickIndexUnderBall = rowColToArrayIndex(col,row);
        return brickGrid[brickIndexUnderBall];
    }else{
        return false;
    }   
}

function ballBrickHandling(){
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol,ballBrickRow);
    
    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && 
       ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS){
        if(isBrickAtColRow(ballBrickCol,ballBrickRow)){
            brickGrid[brickIndexUnderBall] = false;
            bricksLeft--;
           // console.log(bricksLeft);
            
            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevBrickCol = Math.floor(prevBallX / BRICK_W);
            var prevBrickRow = Math.floor(prevBallY / BRICK_H);
            
            var bothTestsFailed = true;
            
            if(prevBrickCol != ballBrickCol){
                if(isBrickAtColRow(prevBrickCol,ballBrickRow) == false){
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }//end of checking prev brick if
            }
            if(prevBrickRow != ballBrickRow){                
                if(isBrickAtColRow(ballBrickCol,prevBrickRow) == false){
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }
            
            if(bothTestsFailed){
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
            
            
        }// end brick found condition
    }//end of ball position coondition  
}// end od function ballBrickhandling

function ballPaddleHandling(){
    let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    let paddleleftEdgeX = paddleX;
    let paddleRightEdgeX = paddleleftEdgeX + PADDLE_WIDTH;
    if(ballY > paddleTopEdgeY && //below the top edge
       ballY < paddleBottomEdgeY && //above the bottom edge
       ballX > paddleleftEdgeX && //to the right of left of paddle
       ballX < paddleRightEdgeX //to the left of right of paddle
      ){
        ballSpeedY *= -1;
        
        let centreOfPaddleX = paddleX + PADDLE_WIDTH/2;
        let ballDistFromPaddleCentre = ballX - centreOfPaddleX;
        ballSpeedX = ballDistFromPaddleCentre * 0.35;
        
        if(bricksLeft == 0){
            brickReset();
        }

    }//end of if
    

}//end of ballPaddleHandling func

function moveAll(){
    ballMove();
    
    ballBrickHandling();
    
    ballPaddleHandling();
}

function rowColToArrayIndex(col,row){
    return BRICK_COLS * row + col;
}

function drawBricks(){
    for(var eachRow=0; eachRow < BRICK_ROWS; eachRow++){
        for(let eachCol=0; eachCol < BRICK_COLS; eachCol++){
            
            var arrayIndex = rowColToArrayIndex(eachCol,eachRow);
            
            if(brickGrid[arrayIndex]){
                colorRect(BRICK_W*eachCol,BRICK_H*eachRow, BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP,'blue');
            }
        }
    }
}
    

function drawAll(){
    
    
    colorRect(0,0, canvas.width, canvas.height, 'black');
    colorCircle(ballX,ballY, 10, 'white');
    colorRect(paddleX,canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH,PADDLE_THICKNESS, 'white' );
    
    drawBricks();
    
    var mouseBrickCol = Math.floor(mouseX / BRICK_W);
    var mouseBrickRow = Math.floor(mouseY / BRICK_H);
    var brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol,mouseBrickRow);
    colorText(mouseBrickCol+" , "+mouseBrickRow+" : "+brickIndexUnderMouse, mouseX,mouseY, 'yellow' );
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centreX,centreY, radius, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centreX,centreY, radius, 0,Math.PI*2,true);
    canvasContext.fill();
    
}

function colorText(showWords, textX,textY, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX,textY);
    
}