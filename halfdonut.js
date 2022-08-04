let ctx;
let canvas;

function Circle(radius, value, color, lineWidth = 10){
    this.radius = radius;
    this.value = value;
    this.angle = value == 0 ? 0 : (2-value)*Math.PI;
    this.color = color;
    this.lineWidth = lineWidth;
    this.x = radius + lineWidth;
    this.y = radius + lineWidth;
}

Circle.prototype.render = function(){
    ctx.save();
    ctx.scale(-1, 1);
    ctx.beginPath();
    ctx.arc(- this.x, this.y, this.radius, 0, Math.PI , true);
    ctx.strokeStyle = '#777';
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(
        - this.lineWidth - this.radius *(1 - Math.cos(Math.PI)) , 
        this.radius * (1 - Math.abs(Math.sin(Math.PI))) + this.lineWidth , 
    this.lineWidth/2, 0, Math.PI * 2 , true);
    ctx.fillStyle = '#777';
    ctx.fill();
    ctx.closePath();

    this.angle = this.value == 0 ? 0 : (2-this.value)*Math.PI;
    this.color = 'rgb(255,' + (255 - this.value*255) + ',0)';
    ctx.beginPath();
    ctx.arc(- this.x, this.y, this.radius, 0, this.angle , true);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(- this.lineWidth, this.y, this.lineWidth/2, 0, Math.PI * 2 , true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(
        - this.lineWidth - this.radius *(1 - Math.cos(this.angle)) , 
        this.radius * (1 - Math.abs(Math.sin(this.angle))) + this.lineWidth , 
    this.lineWidth/2, 0, Math.PI * 2 , true);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}

function render(objects){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < objects.length; i++){
        objects[i].render();
    }
}

function execute(objects, max, min = 0, value){
    var per = (value - min) / (max - min);
    
    var backgroundCircle = new Circle(200, 1, '#777',30);
    var valueCircle = new Circle(200, 0, 'orange',30);
    var objects = [backgroundCircle, valueCircle];

    var frequency = 10;
    for (let i = 0; i < per*100; i++) {
        setTimeout(() => {
            valueCircle.value = i/100  + 0.01;
            render(objects);
        }, i * frequency);2
    }
}

window.onload = function () {
    canvas = document.getElementById('HalfDonut')

    var width = 480;
    var height = 250;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    const dpr = window.devicePixelRatio;
    console.log(dpr)
    canvas.width =  width * dpr;
    canvas.height = height * dpr;

    ctx = canvas.getContext('2d');

    ctx.scale(dpr, dpr);
    
    execute();
}