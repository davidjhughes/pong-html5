var canvas, canvasContext;
var ball, player1, player2, background;
var showingWinScreen = false;

const WINNING_SCORE = 3;
const FPS = 60;

window.onload = function(){

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    ball = new Ball(canvas, canvasContext);
    player1 = new Paddle(canvas, canvasContext, true);
    player2 = new Paddle(canvas, canvasContext, false);
    background = new Background(canvas, canvasContext);
    
    setInterval(function(){
        moveAll();
        redraw();
    }, 1000/FPS);

    canvas.addEventListener('mousedown',handleMouseClick);

    canvas.addEventListener(
        'mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            player1.y = mousePos.y - (player1.h/2);
        }
    );
}

var bouncecheck = function(){    

    // top and bottom
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.ySpeed = -ball.ySpeed;
    }

    //player1
    if(
        ball.x - ball.radius <= player1.x + player1.w &&
        ball.y < player1.y + player1.h &&
        ball.y > player1.y
    ){
        ball.xSpeed = -ball.xSpeed
        var deltaY = ball.y - (player1.y+player1.h/2);
            ball.ySpeed = deltaY * 0.35
    }

    player2
    if(
        ball.x >= player2.x  &&
        ball.y < player2.y + player2.h &&
        ball.y > player2.y
    ){
        ball.xSpeed = -ball.xSpeed
        var deltaY = ball.y - (player2.y+player2.h/2);
            ball.ySpeed = deltaY * 0.35
    }

    //score
    if(ball.x < 0 ){  
        player2.addScore();      
        ball.reset();
    }
    if(ball.x > canvas.width){  
        player1.addScore();        
        ball.reset();
    }

    if(player1.score === WINNING_SCORE || player2.score === WINNING_SCORE){
        showingWinScreen = true;
    }

}

var handleMouseClick = function(evt){
    if(showingWinScreen){
        player1.score = 0;
        player2.score = 0;
        showingWinScreen = false;
    }
}


var redraw = function(){

    background.redraw();
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(player1.score, 100, 100);
    canvasContext.fillText(player2.score, canvas.width - 100, 100);

    if(showingWinScreen){
        var message = "";
        if(player1.score >= WINNING_SCORE){
            message = "Player Wins! Click To Continue";
        }else{
            message = "Computer Wins! Click To Continue";
        }
        canvasContext.fillText(message, 350, 300);
        return;
    }

    //net
    // drawNet();

  
    player1.redraw();
    player2.redraw();
    ball.redraw();
}


var moveAll = function(){
    
    
    bouncecheck();
    ball.move();
    player2.moveAI(ball.y);

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


