import {Wave} from "./Wave.js"
import * as controller from "./controller.js";

//variables
var previewWave = new Wave(100,2,"#0000ff","");;

//elements
var newWaveBtn = document.querySelector("#newWaveBtn");
var auxBtn = document.querySelector("#auxBtn");
var waveDialog = document.querySelector("#waveDialog");
var mainCanvas = document.querySelector("#mainCanvas");
var canvasContainer = document.querySelector("#canvasContainer")

//dialog elements
var frequencySlider = document.querySelector("#frequency-slider");
var amplitudeSlider = document.querySelector("#amplitude-slider")
var colorSelector = document.querySelector('[name="color"]');
var previewCanvas = document.querySelector("#previewCanvas");
var waveName = document.querySelector("#waveName");
var acceptWaveBtn = document.querySelector("#acceptWaveBtn");
var tempWaveCard = document.querySelector("div[data-type='template']");
var dialogParam = document.querySelector("#dialogParam");
var closeWaveDialog = document.querySelector(".closeModal");

//start
controller.addCanvas(previewCanvas, mainCanvas);


/**********************
 * Main page events
 **********************/
//boton de abrir el dialogo etc...
newWaveBtn.addEventListener("click",()=>{
    waveDialog.showModal();
    resizeCanvas(previewCanvas);
    previewWave = new Wave(100,2,"#0000ff","");
    previewWave.drawWave(previewCanvas,2);
});

//boton auxiliar
auxBtn.addEventListener("click",()=>{
    let list = controller.getWaveCollection();
    console.log(list);
})


/**********************
 * Dialog card events
 **********************/

//boton de aceptar del dialog => crea una onda
acceptWaveBtn.addEventListener("click",()=>{
    previewWave.setName(waveName.value);
    controller.createWave(previewWave, canvasContainer);
    previewWave.drawWave();
    waveDialog.close();
})

closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();
})

frequencySlider.addEventListener("input",redrawPreviewWave);
amplitudeSlider.addEventListener("input",redrawPreviewWave);
colorSelector.addEventListener("change",redrawPreviewWave);

/**********************
 * Other view functions
 **********************/

function redrawPreviewWave(){
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;

    previewWave.setAmplitude(amp);
    previewWave.setFrequency(frec);
    previewWave.setColor(color);

    clearCanvas(previewCanvas);
    previewWave.drawWave(previewCanvas,2);
}

/**********************
 * Complementary functions
 **********************/

function clearCanvas(canvas){
    if(canvas.nodeName != 'CANVAS'){
        console.error("clearCanvas: parameter is not a canvas");
        return false;
    }

    let ctx = canvas.getContext("2d");
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
}






/***
 * TESTS
 */
 let canvas = document.getElementById("mainCanvas");



function intializeCanvas(){
    let canvas = document.getElementById("mainCanvas");
    canvas.width = window.innerWidth;     // equals window dimension
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    showAxes(ctx);
    ctx.save();
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
//let canvas = document.getElementById("mainCanvas");
//resizeCanvas(canvas);

//intializeCanvas();

function resizeCanvas(canvas){
    let container = canvas.parentElement;
    console.log(container);

    let width = container.clientWidth;
    let height = container.clientHeight;

    console.log(width, height);

    canvas.width = width ;
    canvas.height = height;

    console.log("resizing");
}


window.onresize = ()=>{
    //poco eficiente
    //https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    //resizeCanvas(canvas);
}
//intializeCanvas();
