// This file SHOULD represent a ball.

const BALL_C = 'green';

let Ball = function(canvas, context){
    this.radius = 10;
    // this.x = 0;
    // this.y = 0;
    this.xSpeed = -5;
    this.ySpeed = -5;
    this.color = 'white';
    this.draw = new Draw(context);
    this.reset();

}

Ball.prototype.setRadius = function(r){
    this.radius = r;
}

Ball.prototype.setX = function(x){
    this.x = x;
}

Ball.prototype.setY = function(y){
    this.y = y;
}

Ball.prototype.setXSpeed = function(xSpeed){
    this.xSpeed = xSpeed;
}

Ball.prototype.setYSpeed = function(ySpeed){
    this.ySpeed = ySpeed;
}

Ball.prototype.setColor = function(color){
    this.color = color;
}

Ball.prototype.redraw = function(){
    this.draw.colorCircle(this.x, this.y, this.radius, this.color);
}

Ball.prototype.move = function(){
    // this.bouncecheck();
    this.x += this.xSpeed;
    this.y += this.ySpeed
}



Ball.prototype.reset = function(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.xSpeed = -this.xSpeed;
    this.ySpeed = -this.ySpeed;
    this.color = BALL_C;
}