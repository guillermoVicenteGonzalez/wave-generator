var canvas;
var ctx;
var canvasWidth;
var canvasHeight;

function test(){
    return "buenas tardes";
}

function sinWave(max,x){
    let wave = new Array();

    for(let a=0;a<max;a=a+1){
        wave[a] = Math.sin(x);
    }

    return wave;
}

function showAxes(ctx,axes) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var xMin = 0;
    
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    
    // X-Axis
    ctx.moveTo(xMin, height/2);
    ctx.lineTo(width, height/2);
    
    // Y-Axis
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);

    // Starting line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);
    
    ctx.stroke();
    //ctx.save();
}

//no puedo pintar varias 
function drawWave(amp, frec,color){
    //let canvas = document.getElementById("canvas");
    //canvas.width = window.innerWidth;     // equals window dimension
    //canvas.height = window.innerHeight;


    //var ctx = canvas.getContext("2d");
    //ctx.restore();
    
    
    ctx.lineJoin="miter";
    
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;


    var x = 0;
    var y = 0;
    var amplitude = amp;
    var frequency = (frec * 2 * Math.PI)/canvas.width;
    //var frequency = frec;    
    
    while (x < width) {
        y = height/2 + amplitude * Math.sin(x * frequency);
        ctx.lineTo(x, y);
        console.log("x: " + x + " y: " + y);
        x = x + 1;
    }
    ctx.stroke();
    //ctx.closePath();
    //ctx.save();
    
    //esto es cutre de cojones, como consigo que se quede?
    //showAxes(ctx);
    return ctx;
}

//i take the input forms data and use it to invoke drawWave
function waveSetup(){
    //hay que comporbar nulls
    var frec = document.querySelector('[name="frecuency-value"]').value;
    var amp = document.querySelector('[name="amplitude-value"]').value
    var color = document.querySelector('[name="color"]').value

    if(frec == "" || amp == ""){
        frec = 40;
        amp = 40;
    }
    console.log(color);
    drawWave(amp, frec,color);
}

function intializeCanvas(){
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;     // equals window dimension
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    showAxes(ctx);
    ctx.save();
}

function drawCanvas(){
    console.log("drawing canvas");
    //canvas.width = window.innerWidth;     // equals window dimension
    //canvas.height = window.innerHeight;
    //ctx = canvas.getContext("2d");
    //ctx.restore();
    showAxes(ctx);
}

function resizeCanvas(){

}

function drawLine(){
    ctx.beginPath();
    ctx.strokeStyle = '#0000ff';
    ctx.lineWidth = 5;
    ctx.lineTo(0,0);
    ctx.lineTo(1000,1000);
    ctx.stroke();
    ctx.save();
}



window.onload = intializeCanvas;
window.onresize = drawCanvas;


