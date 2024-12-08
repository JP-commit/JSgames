var leftArrow = document.getElementById('leftArrow');
var imgContainer = document.getElementById('arrowImages');
var rightArrow = document.createElement('img');
var upArrow = document.createElement('img');
var downArrow = document.createElement('img');

rightArrow = rotate(180,'Right');
upArrow = rotate(90,'Up');
downArrow = rotate(-90,'Down');

imgContainer.appendChild(rightArrow);
imgContainer.appendChild(upArrow);
imgContainer.appendChild(downArrow);

leftArrow.classList.add("arrows","leftArrow");
rightArrow.classList.add("arrows","rightArrow");
upArrow.classList.add("arrows","upArrow");
downArrow.classList.add("arrows","downArrow");

function rotate(deg,arrowDirection){
    var img = leftArrow.cloneNode(true);
    img.style = 'transform: rotate('+ deg +'deg)';
    img.alt = arrowDirection;
    return img;
}

function moveSnakeByArrows(){
    leftArrow.onclick = function(){
        if(direction != 'RIGHT'){
            direction = 'LEFT'
        }
    }
    rightArrow.onclick = function(){
        if(direction != 'LEFT'){
            direction = 'RIGHT'
        }
    }
    upArrow.onclick = function(){
        if(direction != 'DOWN'){
            direction = 'UP'
        }
    }
    downArrow.onclick = function(){
        if(direction != 'UP'){
            direction = 'DOWN'
        }
    }
   
}
