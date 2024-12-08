var canvas;
var canvasContext;

var paddle;
const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const TILE_THICKNESS = 20;
const TILE_WIDTH = 70;
var paddleCenter;

var ballX = 400;
var ballY = 300;
var ballSpeedX = 5;
var ballSpeedY = 2;
const BALLRADIUS = 10;

var tilesX=[];
var tilesY=[];
var tiles = [tilesX, tilesY];

var score = 0;

var tileObject = {
    0 : [true ,true ,true ,true ,true ,true ,true ,true],
    1 : [true ,true ,true ,true ,true ,true ,true ,true],
    2 : [true ,true ,true ,true ,true ,true ,true ,true],
    3 : [true ,true ,true ,true ,true ,true ,true ,true],
    4 : [true ,true ,true ,true ,true ,true ,true ,true],
    5 : [true ,true ,true ,true ,true ,true ,true ,true],
    6 : [true ,true ,true ,true ,true ,true ,true ,true],
    7 : [true ,true ,true ,true ,true ,true ,true ,true],
    8 : [true ,true ,true ,true ,true ,true ,true ,true],
    
} 
var ALLFALSE = {
    0 : [false,false,false,false,false,false,false,false,],
    1 : [false,false,false,false,false,false,false,false,],
    2 : [false,false,false,false,false,false,false,false,],
    3 : [false,false,false,false,false,false,false,false,],
    4 : [false,false,false,false,false,false,false,false,],
    5 : [false,false,false,false,false,false,false,false,],
    6 : [false,false,false,false,false,false,false,false,],
    7 : [false,false,false,false,false,false,false,false,],
    8 : [false,false,false,false,false,false,false,false,]
}

var lives = 5;

var showingWinScreen = false;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt){
	if(showingWinScreen){
		lives = 5;
		showingWinScreen = false;
        tileObject = {
    0 : [true ,true ,true ,true ,true ,true ,true ,true],
    1 : [true ,true ,true ,true ,true ,true ,true ,true],
    2 : [true ,true ,true ,true ,true ,true ,true ,true],
    3 : [true ,true ,true ,true ,true ,true ,true ,true],
    4 : [true ,true ,true ,true ,true ,true ,true ,true],
    5 : [true ,true ,true ,true ,true ,true ,true ,true],
    6 : [true ,true ,true ,true ,true ,true ,true ,true],
    7 : [true ,true ,true ,true ,true ,true ,true ,true],
    8 : [true ,true ,true ,true ,true ,true ,true ,true],
    
        } 

        
	}
}

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 60;

    canvas.addEventListener('mousedown',handleMouseClick);

    canvas.addEventListener('mousemove',
		function(evt){
			var mousePos = calculateMousePos(evt);
			paddle = mousePos.x-(PADDLE_WIDTH/2);
		});
   
   
    setInterval(function(){
		drawEverything();
		moveEverything();
       
	}, 1000/framesPerSecond);

    

}

function drawEverything(){
    
    colorRect(0,0,canvas.width,canvas.height,'black');
    
    if(showingWinScreen){
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("You WON",canvas.width/2-50,canvas.height/2-10);
        canvasContext.fillText("Click to Continue",345,500);
			return;
    }
    
    colorRect(paddle,canvas.height-PADDLE_HEIGHT-1,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
    drawTiles();
    //Draws the ball
	colorCircle(ballX,ballY,BALLRADIUS,'white');
    canvasContext.fillText("LIVES :",canvas.width-100,canvas.height-100);
    canvasContext.fillText(lives,canvas.width-50,canvas.height-100);

}

function moveEverything(){
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX > canvas.width){
        ballSpeedX = -ballSpeedX;
    }
    if(ballX < 0){
        ballSpeedX = -ballSpeedX;
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height-PADDLE_HEIGHT-1){
        if(ballX > paddle && ballX < paddle + PADDLE_WIDTH){
            ballSpeedY = -ballSpeedY;
            
            var deltaX = ballX - (paddle+PADDLE_WIDTH/2);
				ballSpeedX = deltaX * 0.35;
        }else{
            ballReset();
            lives--;
        }
    }
    var y = 0;
    for(var j=20 ; j<240; j+=30){
        var x = 0;
        for(var i=20 ; i<canvas.width-70; i+=85){
            if(ballY-BALLRADIUS == j+TILE_THICKNESS || ballY+BALLRADIUS == j || ballY == j+TILE_THICKNESS || ballY == j){
                if(ballX > i && ballX < i+TILE_WIDTH){
                    if(tileObject[x][y] == true){
                        ballSpeedY = -ballSpeedY;
                        tileObject[x][y] = false;
                        score++;
                    }
                }
            }else if(ballX+BALLRADIUS == i || ballX == i+TILE_WIDTH || ballX == i || ballX == i+TILE_WIDTH){
                    if(ballY < j+TILE_THICKNESS && ballY > j){
                        if(tileObject[x][y] == true){
                            ballSpeedX = -ballSpeedX;
                            tileObject[x][y] = false;
                            score++;
                            
                        }
                    }
            }
            x++;
        }
        y++;
    }
    if(score == 72){
        showingWinScreen = true;
    }
    
}
function colorRect(leftX,topY,width,height,drawColor){
	canvasContext.fillStyle = drawColor; //This command fills the screen with color
	canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX,centerY,radius,drawColor){
	canvasContext.fillStyle = 'drawColor';
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();

}

function drawTiles(){
    var x = 0;
    for(var i=20 ; i<canvas.width-70; i+=85){
        var y = 0;
        for(var j=20 ; j<240; j+=30){
            if(tileObject[x][y] == true){
                colorRect(i,j,TILE_WIDTH,TILE_THICKNESS,'white');
            }
            tilesX[x] = i;
            tilesY[y] = j;
            
            y++;   
        }
        x++;
    }
}

function deleteTiles(i,j){
    
    for(var x=0; x<tilesX["length"]; x++){
        for(var y=0; y<tilesY["length"]; y++){
            if(tilesX[x] == i && tilesY[y] == j){
                tileObject[x][y] = false;
                console.log(i,j);
            }
        }
    }
}

function ballReset(){
    
	ballX = canvas.width/2;
	ballY = canvas.height/2;
    ballSpeedX = 5;
    
}

