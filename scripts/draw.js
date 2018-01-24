// This is where we Draw things
let Draw = function(context){
    // this.canvas = document.getElementById("gameCanvas");
    // this.canvasContext = canvas.getContext('2d');
    this.context = context
}

Draw.prototype.colorRect = function(leftX, topY, width, height, drawColor){
    this.context.fillStyle = drawColor;
    this.context.fillRect(leftX,topY,width, height);
}

Draw.prototype.colorCircle = function(centerX, centerY, radius, drawColor){
    this.context.fillStyle = drawColor;
    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    this.context.fill();
}

