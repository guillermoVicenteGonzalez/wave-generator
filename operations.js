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
    let cardColumn = tempNode.querySelector(".cardMidColumn");

    //faltan verificaciones

    //les doy valor a los parametros
    tempNode.id = wave.getName() + "Card";
    tempNode.style.display="grid";
    //cardParam.value = wave; //el parametro de la carta es la wave
    cardParam.value = wave.getName();
    console.log(wave.getName());
    waveName.innerHTML = wave.getName();

    //preparo los eventos
    cardPlayBtn.addEventListener("click",()=>{
        console.log(cardParam.value);
        //en un futuro
        //wave.playSound
        // y, o wave.playAnimation
    })
    

    cardColumn.addEventListener("click",()=>{
        waveDialog.showModal();
        var previewCanvas = document.querySelector("#previewCanvas");
        //cuidado con estas dimensiones
        previewCanvas.width = window.innerWidth;
        previewCanvas.height = window.innerHeight;
        wave.drawWave(previewCanvas,5);
        p
        //hay que pasarle el valor wave al param de la preview
        //hay que darle valores a los selectores

    })

    checkbox.addEventListener("click",()=>{
        wave.triggerCanvas();
        console.log("triggering");
    })

    //establezco las dimensiones del canvas
    //var rect = cardCanvas.parentNode.getBoundingClientRect();
    //console.log(rect);

    //dibujo en el canvas de la tarjeta

    
    parent.appendChild(tempNode);
    /*
    var rect = cardCanvas.parentNode.getBoundingClientRect();
    console.log(cardCanvas.parentNode.height);
    console.log(rect);
    cardCanvas.width=rect.width;
    //cardCanvas.height = (rect.height * 0.6);
    cardCanvas.height = rect.height;
    */

    /*
    var canvasParent = cardCanvas.parentNode;
    console.log(canvasParent);
    let styles = getComputedStyle(canvasParent);
    let w = parseInt(styles.getPropertyValue("width"),10);
    let h = parseInt(styles.getPropertyValue("height"),10);
    console.log(w,h);
    cardCanvas.width = w;
    cardCanvas.height = 120;
    //cardCanvas.maxHeight = h;
    */

    cardCanvas.style.width = "100%";
    cardCanvas.style.height = "100%";
    console.log(cardCanvas.offsetHeight);
    cardCanvas.width = cardCanvas.offsetWidth;
    cardCanvas.height = cardCanvas.offsetHeight;
    wave.drawWave(cardCanvas,3);
    return tempNode;
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

export function resizeCanvas(canvas){
    //control de errores
    let parent = canvas.parentNode
    let style =getComputedStyle(parent);
    let w = parseInt(styles.getPropertyValue("width"),10);
    let h = parseInt(styles.getPropertyValue("height"),10);
    canvas.height=h;
    canvas.width=w;
}



