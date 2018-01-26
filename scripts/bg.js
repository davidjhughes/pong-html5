const BG_C = 'black'
let Background = function(canvas, context){
    this.draw = new Draw(context);
}

Background.prototype.redraw = function(){
    this.draw.colorRect(0,0,canvas.width, canvas.height,BG_C);
    this.drawNet();
}

Background.prototype.drawNet = function(){
    for(var i=0; i<canvas.height; i+=40){
        this.draw.colorRect(canvas.width/2-1, i, 2, 20, 'green');
    }
}