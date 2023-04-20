import {Wave} from "./Wave.js"
import * as controller from "./controller.js";

//variables
var previewWave = new Wave(100,2,"#0000ff","");

//elements
var newWaveBtn = document.querySelector("#newWaveBtn");
var auxBtn = document.querySelector("#auxBtn");
var waveDialog = document.querySelector("#waveDialog");
var mainCanvas = document.querySelector("#mainCanvas");
var canvasContainer = document.querySelector("#canvasContainer")
var clearAllBtn = document.querySelector("#clearBtn");

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

//list dialog
var listDialog = document.querySelector("#waveListDialog");
var listContainer = document.querySelector("#listContainer");
var closeListBtn = document.querySelector("#closeListBtn");

//start
controller.addCanvas(previewCanvas, mainCanvas);
intializeCanvas();


/**********************
 * Main page events
 **********************/

//boton de abrir el dialogo etc...
newWaveBtn.addEventListener("click",()=>{
    console.log("new Wave");
    waveName.disabled = false;

    resizeCanvas(previewCanvas);
    let tempWave = new Wave(50,1,"#0000ff","");
    loadPreviewWave(tempWave);
   // previewWave.drawWave(previewCanvas,2);
});

//boton auxiliar
auxBtn.addEventListener("click",()=>{
    console.log("aux");
    let wave = controller.getWave("josefa");
    wave.animateWave();
});

//boton de borrar todo
clearAllBtn.addEventListener("click",()=>{
    controller.clearAllWaves();
});


/**********************
 * Dialog card events
 **********************/

//boton de aceptar del dialog => crea una onda

acceptWaveBtn.addEventListener("click",()=>{
    if(waveName.value == undefined || waveName.value == ""){
        alert("missing wave name");
        return undefined;
    }
    previewWave.setName(waveName.value);
    let exists = controller.getWave(previewWave.getName());
    if(exists){
        var nWave = controller.updateWave(previewWave);
        nWave.reloadWave();
        resizeCanvas(nWave.getCanvas());
    }else{
        let card = createWaveCard(previewWave);
        previewWave.setCard(card);
        var nWave = controller.createWave(previewWave, canvasContainer);
        resizeCanvas(nWave.getCanvas());
    }

    resizeCanvas(nWave.getCanvas());
    nWave.drawWave();
    waveDialog.close();

});



closeWaveDialog.addEventListener("click",()=>{
    waveDialog.close();
});

frequencySlider.addEventListener("input",redrawPreviewWave);
amplitudeSlider.addEventListener("input",redrawPreviewWave);
colorSelector.addEventListener("change",redrawPreviewWave);

/**********************
 * List dialog events
 **********************/

closeListBtn.addEventListener("click",()=>{
    clearListDialog();
    listDialog.close();
});

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

function loadPreviewWave(wave){
    previewWave = wave;
    amplitudeSlider.value = previewWave.getAmplitude();
    frequencySlider.value = previewWave.getFrequency();
    colorSelector.value = previewWave.getColor();
    waveName.value = previewWave.getName();

    waveDialog.showModal();    
    resizeCanvas(previewCanvas)
    clearCanvas(previewCanvas);
    previewWave.drawWave(previewCanvas);

}

function createWaveListItem(wave){
    let tempDiv = document.createElement("div");
    let tempText = document.createElement("p");
    let tempBtn = document.createElement("button");
    let name = wave.getName();

    tempText.innerHTML = name;
    tempBtn.class = "customBtn";
    tempBtn.innerHTML = "add wave";

    tempBtn.addEventListener("click",()=>{
        previewWave.clearCanvas();
        previewWave.drawWaveSum(previewWave.canvas, wave);
        clearListDialog();
        listDialog.close();
    });

    tempDiv.append(tempText, tempBtn);
    tempDiv.className = "listElement";
    tempDiv.style = "border-bottom: .5px solid #000;"
    listContainer.append(tempDiv);
}

function initializeListDialog(){
    let list = controller.getWaveCollection();
    console.log(list);

    clearListDialog();


    list.forEach(element =>{
        console.log(element);
        createWaveListItem(element);
    });

    listDialog.showModal();
}

function clearListDialog(){
    let children = listContainer.children;

    for(let i=0;i<children.length;i++){
        listContainer.removeChild(children[i]);
    }
}

/**********************
 * Complementary functions
 **********************/

function clearAll(){

}

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
    let deleteBtn = tempNode.querySelector(".deleteWaveBtn");

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
        let wave = controller.getWave(cardParam.value);
        wave.playSound()
        // y, o wave.playAnimation
    })
    

    
    //evento de clickar en la onda para cambiarla
    //el selector de nombre esta desactivadp
    cardCanvas.addEventListener("click",()=>{
        //cuidado con estas dimensiones
        let wave = controller.getWave(cardParam.value);
        let nameSelector = document.querySelector("#waveName");
        nameSelector.setAttribute("disabled",true);
        console.log(cardParam.value);
        console.log(wave);
        loadPreviewWave(wave);
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
        previewWave = wave;
        initializeListDialog();
        //wave.drawWaveSum(wave.canvas,auxWave);
    })

    //evento para borrar la onda
    deleteBtn.addEventListener("click",()=>{
        controller.deleteWave(wave.getName());
        wave.clearCanvas();
        tempNode.remove();
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

function showGrid(){
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    for(let i=0; i<3;i++){
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)";

        ctx.moveTo(i,0)
    }
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
