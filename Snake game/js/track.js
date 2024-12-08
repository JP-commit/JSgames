const trackW = 40;
const trackH = 40;




function drawtrack(){
    colorRect(0,0,canvas.width,canvas.height,'black');
    var arrayIndex = 0;
    for(var i=0; i < canvas.height/trackH; i++){
        for(var j=0; j < canvas.width/trackW; j++){
            if((i+j)%2 == 0){
                colorRect(j*trackW,i*trackH,trackW,trackH,'#239B56');
            }else{
                colorRect(j*trackW,i*trackH,trackW,trackH,'#28B463');
            }
            arrayIndex++;
        }
    }
}

function snakeTrackHandling(){
    if(snake[0].x < 0){
        snake[0].x = canvas.width;
    }
    if(snake[0].x > canvas.width){
        snake[0].x = 0;
    }
    if(snake[0].y < 0){
        snake[0].y = canvas.height;
    }
    if(snake[0].y > canvas.height){
        snake[0].y = 0;
    }
}