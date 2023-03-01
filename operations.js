import { Wave } from "./Wave.js";

export var canvas;
export var ctx;
var canvasWidth;
var canvasHeight;



export function sinWave(max,x){
    let wave = new Array();

    for(let a=0;a<max;a=a+1){
        wave[a] = Math.sin(x);
    }

    return wave;
}

export function showAxes(ctx,axes) {
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
export function drawWave(amp, frec,color, myCanvas){
    var ctx = myCanvas.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.lineJoin="miter";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    var x = 0;
    var y = 0;
    var amplitude = amp;
    var frequency = (frec * 2 * Math.PI)/myCanvas.width; 
    
    while (x < width) {
        y = height/2 + amplitude * Math.sin(x * frequency);
        ctx.lineTo(x, y);
        x = x + 1;
    }
    ctx.stroke();
    return ctx;
}

//i take the input forms data and use it to invoke drawWave
export function waveSetup(myCanvas){
    //hay que comporbar nulls
    var frec = document.querySelector('[name="frecuency-value"]').value;
    var amp = document.querySelector('[name="amplitude-value"]').value
    var color = document.querySelector('[name="color"]').value

    if(frec == "" || amp == ""){
        frec = 40;
        amp = 40;
    }
    return drawWave(amp, frec,color, myCanvas);
}

export function createWave(n, a, f){
    var wave = {
        "name": n,
        "amplitude":a,
        "frequency":f
    };

    
}

export function intializeCanvas(){
    canvas = document.getElementById("mainCanvas");
    canvas.width = window.innerWidth;     // equals window dimension
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    showAxes(ctx);
    ctx.save();
}

export function drawCanvas(){
    console.log("drawing canvas");
    //canvas.width = window.innerWidth;     // equals window dimension
    //canvas.height = window.innerHeight;
    //ctx = canvas.getContext("2d");
    //ctx.restore();
    showAxes(ctx);
}

function resizeCanvas(){

}

export function drawLine(){
    ctx.beginPath();
    ctx.strokeStyle = '#0000ff';
    ctx.lineWidth = 5;
    ctx.lineTo(0,0);
    ctx.lineTo(1000,1000);
    ctx.stroke();
    ctx.save();
}

//seria mas modularizable pasandole como parametro el canvas
export function clearContext(ctx){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
    
}

export function clearCanvas(canvas){
    let ctx = canvas.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
}



export function newCanvas(parent){
    var newCanvas = document.createElement("canvas");
    newCanvas.className = "canvas";
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;
    parent.appendChild(newCanvas);
    console.log(newCanvas);
    return newCanvas;
}


export function redrawWave(){
    var nFrec = document.querySelector("#frequency-slider");
    var nAmp = document.querySelector("#amplitude-slider")
}

