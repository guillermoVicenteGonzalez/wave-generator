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
var waveName = document.querySelector("#waveName");
var tempWaveCard = document.querySelector("div[data-type='template']");

//var tempWaveCard = document.querySelector(".waveCard");
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
    ops.createWaveCard("guillermo");
});

//guardar onda de la preview
newWaveBtn.addEventListener("click",()=>{
    //y si ya existe una??
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    let name = waveName.value;

    if(frec == null || amp == null || name == null || name == ""){
        alert("fill all the fields");
        return undefined;
    }

    let newWave = new Wave(amp,frec,color,name);
    waves.set(newWave.getName(),newWave);
    //falta añadir la onda al selector de la izquierda.
    ops.createWaveCard(newWave);


    waveDialog.close();
    let parent = document.querySelector("#canvasWrapper");
    let tempCanvas = ops.newCanvas(parent);
    canvases.push(tempCanvas);
    //ops.waveSetup(tempCanvas); 
    newWave.drawWave(tempCanvas);
})

/********
 * Wave Card management
 */
tempWaveCard.addEventListener("click",()=>{
    alert("hola");
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
colorSelector.addEventListener("change",redrawWave);


window.onload= ops.intializeCanvas;
window.onresize = console.log(ops.canvas);//resize all canvases

