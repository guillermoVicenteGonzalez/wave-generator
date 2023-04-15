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
    createWaveCard(previewWave);
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

function createWaveCard(wave){
    //obtengo el contenedor de cards y el template
    var parent = document.querySelector("#cardContainer");
    var tempNode = document.querySelector("div[data-type='template']").cloneNode(true);
    
    //obtengo los elementos de la card
    let cardParam = tempNode.querySelector("param");
    let cardPlayBtn = tempNode.querySelector(".playBtn");
    let cardCanvas = tempNode.querySelector("canvas");
    let checkbox = tempNode.querySelector(".customCheck");
    let waveName = tempNode.querySelector("label");
    let cardColumn = tempNode.querySelector(".cardMidColumn");
    let plusBtn = tempNode.querySelector(".plusBtn");

    //faltan verificaciones

    //les doy valor a los parametros
    tempNode.id = wave.getName() + "Card";
    tempNode.style.display="grid";
    //cardParam.value = wave; //el parametro de la carta es la wave
    cardParam.value = wave.getName();
    console.log(wave.getName());
    waveName.innerHTML = wave.getName();

    //preparo los eventos
    //evento de sonido de la onda.
    cardPlayBtn.addEventListener("click",()=>{
        console.log(cardParam.value);
        let wave = controller.getWave(cardParam.value);
        wave.playSound()
        // y, o wave.playAnimation
    })
    

    //evento de clickar en la onda para cambiarla
    cardCanvas.addEventListener("click",()=>{
        //cuidado con estas dimensiones
        let wave = controller.getWave(cardParam.value);
        //loadWaveDialog(wave);
    })

    //evento para mostrar o no la onda.
    checkbox.addEventListener("click",()=>{
        wave.triggerCanvas();
        console.log("triggering");
    })

    //evento para sumar ondas
    plusBtn.addEventListener("click",()=>{
        console.log("adding waves...");
        wave.drawWaveSum(wave.canvas,waves.get("josefa"));
    })


    //meto la nueva card en el contenedor de cards
    parent.appendChild(tempNode);

    //cardCanvas.style.width = "100%";
    //cardCanvas.style.height = "100%";
    console.log(cardCanvas.offsetHeight);
    //cardCanvas.width = cardCanvas.offsetWidth;
    //cardCanvas.height = cardCanvas.offsetHeight;
    resizeCanvas(cardCanvas);
    wave.drawWave(cardCanvas,3);
    return tempNode;
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
