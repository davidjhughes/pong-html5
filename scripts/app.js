var canvas, canvasContext;

var ballX, ballY;

var ballSpeedX = 5;
var ballSpeedY = 5;

var ballRadius = 10
var aiSpeed = 4;

var rightPaddleY = 250;
var leftPaddleY = 100;

var playerScore = 0;
var aiScore = 0;

var showingWinScreen = false;


const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PADDLE_GAP = 10;
const WINNING_SCORE = 3;

window.onload = function(){

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    ballReset();
    var fps = 60
    setInterval(function(){
        moveAll();
        redraw();
    }, 1000/fps);

    canvas.addEventListener('mousedown',handleMouseClick);

    canvas.addEventListener(
        'mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            leftPaddleY = mousePos.y - (PADDLE_HEIGHT/2);
        });
}


var handleMouseClick = function(evt){
    if(showingWinScreen){
        playerScore = 0;
        aiScore = 0;
        showingWinScreen = false;
    }
}

var drawNet = function(){
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1, i, 2, 20, 'green');
    }
}

var redraw = function(){

    //background
    colorRect(
        0, 
        0, 
        canvas.width, 
        canvas.height, 
        'black'
    );

    
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(playerScore, 100, 100);
    canvasContext.fillText(aiScore, canvas.width - 100, 100);

    if(showingWinScreen){
        var message = "";
        if(playerScore >= WINNING_SCORE){
            message = "Player Wins! Click To Continue";
        }else{
            message = "Computer Wins! Click To Continue";
        }
        canvasContext.fillText(message, 350, 300);
        return;
    }

    //net
    drawNet();

    //left paddle
    colorRect(
        PADDLE_GAP,
        leftPaddleY,
        PADDLE_WIDTH, 
        PADDLE_HEIGHT, 
        'white'
    );

    //right paddle
    colorRect(
        (canvas.width - PADDLE_WIDTH - PADDLE_GAP),
        rightPaddleY,
        PADDLE_WIDTH, 
        PADDLE_HEIGHT, 
        'white'
    );

    // ball
    colorCircle(ballX, ballY, ballRadius, 0, Math.PI*2, true, 'white');

}

var colorRect = function(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width, height);
}

var colorCircle = function(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

var moveAll = function(){
    
    if(showingWinScreen){return;}

    bounceCheck();
    moveAI();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

var bounceCheck = function(){

    //Bounce off top and bottom
    if(ballY >= (canvas.height - ballRadius) || ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }

    //Bounce off paddles
    if(ballX < 0 + PADDLE_GAP + PADDLE_WIDTH){
        if(ballY > leftPaddleY && 
            ballY < leftPaddleY + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (leftPaddleY+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35
        }
        
    }else if(ballX > (canvas.width - (ballRadius + PADDLE_GAP + PADDLE_WIDTH))){

        if(ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (rightPaddleY+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35
        }
    }

    // Update Scores
    if(ballX < 0){
        aiScore++;
        ballReset();
    }
    if(ballX > canvas.width - ballRadius){
        playerScore++;
        ballReset();
    }

    
}

var calculateMousePos = function(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}

var ballReset = function(){

    if(playerScore >= WINNING_SCORE ||
    aiScore >= WINNING_SCORE){
        showingWinScreen = true;
    }
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
}

var moveAI = function(){
    var rightPaddleCenter = rightPaddleY + (PADDLE_HEIGHT/2);
    if(rightPaddleY < ballY - 35){
        rightPaddleY += aiSpeed;
    }else if(rightPaddleY > ballY + 35){
        rightPaddleY -= aiSpeed;
    }
}