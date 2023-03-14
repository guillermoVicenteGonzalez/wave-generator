import {Wave} from "./Wave.js"
import * as ops from "./operations.js";

//estructuras globales
var canvases = new Array(); //esto deberia ser un map y de tipo Wave si me apuras
var waves = new Map();

/***********************
 * UI ELEMENTS
 ***********************/
var createWaveBtn = document.getElementById("createWaveBtn");
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
var dialogParam = document.querySelector("#dialogParam");

//var tempWaveCard = document.querySelector(".waveCard");
//var openWaveDialog = document.getElementById("openModalBtn");



/***************************
 * Click events
 **^************************/


createWaveBtn.addEventListener("click",()=>{
    waveDialog.showModal();
    //esto esta mal, tienen que ser las dimensiones del div.
    previewCanvas.width = window.innerWidth;
    previewCanvas.height = window.innerHeight;
    let wave = new Wave(100,2,"#0000ff",undefined);
    amplitudeSlider.value = wave.getAmplitude();
    frequencySlider.value = wave.getFrequency();
    colorSelector.value = wave.getColor();
    waveName.value = "";
    dialogParam.value = wave;
    console.log(dialogParam.value);
    wave.drawWave(previewCanvas,2);
});


//cerrar modal
closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();

})


//boton de pruebas
auxBtn.addEventListener("click",()=>{
    ops.createWaveCard("guillermo");
});



//guardar onda de la preview
//al pulsar boton accept del dialog
newWaveBtn.addEventListener("click" ,()=>{
    let newWave = dialogParam.value;
    //y si ya existe una??

    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    let name = waveName.value;

    if(frec == null || amp == null || name == null || name == ""){
        alert("fill all the fields");
        return undefined;
    }

    newWave.setAmplitude(amp);
    newWave.setFrequency(frec);
    newWave.setColor(color);
    newWave.setName(name);

    if(!waves.has(newWave.getName())){
        console.log("la onda no existe");
        waves.set(newWave.getName(),newWave);
        let card = ops.createWaveCard(newWave);
        let parent = document.querySelector("#canvasWrapper");
        let tempCanvas = ops.newCanvas(parent);
        canvases.push(tempCanvas);
        //ops.waveSetup(tempCanvas); 
        newWave.drawWave(tempCanvas);
        newWave.setCanvas(tempCanvas);
        newWave.setCard(card);
    }else{
        //es mas sencillo que la card lea un index (su param)
        console.log("ya existía")
        waves.set(newWave.getName(),newWave);
        //actualizar card
        newWave.clearCanvas();
        newWave.updateWave(amp,frec,color);
        newWave.drawWave(newWave.getCanvas());
    }
    //verificar nombre



    waveDialog.close();

});


/*********************************+++
 * Wave Card management
 ****************************/
tempWaveCard.addEventListener("click",()=>{
    alert("hola");
})

/********************
 * Slider events
 *********************/

//deprecated, new version below
 function redrawWave(){
    //pilar valores
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    ops.clearCanvas(previewCanvas);
    ops.drawWave(amp,frec,color,previewCanvas);
}

function redrawPreviewWave(){
    let wave = document.getElementById("dialogParam").value;
    //verificacion
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;

    //console.log(wave);
    wave.setAmplitude(amp);
    wave.setFrequency(frec);
    wave.setColor(color);


    dialogParam.value = wave;

    ops.clearCanvas(previewCanvas);
    wave.drawWave(previewCanvas,2);
}

frequencySlider.addEventListener("input",redrawPreviewWave);
amplitudeSlider.addEventListener("input",redrawPreviewWave);
colorSelector.addEventListener("change",redrawPreviewWave);


window.onload= ops.intializeCanvas;


window.onresize = ()=>{ 
    console.log("resizing");
    let canvasArray = document.getElementsByClassName("canvas");
    console.log(canvasArray[1]);
    //console.log(canvasArray);
    for(let i; i< canvasArray.length;i++){
        console.log(canvasArray[i]);
        ops.resizeCanvas(canvasArray[i]);
    }
}//resize all canvases

