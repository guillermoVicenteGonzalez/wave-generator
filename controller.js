import { Wave } from "./Wave.js";

//cuidado con el control de errores de limites (max ondas simultaneas)

var waves = new Map();
var canvasCollection = new Array();

export function test(object){
    console.log(object.nodeName);
    if(object.nodeName == 'CANVAS'){
        console.log("acierto");
    }
}


//pasa un o una lista de canvases y los mete en la coleccion
export function addCanvas(...canvases){
    if(canvases.length <= 0){
        console.error("no parameters passed");
        return false;
    }

    for(let i=0; i<canvases.length; i++){
        if(canvases[i].nodeName != 'CANVAS'){
            console.error("not a canvas");
            return false;
        }else{
            canvasCollection.push(canvases[i]);
        }
    }
    return true;
}

export function getCanvasCollection(){
    return canvasCollection;
}

export function getWaveCollection(){
    return waves;
}

export function createWave(wave, parent, name){
    //creo la onda
    if(!(wave instanceof Wave)){
        console.error("parameter is not a wave");
        return false;
    }

    let nCanvas = newCanvas(parent);

    //esto es un poco estupido
    if(wave.getName() == undefined){
        if(name != undefined){
            wave.setName(name);
        }else{
            console.error("createWave: no name specified");
            return false;
        }
    }

    if(getWave(wave.getName())){
        console.error("createWave: wave alredy exists");
        return false;
    }


    wave.setCanvas(nCanvas);
    //la meto en la coleccion
    waves.set(wave.getName(), wave);
    return wave;
}

export function updateWave(wave){
    //verifico que es una onda
    if(!(wave instanceof Wave)){
        console.error("updateWave: parameter is not of class 'Wave' ");
        return false;
    }

    if(waves.get(wave.getName())){
        waves.set(wave.getName(), wave);
        return wave;
    }else{
        console.error("updateWave: there is no wave with name: " + wave.getName());
        return false;
    }
}

export function deleteWave(name){
    //busco la onda en la coleccion
    if(!name){
        console.error("deleteWave: no name specified");
        return undefined;
    }

    let result = waves.get(name);
    if(result){
        waves.delete(name);
        return result;
    }else{
        console.error("couldnt find wave with name: " + name);
        return undefined;
    }

    //la saco de la coleccion

}

export function getWave(name){
    let wave = waves.get(name);
    if(wave){
        console.log(wave);
        return wave;
    }else{
        console.error("getWave: there is no wave with name: " + name);
        return false;
    }
    //saco la onda y la devuelvo.
}

//


export function createWaveCard(wave){
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
        let wave = controller.getWave(cardParam.value);
        wave.playSound()
        // y, o wave.playAnimation
    })
    

    //evento de clickar en la onda para cambiarla
    cardCanvas.addEventListener("click",()=>{
        //cuidado con estas dimensiones
        let wave = controller.getWave(cardParam.value);
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

export function clearAllWaves(){
    waves.forEach(element => {
        if(element instanceof Wave){
            element.clearWave();
            waves.delete(element.getName());
        }
    });

    /*
    canvasCollection.forEach(element =>{
        element.remove();
    });

    canvasCollection = new Array();*/
}

/**********************
 * Non export functions
 **********************/

function newCanvas(parent){
    //esto solo crea big canvases. 
    var newCanvas = document.createElement("canvas");
    newCanvas.className = "canvas bigCanvas";
    newCanvas.width = window.innerWidth;
    newCanvas.height = window.innerHeight;
    parent.appendChild(newCanvas);
    return newCanvas;
}