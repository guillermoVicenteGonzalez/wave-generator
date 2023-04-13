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

//boton de crear onda de 0
createWaveBtn.addEventListener("click",()=>{
    previewCanvas.width = window.innerWidth;
    previewCanvas.height = window.innerHeight;
    let wave = new Wave(100,2,"#0000ff","");
    loadWaveDialog(wave);
});


//cerrar modal
closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();
})


//boton de pruebas
auxBtn.addEventListener("click",()=>{
    createWaveCard("guillermo");
});



//guardar onda de la preview
//al pulsar boton accept del dialog
newWaveBtn.addEventListener("click" ,()=>{
    let newWave = dialogParam.value;
    let oldName = newWave.getName();
    //y si ya existe una??

    //tomo los valores de los controles
    let amp = amplitudeSlider.value;
    let frec = frequencySlider.value;
    let color = colorSelector.value;
    let name = waveName.value;

    //si alguno es null muestro error y salgo
    if(frec == null || amp == null || name == null || name == ""){
        alert("fill all the fields");
        return undefined;
    }

    //en caso contrario cambio los valores de la onda.
    newWave.setAmplitude(amp);
    newWave.setFrequency(frec);
    newWave.setColor(color);
    newWave.setName(name);

    //si el map ya contenia una onda con el mismo nombre, la modifica
    //en caso contrario crea una nueva.
    if(!waves.has(newWave.getName())){
        console.log("la onda no existe");
        waves.set(newWave.getName(),newWave);
        let card = createWaveCard(newWave);
        let parent = document.querySelector("#canvasWrapper");
        let tempCanvas = newCanvas(parent);
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

//dibuja la onda del dialogo.
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

    clearCanvas(previewCanvas);
    wave.drawWave(previewCanvas,2);
}

frequencySlider.addEventListener("input",redrawPreviewWave);
amplitudeSlider.addEventListener("input",redrawPreviewWave);
colorSelector.addEventListener("change",redrawPreviewWave);


/******************************
 * LIFECYCLE EVENTS
 ******************************/

window.onload= intializeCanvas;

window.onresize = ()=>{ 
    console.log("resizing");
    let canvasArray = document.getElementsByClassName("canvas");
    console.log(canvasArray[1]);
    //console.log(canvasArray);
    for(let i; i< canvasArray.length;i++){
        console.log(canvasArray[i]);
        resizeCanvas(canvasArray[i]);
    }
}//resize all canvases


/*************************************************
 * funciones
 **************************************************/

//carga los valores de la onda del parametro en el dialogo
function loadWaveDialog(wave){
    //tambien establece dimensiones??
    dialogParam.value = wave;
    amplitudeSlider.value = wave.getAmplitude();
    frequencySlider.value = wave.getFrequency();
    colorSelector.value = wave.getColor();
    waveName.value = wave.getName();
    wave.drawWave(previewCanvas,2);
    waveDialog.showModal();
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


function intializeCanvas(){
    let canvas = document.getElementById("mainCanvas");
    canvas.width = window.innerWidth;     // equals window dimension
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    showAxes(ctx);
    ctx.save();
}


//crea una wave card
function createWaveCard(wave){
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
        let wave = waves.get(cardParam.value);
        //en un futuro
        wave.playSound()
        // y, o wave.playAnimation
    })
    

    //evento de clickar en la onda para cambiarla
    cardCanvas.addEventListener("click",()=>{
        //cuidado con estas dimensiones
        previewCanvas.width = window.innerWidth;
        previewCanvas.height = window.innerHeight;
        let wave = waves.get(cardParam.value);
        console.log(wave);
        loadWaveDialog(wave);

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

    cardCanvas.style.width = "100%";
    cardCanvas.style.height = "100%";
    console.log(cardCanvas.offsetHeight);
    cardCanvas.width = cardCanvas.offsetWidth;
    cardCanvas.height = cardCanvas.offsetHeight;
    wave.drawWave(cardCanvas,3);
    return tempNode;
}

function clearCanvas(canvas){
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

//aun no implementado???
export function resizeCanvas(canvas){
    //control de errores
    let parent = canvas.parentNode
    let style =getComputedStyle(parent);
    let w = parseInt(styles.getPropertyValue("width"),10);
    let h = parseInt(styles.getPropertyValue("height"),10);
    canvas.height=h;
    canvas.width=w;
}