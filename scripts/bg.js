const BG_C = 'black'
let Background = function(canvas, context){
    this.draw = new Draw(context);
}

Background.prototype.redraw = function(){
    this.draw.colorRect(0,0,canvas.width, canvas.height,BG_C);
}