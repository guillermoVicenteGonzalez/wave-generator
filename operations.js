import { Wave } from "./Wave.js";

export var canvas;
export var ctx;
var canvasWidth;
var canvasHeight;
var waveDialog = document.getElementById("waveDialog");



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

    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.filter= "blur(0px)";
    ctx.beginPath();
    ctx.lineWidth = 3;
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

//crea una wave
export function createWaveCard(wave){
    //obtengo el padre y el template
    var parent = document.querySelector("#cardContainer");
    var tempNode = document.querySelector("div[data-type='template']").cloneNode(true);
    
    //obtengo los elementos de la card
    let cardParam = tempNode.querySelector("param");
    let cardPlayBtn = tempNode.querySelector(".playBtn");
    let cardCanvas = tempNode.querySelector("canvas");
    let checkbox = tempNode.querySelector(".customCheck");
    let waveName = tempNode.querySelector("label");

    //faltan verificaciones

    //les doy valor a los parametros
    tempNode.id = wave.getName() + "Card";
    tempNode.style.display="grid";
    cardParam.value = wave; //el parametro de la carta es la wave
    console.log(wave.getName());
    waveName.innerHTML = wave.getName();

    //preparo los eventos
    cardPlayBtn.addEventListener("click",()=>{
        console.log(cardParam.value);
        //en un futuro
        //wave.playSound
        // y, o wave.playAnimation
    })
    
    //no es al clickar temp node
    //es al clicar midColumn (canvas y nombre)
    tempNode.addEventListener("click",()=>{
        waveDialog.showModal();
        var previewCanvas = document.querySelector("#previewCanvas");
        previewCanvas.width = window.innerWidth;
        previewCanvas.height = window.innerHeight;
        wave.drawWave(previewCanvas,5);
    })

    //establezco las dimensiones del canvas
    //var rect = cardCanvas.parentNode.getBoundingClientRect();
    //console.log(rect);

    //dibujo en el canvas de la tarjeta

    
    parent.appendChild(tempNode);
    var rect = cardCanvas.parentNode.getBoundingClientRect();
    console.log(rect);
    cardCanvas.width=rect.width*2;
    cardCanvas.height = (rect.height * 0.7)*2;
    wave.drawWave(cardCanvas,3);
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
    return newCanvas;
}

//abre una onda ya existente en el dialog
export function openWaveInDialog(){

}



