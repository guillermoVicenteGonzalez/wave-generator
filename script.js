import {Wave} from "./Wave.js"
import * as ops from "./operations.js";

//estructuras globales
var canvases = new Array(); //esto deberia ser un map y de tipo Wave si me apuras
var waves = new Map();

/***********************
 * UI ELEMENTS
 ***********************/
var newCanvasBtn = document.getElementById("newCanvasBtn");
var waveDialog = document.getElementById("waveDialog");
var openWaveDialog = document.querySelector(".openModal");
var closeWaveDialog = document.querySelector(".closeModal");
var auxBtn = document.querySelector("#auxBtn");

//dialog elements
var frequencySlider = document.querySelector("#frequency-slider");
var amplitudeSlider = document.querySelector("#amplitude-slider")
var colorSelector = document.querySelector('[name="color"]');
var previewCanvas = document.querySelector("#previewCanvas");
var newWaveBtn = document.querySelector("#newWaveBtn");
//var openWaveDialog = document.getElementById("openModalBtn");



/***************************
 * Click events
 **^************************/
//abrir modal
openWaveDialog.addEventListener("click", ()=>{
    waveDialog.showModal();
    previewCanvas.width = window.innerWidth;
    previewCanvas.height = window.innerHeight;
    //ops.previewWave(dialogCanvas);
    ops.drawWave(100,2,"#0000ff",previewCanvas);
});

//cerrar modal
closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();

})

//pintar onda
/*deprecated
acceptBtn.addEventListener("click",()=>{
    waveDialog.close();
    let parent = document.querySelector("#canvasWrapper");
    let tempCanvas = ops.newCanvas(parent);
    canvases.push(tempCanvas);
    ops.waveSetup(tempCanvas);
})
*/

//boton de pruebas
auxBtn.addEventListener("click",()=>{
    //esto tiene que ir en una funcion parametrizable, pero es una prueba
    var ctx = canvases[1].getContext("2d");
    console.log(ctx);
    ops.clearContext(ctx);
    canvases[1] = null;
    console.log(canvases);
});

//guardar onda de la preview
newWaveBtn.addEventListener("click",()=>{
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    let newWave = new Wave(amp,frec,color,"prueba1");
    waves.set(newWave.getName(),newWave);

    //falta añadir la onda al selector de la izquierda.


    waveDialog.close();
    let parent = document.querySelector("#canvasWrapper");
    let tempCanvas = ops.newCanvas(parent);
    canvases.push(tempCanvas);
    //ops.waveSetup(tempCanvas); 
    newWave.drawWave(tempCanvas);
})



/********************
 * Slider events
 *********************/
 function redrawWave(){
    //pilar valores
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    ops.clearCanvas(previewCanvas);
    ops.drawWave(amp,frec,color,previewCanvas);
}

frequencySlider.addEventListener("input",redrawWave);
amplitudeSlider.addEventListener("input",redrawWave);


window.onload= ops.intializeCanvas;
window.onresize = console.log(ops.canvas);

