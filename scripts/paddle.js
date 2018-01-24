const PADDLE_H = 100;
const PADDLE_W = 10;
const PADDLE_C = 'white';
const PADDLE_GAP = 10;

var aiSpeed = 10;

let Paddle = function(canvas, context, isPlayer1){
    
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.draw = new Draw(context);
    this.isPlayer1 = isPlayer1;
    this.reset();
}

Paddle.prototype.setHeight = function(h){
    this.h = h;
}

Paddle.prototype.setWidth = function(w){
    this.w = w;
}

Paddle.prototype.setX = function(x){
    this.x = x;
}

Paddle.prototype.setY = function(y){
    this.y = y;
}

Paddle.prototype.setXSpeed = function(xSpeed){
    this.xSpeed = xSpeed;
}

Paddle.prototype.setYSpeed = function(ySpeed){
    this.ySpeed = ySpeed;
}

Paddle.prototype.setColor = function(color){
    this.color = color;
}

Paddle.prototype.redraw = function(){
    this.draw.colorRect(this.x, this.y, this.w, this.h, this.color);
}

Paddle.prototype.reset = function(){
    this.h = PADDLE_H;
    this.w = PADDLE_W;
    this.x = this.isPlayer1? 0 + PADDLE_GAP : (canvas.width-(PADDLE_W + PADDLE_GAP));
    this.y = canvas.height/2 + PADDLE_H/2;
    this.color = PADDLE_C;
    this.score = 0;
}

Paddle.prototype.addScore = function(){
    this.score++;
}

Paddle.prototype.moveAI = function(ballY){
    if(this.y < ballY - 35){
        this.y += aiSpeed;
    }else if(this.y > ballY + 35){
        this.y -= aiSpeed;
    }
}