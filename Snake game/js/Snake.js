var snake = [];
var headX;
var headY;

const headRadius = 10;
var noOfTails = 3;
var lives = 3;


snake[0] = {x:200,
            y:400
           }

/*snake[1] = {
    x:snake[0].x-2*headRadius,
    y:snake[0].y
}*/

for(let i=1; i <= noOfTails; i++){
    snake[i] = {
    x:snake[i-1].x-2*headRadius,
    y:snake[i-1].y
}
}


const moveSpeed = 20;

var direction ='RIGHT';

function drawSnake(){
    //console.log(snake.length);
    for(var i=0; i <= noOfTails; i++){
    colorCircle(snake[i].x,snake[i].y,headRadius,'yellow');        
    }
}
function addNewHead(){
    var newHead = {
        x:headX,
        y:headY
    }
    
    snake.unshift(newHead);
}

function moveSnake(){
    
    headX = snake[0].x;
    headY = snake[0].y;
    if(direction == 'UP'){
        headY -= moveSpeed;
        snake.pop();
        addNewHead();
    }
    if(direction == 'RIGHT'){
        headX += moveSpeed;
        snake.pop();
        addNewHead();
    }
    if(direction == 'DOWN'){
        headY += moveSpeed;
        snake.pop();
        addNewHead();
    }
    if(direction == 'LEFT'){
        headX -= moveSpeed;
        snake.pop();
        addNewHead();
    }
    
}

function snakeReset(){
    
}

function snakeSnakeHandling(){
    for(var i=3; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            //console.log('snake has been hit'+i);
            snake.length = i;
            noOfTails = i-1;
            lives--;
            
        }
    }
}

