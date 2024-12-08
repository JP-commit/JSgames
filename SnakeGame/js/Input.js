var mouseX;
var mouseY;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;


function setupInput(){
    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('mousedown',handleMouseClick);
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);

}

function handleMouseClick(evt){
    if(showingGameOver){
        showingGameOver = false;
        startgame();
    }
}

function updateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left -root.scrollLeft;
    mouseY = evt.clientY - rect.top -root.scrollTop;
       
    //cheat/hack to test car in any pos
    /*carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;*/
    
}

/*function keySet(keyEvent,whichCar,setTo){
    if(keyEvent.keyCode == whichCar.controlKeyLeft){
        whichCar.keyheld_TurnLeft = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyRight){
        whichCar.keyheldTurnRight = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyUp){
       whichCar.keyheldGas = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown){
        whichCar.keyheld_Reverse = setTo;
    }
}*/

function keyPressed(evt){
    
    //keySet(evt,greenCar,true);
    //console.log("key pressed : "+evt.keyCode);
    if(evt.keyCode == KEY_UP_ARROW && direction != 'DOWN'){
        direction = 'UP';
    }
    if(evt.keyCode == KEY_LEFT_ARROW && direction != 'RIGHT'){
        direction = 'LEFT';
    }
    if(evt.keyCode == KEY_DOWN_ARROW && direction != 'UP'){
        direction = 'DOWN';
    }
    if(evt.keyCode == KEY_RIGHT_ARROW && direction != 'LEFT'){
        direction = 'RIGHT';
    }
    
}

function keyReleased(evt){
//    console.log("key released : "+evt.keyCode);
    
    //keySet(evt,greenCar,false);
    
    
}

